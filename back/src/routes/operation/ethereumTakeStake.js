const { ADMIN_ETHEREUM_PUBLIC_KEY, ADMIN_ETHEREUM_PRIVATE_KEY, INFURA_URL } = process.env;
const axios = require("axios");
const Web3 = require("web3");
const web3 = new Web3(INFURA_URL);
const { Key, Staking, Operation } = require("../../db").models;

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION ETHEREUM TAKE-STAKE ROUTE ----------")
    try {
        const { stakingCurrency } = req.body;
        const date = await axios.get("http://worldtimeapi.org/api/ip");
        const yearDay = date.data.day_of_year;
        const [publicKey] = (await Key.findOne({ where: { userId: req.user.id } })).ethereum;
        const stakeOperation = await Staking.findOne({
            where: {
                userId: req.user.id,
                currency: stakingCurrency
            }
        });
        
        const stakedDays = Number(yearDay) - Number(stakeOperation.yearDay);
        const proportionalReward = (stakedDays * Number(stakeOperation.annualReward)) / 365;
        const reward = (Number(proportionalReward) * Number(stakeOperation.amount)) + Number(stakeOperation.amount);

        if (stakingCurrency === "ETH") {
            const to = publicKey;
            const value = (Math.floor(reward*10**18)).toString();
            const gasLimit = 21000;
            const gasPrice = await web3.eth.getGasPrice();
            const nonce = await web3.eth.getTransactionCount(ADMIN_ETHEREUM_PUBLIC_KEY);

            const signedTransaction = await web3.eth.accounts.signTransaction({
                to,
                value, 
                gasLimit,
                gasPrice,
                nonce
            }, ADMIN_ETHEREUM_PRIVATE_KEY);

            await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        } else {
            const tokenContract = await require("../../solidity")(stakingCurrency);
            const to = tokenContract.options.address;
            const value = Math.floor(reward*10**4);
            const transaction = tokenContract.methods.transfer(publicKey, value);
            const data = transaction.encodeABI();
            const gas = await transaction.estimateGas({ from: ADMIN_ETHEREUM_PUBLIC_KEY });
            const gasPrice = await web3.eth.getGasPrice();
            const nonce = await web3.eth.getTransactionCount(ADMIN_ETHEREUM_PUBLIC_KEY);

            const signedTransaction = await web3.eth.accounts.signTransaction({
                to, 
                data, 
                gas, 
                gasPrice, 
                nonce, 
            }, ADMIN_ETHEREUM_PRIVATE_KEY);

            await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        }

        const dbOperation = await Operation.create({
            operationType: "take stake",
            blockchain: "ethereum",
            from: publicKey,
            to: "admin",
            currency: stakingCurrency,
            amount: reward.toString(),
            purchasedCurrency: null,
            purchasedAmount: null
        });

        await req.user.addOperation(dbOperation);

        await stakeOperation.destroy();

        return res.status(200).send("Ethereum stake taking succeeded.");
    } catch(error) { next(error) }
};
