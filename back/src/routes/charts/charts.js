const axios = require("axios");
const StellarSDK = require("stellar-sdk");
const server = new StellarSDK.Server("https://horizon-testnet.stellar.org");
const Binance = require("node-binance-api");
const binance = new Binance();
const { Key, Operation } = require("../../db").models;

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION STELLAR CHARTS ROUTE ----------")
    try {
        const prices = await binance.futuresPrices();

        
        return res.status(200).send(prices);
    } catch(error) { next(error) }
};
