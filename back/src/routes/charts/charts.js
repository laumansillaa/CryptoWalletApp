const axios = require("axios");

module.exports = async function(req, res, next) {
    console.log("---------- OPERATION CHARTS ROUTE ----------")
    const coins = [{coin: "BTC", id: "bitcoin"}, {coin: "ETH", id: "ethereum"}, {coin: "BNB", id: "binancecoin"}, {coin: "SOL", id: "solana"}, {coin: "ADA", id: "cardano"}, {coin: "XRP", id: "ripple"}, {coin: "LUNA", id: "terra-luna"}, {coin: "DOT", id: "polkadot"}, {coin: "AVAX", id: "avalanche-2"}, {coin: "DOGE", id: "dogecoin"}, {coin: "SHIB", id: "shiba-inu"}, {coin: "MATIC", id: "matic-network"}, {coin: "LINK", id: "chainlink"}, {coin: "LTC", id: "litecoin"}, {coin: "ALGO", id: "algorand"}, {coin: "XLM", id: "stellar"}, {coin: "NEAR", id: "near"}, {coin: "ATOM", id: "cosmos"}]
    try {
        const { crypto } = req.params;
        const cryptoSelected = coins.filter(coin => coin.coin === crypto);
        const api = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoSelected[0].id}/market_chart?vs_currency=usd&days=30&interval=daily`);
        const monthPrices = api.data.prices.map(dayPrice => dayPrice[1])

        return res.status(200).send(monthPrices);
    } catch(error) { next(error) }
};
