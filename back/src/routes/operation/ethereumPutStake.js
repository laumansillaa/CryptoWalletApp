const { ADMIN_ETHEREUM_PUBLIC_KEY, INFURA_URL } = process.env;
const axios = require("axios");
const Web3 = require("web3");
const web3 = new Web3(INFURA_URL);
const { Key, Operation, Staking } = require("../../db").models;
const rewards = require("../../utils/annualRewards");

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION ETHEREUM PUT STAKE ROUTE ----------")
    try {
        const { stakingCurrency, stakingAmount } = req.body;
        const [publicKey, privateKey] = (await Key.findOne({ where: { userId: req.user.id } })).ethereum;
        const date = await axios.get("http://worldtimeapi.org/api/ip");
        const yearDay = date.data.day_of_year.toString();
        const reward = rewards.filter(reward => reward.Currency === stakingCurrency);

        if (stakingCurrency === "ETH") {
            const to = ADMIN_ETHEREUM_PUBLIC_KEY;
            const value = (Math.floor(stakingAmount*10**18)).toString();
            const gasLimit = 21000;
            const gasPrice = await web3.eth.getGasPrice();
            const nonce = await web3.eth.getTransactionCount(publicKey);

            const signedTransaction = await web3.eth.accounts.signTransaction({
                to,
                value, 
                gasLimit,
                gasPrice,
                nonce
            }, privateKey);

            await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        } else {
            const tokenContract = await require("../../solidity")(stakingCurrency);
            const to = tokenContract.options.address;
            const value = Math.floor(stakingAmount*10**4);
            const transaction = tokenContract.methods.transfer(ADMIN_ETHEREUM_PUBLIC_KEY, value);
            const data = transaction.encodeABI();
            const gas = await transaction.estimateGas({ from: publicKey });
            const gasPrice = await web3.eth.getGasPrice();
            const nonce = await web3.eth.getTransactionCount(publicKey);

            const signedTransaction = await web3.eth.accounts.signTransaction({
                to, 
                data, 
                gas, 
                gasPrice, 
                nonce, 
            }, privateKey);

            await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        }

        const dbStake =  await Staking.create({
            yearDay: yearDay.toString(),
            publicKey,
            blockchain: "ethereum",
            currency: stakingCurrency,
            amount: stakingAmount.toString(),
            annualReward: reward[0].annualReward.toString()
        });

        await req.user.addStaking(dbStake);

        const dbOperation = await Operation.create({
            operationType: "put stake",
            blockchain: "ethereum",
            from: publicKey,
            to: "admin",
            currency: stakingCurrency,
            amount: stakingAmount.toString(),
            purchasedCurrency: null,
            purchasedAmount: null
        });

        await req.user.addOperation(dbOperation);

        return res.status(200).send("Ethereum stake succeeded.");
    } catch(error) { next(error) }
};
