const { Transactions, User } = require('../../db').models;
const StellarSDK = require('stellar-sdk');
const axios = require("axios");
const Binance = require('node-binance-api');

const server = new StellarSDK.Server("https://horizon-testnet.stellar.org");

module.exports = async function(req, res) {
    const userPK = req.params.pk;
    const user = await User.findOne({ where: { publicKey: userPK } });
    const account = await server.loadAccount(user.publicKey);
    const binance = new Binance();
    const prices = await binance.futuresPrices()
    
    const currencies = account.balances.filter(balance => balance.asset_code !== undefined && balance.balance > 0).map(balance => obj = {Currency: balance.asset_code, Amount: balance.balance});
    
    let usd = {
        Currency: "USD",
        Amount: 0
    }

    for(let i = 0; i < currencies.length; i++) {
        if(currencies[i].Currency === "BTC") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "ETH") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "BNB") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "SOL") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "ADA") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "XRP") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "LUNA") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "DOT") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "AVAX") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "DOGE") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "SHIB") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "MATIC") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "LINK") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "LTC") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "ALGO") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "XLM") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "NEAR") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        }
        if (currencies[i].Currency === "ATOM") {
            usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        } 
        if(i >= currencies.length -1) {
            usd.Amount = usd.Amount.toString();
        }
    }

    currencies.push(usd);

    return res.status(200).send(currencies);
};