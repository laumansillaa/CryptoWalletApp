const { ADMIN_ETHEREUM_PUBLIC_KEY, INFURA_URL } = process.env;
const Web3 = require("web3");
const web3 = new Web3(INFURA_URL);
const Binance = require("node-binance-api");
const binance = new Binance();
const { Key, Operation } = require("../../db").models;

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION ETHEREUM PURCHASE ROUTE ----------")
    try {
        const { currency, amount } = req.body;
        const [publicKey, privateKey] = (await Key.findOne({ where: { userId: req.user.id } })).ethereum;
        const prices = await binance.futuresPrices();
        const usdAmount = (currency === "USDT") 
            ? amount * 1
            : (currency === "HNR")
            ? amount * 4000
            : await amount * prices[`${currency}USDT`];

        if (currency === "ETH") {
            const to = ADMIN_ETHEREUM_PUBLIC_KEY;
            const value = (Math.floor(amount*10**18)).toString();
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
            const tokenContract = await require("../../solidity")(currency);
            const to = tokenContract.options.address;
            const value = Math.floor(amount*10**4);
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

        const dbOperation = await Operation.create({
            operationType: "sell",
            blockchain: "ethereum",
            from: publicKey,
            to: "admin",
            currency,
            amount: amount.toString(),
            purchasedCurrency: "usd",
            purchasedAmount: usdAmount.toString()
        });

        await req.user.addOperation(dbOperation);

        const updatedUsdValue = Number(req.user.usd) + Number(usdAmount);
        await req.user.update({
            usd: updatedUsdValue.toString()
        });
        
        return res.status(200).send("Ethereum sell succeeded.");
    } catch(error) { next(error) }
};
