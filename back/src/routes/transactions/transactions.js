const { Transactions, User } = require('../../db').models;
const StellarSDK = require('stellar-sdk');
const axios = require("axios");
const Binance = require('node-binance-api');

const server = new StellarSDK.Server("https://horizon-testnet.stellar.org");

module.exports = async function(req, res) {
    try {
        const { from, transactionType, currencyEgress, egressAmount, currencyIngress } = req.body;
        const binance = new Binance();
        const prices = await binance.futuresPrices()

        const amount = await egressAmount / prices[`${currencyIngress}USDT`];

        await Transactions.create({
            from: from,
            destination: "none",
            transactionType: transactionType,
            currencyEgress: currencyEgress,
            egressAmount: egressAmount,
            currencyIngress: currencyIngress,
            ingressAmount: amount
        })

        const user = await User.findOne({ where: { publicKey: from } });

        const userKey = StellarSDK.Keypair.fromSecret(user.secretKey);
        const userAccount = await server.loadAccount(user.publicKey);
    
        const transaction = new StellarSDK.TransactionBuilder(userAccount, {
            fee: StellarSDK.BASE_FEE,
            networkPassphrase: StellarSDK.Networks.TESTNET
        })
        .addOperation(StellarSDK.Operation.changeTrust({
            asset: new StellarSDK.Asset(currencyIngress, "GATI44K5PNGVLJK46IRHKJH7QHUZTGS72BJKFCZETYYLS43QX4FMSVGP"),
            limit: "10000"
        }))
        .addOperation(StellarSDK.Operation.manageBuyOffer({
            selling: StellarSDK.Asset.native(),
            buying: new StellarSDK.Asset(currencyIngress, "GATI44K5PNGVLJK46IRHKJH7QHUZTGS72BJKFCZETYYLS43QX4FMSVGP"),
            buyAmount: amount.toString().slice(0, 6),
            price: egressAmount
        }))
        .setTimeout(300).build();
    
        transaction.sign(userKey);
    
        await server.submitTransaction(transaction);
    
        console.log("TOKENS HAVE BEEN BUYED");

        return res.status(200).send("Transaction");
    } catch(error) {
        console.log(error)
        return res.status(400).send("Error")
    }
};
