const axios = require("axios");
const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
const StellarSDK = require("stellar-sdk");
const server = new StellarSDK.Server("https://horizon-testnet.stellar.org");
const Binance = require("node-binance-api");
const binance = new Binance();
const { Key } = require("../../db.js").models;

module.exports = async function(req, res, next) {
    try {
        const keys = await Key.findOne({ where: { userId: req.user.id } });
        const prices = await binance.futuresPrices();

        const ethereumEtherInGwei = await web3.eth.getBalance(keys.ethereum[0]);
        const ethereumEther = await web3.utils.fromWei(ethereumEtherInGwei, "ether")
        const ethereumCurrencies = [{ currency: "ETH", amount: ethereumEther }] ;
        let ethereumUsd = 0;
        for (let i = 0; i < ethereumCurrencies.length; i++) {
            ethereumUsd += ethereumCurrencies[i].amount * prices[`${ethereumCurrencies[i].currency}USDT`];
        }

        const stellarAccount = await server.loadAccount(keys.stellar[0]);
        const stellarCurrencies = stellarAccount.balances
            .filter(currency => currency.asset_code !== undefined && currency.balance > 0)
            .map(currency => { return { currency: currency.asset_code, amount: currency.balance } });
        let stellarUsd = 0;
        for (let i = 0; i < stellarCurrencies.length; i++) {
            stellarUsd += stellarCurrencies[i].amount * prices[`${stellarCurrencies[i].currency}USDT`];
        }

        return res.status(200).send({
            ethereum: {
                usd: ethereumUsd.toString(),
                currencies: ethereumCurrencies
            },
            stellar: {
                usd: stellarUsd.toString(),
                currencies: stellarCurrencies
            }
        });
    } catch(error) { next(error) }
};

// if(currencies[i].Currency === "BTC") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "ETH") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "BNB") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "SOL") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "ADA") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "XRP") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "LUNA") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "DOT") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "AVAX") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "DOGE") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "SHIB") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "MATIC") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "LINK") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "LTC") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "ALGO") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "XLM") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "NEAR") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // }
        // if (currencies[i].Currency === "ATOM") {
        //     usd.Amount += currencies[i].Amount * prices[`${currencies[i].Currency}USDT`];
        // } 

