const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
const Binance = require("node-binance-api");
const binance = new Binance();
const { Key, Operation } = require("../../db").models;
const { ADMIN_ETHEREUM_PUBLIC_KEY } = process.env;

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION ETHER SELL ROUTE ----------")
    try {
        // We get the user public key from data base. User is the one selling the crypto currency, which will
        // be transfered to the admin's account (<ADMIN_ETHEREUM_PUBLIC_KEY> and <ADMIN_ETHEREUM_PRIVATE_KEY>). 
        const { currency, amount, purchaseCurrency } = req.body;
        if (currency !== "ETH" || purchaseCurrency !== "USDT") return res.status(400).send("Currency variable must be 'ETH' and purchase currency 'USDT'");
        const [publicKey, privateKey] = (await Key.findOne({ where: { userId: req.user.id } })).ethereum;
        const prices = await binance.futuresPrices();
        const purchaseAmount = await Number(amount) * prices[`${currency}${purchaseCurrency}`];

        const transactionCount = await web3.eth.getTransactionCount(publicKey);
        const transaction = {
            nonce: web3.utils.toHex(transactionCount),
            to: ADMIN_ETHEREUM_PUBLIC_KEY,
            value: web3.utils.toHex(web3.utils.toWei(amount.toString(), "ether")),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei"))
        };
        const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKey);
        await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

        const dbOperation = await Operation.create({
            operationType: "sell",
            blockchain: "ethereum",
            from: publicKey,
            to: "admin",
            currency: currency,
            amount: amount,
            purchasedCurrency: purchaseCurrency,
            purchasedAmount: purchaseAmount.toString()
        });

        await req.user.addOperation(dbOperation);

        const updatedUsdValue = Number(req.user.usd) + Number(purchaseAmount);
        await req.user.update({
            usd: updatedUsdValue.toString()
        });

        return res.status(200).send("Ethereum purchase succeeded.");
    } catch(error) { next(error) }
};
