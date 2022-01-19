const axios = require("axios");
const StellarSDK = require("stellar-sdk");
const server = new StellarSDK.Server("https://horizon-testnet.stellar.org");
const Binance = require("node-binance-api");
const binance = new Binance();
const { Key, Operation } = require("../../db").models;

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION STELLAR PURCHASE ROUTE ----------")
    try {
        const { currency, amount, purchaseCurrency } = req.body;
        const keys = await Key.findOne({ where: { user: req.user.id } });
        const prices = await binance.futuresPrices();
        const purchaseAmount = await amount / prices[`${purchaseCurrency}${currency}`];

        const stellarAccount = await server.loadAccount(keys.stellar[0]);
        const stellarKeyPair = StellarSDK.Keypair.fromSecret(keys.stellar[1]);
        const operation = new StellarSDK.TransactionBuilder(stellarAccount, {
            fee: StellarSDK.BASE_FEE,
            networkPassphrase: StellarSDK.Networks.TESTNET
        })
            .addOperation(StellarSDK.Operation.changeTrust({
                asset: new StellarSDK.Asset(purchaseCurrency, "GATI44K5PNGVLJK46IRHKJH7QHUZTGS72BJKFCZETYYLS43QX4FMSVGP"),
                limit: "10000"
            }))
            .addOperation(StellarSDK.Operation.manageBuyOffer({
                selling: StellarSDK.Asset.native(),
                buying: new StellarSDK.Asset(purchaseCurrency, "GATI44K5PNGVLJK46IRHKJH7QHUZTGS72BJKFCZETYYLS43QX4FMSVGP"),
                buyAmount: purchaseAmount.toString().slice(0, 6),
                price: amount
            }))
            .setTimeout(100).build();

        operation.sign(stellarKeyPair);

        await server.submitTransaction(operation);

        const dbOperation = await Operation.create({
            operationType: "purchase",
            blockchain: "stellar",
            from: keys.stellar[0],
            to: "admin",
            currency: currency,
            amount: amount,
            purchasedCurrency: purchaseCurrency,
            purchasedAmount: purchaseAmount
        });

        await req.user.addOperation(dbOperation);

        return res.status(200).send("Stellar purchase succeeded.");
    } catch(error) { next(error) }
};
