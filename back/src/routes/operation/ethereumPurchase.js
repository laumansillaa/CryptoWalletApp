const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
const Binance = require("node-binance-api");
const binance = new Binance();
const { Key, Operation } = require("../../db").models;
const { ADMIN_ETHEREUM_PUBLIC_KEY, ADMIN_ETHEREUM_PRIVATE_KEY } = process.env;

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION ETHER PURCHASE ROUTE ----------")
    try {
        const { currency, amount, purchaseCurrency } = req.body;
        const keys = await Key.findOne({ where: { userId: req.user.id } });
        const prices = await binance.futuresPrices();
        const purchaseAmount = await amount / prices[`${purchaseCurrency}${currency}`];

        web3.eth.getTransactionCount(ADMIN_ETHEREUM_PUBLIC_KEY, async (err, transactionCount) => {
            const transaction = {
                nonce:    web3.utils.toHex(transactionCount),
                to:       keys.ethereum[0],
                value:    web3.utils.toHex(web3.utils.toWei(purchaseAmount.toString(), "ether")),
                gasLimit: web3.utils.toHex(21000),
                gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei"))
            };
            const signedTransaction = await web3.eth.accounts.signTransaction(transaction, ADMIN_ETHEREUM_PRIVATE_KEY);
            await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
        })

        const dbOperation = await Operation.create({
            operationType: "purchase",
            blockchain: "ethereum",
            from: keys.ethereum[0],
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
