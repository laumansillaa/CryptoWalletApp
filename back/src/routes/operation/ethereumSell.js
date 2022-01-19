const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
const Binance = require("node-binance-api");
const binance = new Binance();
const { Key, Operation } = require("../../db").models;
const { ADMIN_ETHEREUM_PUBLIC_KEY, ADMIN_ETHEREUM_PRIVATE_KEY } = process.env;

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION ETHER SELL ROUTE ----------")
    try {
        // We get the user public key from data base. User is the one purchasing the crypto currency, which will
        // be extracted from the admin's account (<ADMIN_ETHEREUM_PUBLIC_KEY> and <ADMIN_ETHEREUM_PRIVATE_KEY>). 
        const { currency, amount, purchaseCurrency } = req.body;
        const publicKey = (await Key.findOne({ where: { userId: req.user.id } })).ethereum[0];
        const prices = await binance.futuresPrices();
        const purchaseAmount = await amount / prices[`${purchaseCurrency}${currency}`];

        const transactionCount = await web3.eth.getTransactionCount(ADMIN_ETHEREUM_PUBLIC_KEY);
        const transaction = {
            nonce: web3.utils.toHex(transactionCount),
            to: publicKey,
            value: web3.utils.toHex(web3.utils.toWei(purchaseAmount.toString(), "ether")),
            gasLimit: web3.utils.toHex(21000),
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei"))
        };
        const signedTransaction = await web3.eth.accounts.signTransaction(transaction, ADMIN_ETHEREUM_PRIVATE_KEY);
        await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

        const dbOperation = await Operation.create({
            operationType: "purchase",
            blockchain: "ethereum",
            from: publicKey,
            to: "admin",
            currency: currency,
            amount: amount,
            purchasedCurrency: purchaseCurrency,
            purchasedAmount: purchaseAmount
        });

        await req.user.addOperation(dbOperation);

        return res.status(200).send("Ethereum purchase succeeded.");
    } catch(error) { next(error) }
};
