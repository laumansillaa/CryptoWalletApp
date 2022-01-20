const axios = require("axios");
const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
const StellarSDK = require("stellar-sdk");
const server = new StellarSDK.Server("https://horizon-testnet.stellar.org");
const Binance = require("node-binance-api");
const binance = new Binance();
const { Key, Staking, User } = require("../../db.js").models;

module.exports = async function(req, res, next) {
    try {
        const keys = await Key.findOne({ where: { userId: req.user.id } });
        const prices = await binance.futuresPrices();

        const ethereumEtherInGwei = await web3.eth.getBalance(keys.ethereum[0]);
        const ethereumEther = await web3.utils.fromWei(ethereumEtherInGwei, "ether")
        const ethereumCurrencies = [{ currency: "ETH", amount: ethereumEther }] ;
        let ethereumCrypto = 0;
        let ethereumStaking = 0;
        for (let i = 0; i < ethereumCurrencies.length; i++) {
            ethereumCrypto += ethereumCurrencies[i].amount * prices[`${ethereumCurrencies[i].currency}USDT`];
        }

        const stellarAccount = await server.loadAccount(keys.stellar[0]);
        const stellarCurrencies = stellarAccount.balances
            .filter(currency => currency.asset_code !== undefined && currency.asset_code !== "USD" && currency.balance > 0)
            .map(currency => { return { currency: currency.asset_code, amount: currency.balance } });
        const stellarStake = await Staking.findAll({ where: { publicKey: keys.stellar[0]}})
        let stellarCrypto = 0;
        let stellarStaking = 0;
        for (let i = 0; i < stellarCurrencies.length; i++) {
            stellarCrypto += stellarCurrencies[i].amount * prices[`${stellarCurrencies[i].currency}USDT`];
            stellarStake.forEach(data => {
                if(data.currency === stellarCurrencies[i].currency) {
                    stellarCurrencies[i].staking = data.amount;
                    stellarStaking += parseFloat(data.amount) * prices[`${stellarCurrencies[i].currency}USDT`];
                }
            })
        }

        const user = await User.findOne({ where: { id: req.user.id } })

        return res.status(200).send({
            ethereum: {
                cryptoBalance: ethereumCrypto.toString(),
                stakingBalance: ethereumStaking.toString(),
                currencies: ethereumCurrencies
            },
            stellar: {
                cryptoBalance: stellarCrypto.toString(),
                stakingBalance: stellarStaking.toString(),
                currencies: stellarCurrencies
            },
            funds: {
                balance: user.usd === null ? "0" : user.usd.toString()
            }
        });
    } catch(error) { next(error) }
};
