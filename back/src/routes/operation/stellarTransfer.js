
const { Op } = require("sequelize");
const axios = require("axios");
const StellarSDK = require("stellar-sdk");
const server = new StellarSDK.Server("https://horizon-testnet.stellar.org");
const { Key, Operation } = require("../../db").models;


module.exports = async function(req, res, next) {
    console.log("---------- OPERATION STELLAR TRANSFER ROUTE ----------")
    try {
        const { transferCurrency, transferAmount, pKey } = req.body;


        const trusterKeys = await Key.findOne({where:{stellar:{[Op.contains]:[pKey]}}});
        
        const trusterKey = StellarSDK.Keypair.fromSecret(trusterKeys.stellar[1]);
        const trusterAccount = await server.loadAccount(trusterKeys.stellar[0]);

        const trustTransaction = new StellarSDK.TransactionBuilder(trusterAccount, {
            fee: StellarSDK.BASE_FEE,
            networkPassphrase: StellarSDK.Networks.TESTNET
        })
            .addOperation(StellarSDK.Operation.changeTrust({
            asset: new StellarSDK.Asset(transferCurrency, "GATI44K5PNGVLJK46IRHKJH7QHUZTGS72BJKFCZETYYLS43QX4FMSVGP"),
            limit: "100000"
        }))
            .setTimeout(100).build();

        trustTransaction.sign(trusterKey);

        await server.submitTransaction(trustTransaction);

        const keys = await Key.findOne({ where: { userId: req.user.id } });

        const stellarAccount = await server.loadAccount(keys.stellar[0]);
        const stellarKeyPair = StellarSDK.Keypair.fromSecret(keys.stellar[1]);
        const operation = new StellarSDK.TransactionBuilder(stellarAccount, {
            fee: StellarSDK.BASE_FEE,
            networkPassphrase: StellarSDK.Networks.TESTNET
        })
            .addOperation(StellarSDK.Operation.payment({
                destination: trusterKeys.stellar[0],
                asset: new StellarSDK.Asset(transferCurrency, "GATI44K5PNGVLJK46IRHKJH7QHUZTGS72BJKFCZETYYLS43QX4FMSVGP"),
                amount: transferAmount.toString()
            }))
            .setTimeout(100).build();

        operation.sign(stellarKeyPair);

        await server.submitTransaction(operation);

        const dbOperation = await Operation.create({
            operationType: "transfer",
            blockchain: "stellar",
            from: keys.stellar[0],
            to: trusterKeys.stellar[0],
            currency: transferCurrency,
            amount: transferAmount,
            purchasedCurrency: null,
            purchasedAmount: null
        });

        await req.user.addOperation(dbOperation);

        return res.status(200).send("Stellar transfer succeeded.");
    } catch(error) { next(error) }
};