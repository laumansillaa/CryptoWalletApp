const axios = require("axios");
const StellarSDK = require("stellar-sdk");
const server = new StellarSDK.Server("https://horizon-testnet.stellar.org");
const { Key, Operation } = require("../../db").models;

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION STELLAR TRANSFER ROUTE ----------")
    try {
        const { transferCurrency, transferAmount, to } = req.body;
        const keys = await Key.findOne({ where: { user: req.user.id } });

        const stellarAccount = await server.loadAccount(keys.stellar[0]);
        const stellarKeyPair = StellarSDK.Keypair.fromSecret(keys.stellar[1]);
        const operation = new StellarSDK.TransactionBuilder(stellarAccount, {
            fee: StellarSDK.BASE_FEE,
            networkPassphrase: StellarSDK.Networks.TESTNET
        })
            .addOperation(StellarSDK.Operation.payment({
                destination: to,
                asset: new StellarSDK.Asset(transferCurrency, "GATI44K5PNGVLJK46IRHKJH7QHUZTGS72BJKFCZETYYLS43QX4FMSVGP"),
                amount: transferAmount.toString()
            }))
            .setTimeout(300).build();

        operation.sign(stellarKeyPair);

        await server.submitTransaction(operation);

        const dbOperation = await Operation.create({
            operationType: "transfer",
            blockchain: "stellar",
            from: keys.stellar[0],
            to: to,
            currency: transferCurrency,
            amount: transferAmount
        });

        await req.user.addOperation(dbOperation);

        return res.status(200).send("Stellar transfer succeeded.");
    } catch(error) { next(error) }
};