const axios = require("axios");
const StellarSDK = require("stellar-sdk");
const server = new StellarSDK.Server("https://horizon-testnet.stellar.org");
const Binance = require("node-binance-api");
const binance = new Binance();
const { Key, Operation } = require("../../db").models;

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION STELLAR SELL ROUTE ----------")
    try {
        const { sellCurrency, sellAmount, purchaseCurrency } = req.body;
        const keys = await Key.findOne({ where: { user: req.user.id } });
        const prices = await binance.futuresPrices();
        const purchaseAmount = await sellAmount * prices[`${sellCurrency}USDT`];

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
                price: "0.1"
            }))
            .addOperation(StellarSDK.Operation.payment({
                destination: "GBIL6YKN2NTZH66PZC7FXD4JTOIMLN2BTAT2WDKG4BWJ2HGADV4TYP6A",
                asset: new StellarSDK.Asset(sellCurrency, "GATI44K5PNGVLJK46IRHKJH7QHUZTGS72BJKFCZETYYLS43QX4FMSVGP"),
                amount: sellAmount.toString()
            }))
            .setTimeout(300).build();

        operation.sign(stellarKeyPair);

        await server.submitTransaction(operation);

        const dbOperation = await Operation.create({
            operationType: "sell",
            blockchain: "stellar",
            from: keys.stellar[0],
            to: "admin",
            currency: sellCurrency,
            amount: sellAmount,
            purchasedCurrency: purchaseCurrency,
            purchasedAmount: purchaseAmount
        });

        await req.user.addOperation(dbOperation);

        return res.status(200).send("Stellar sell succeeded.");
    } catch(error) { next(error) }
};
