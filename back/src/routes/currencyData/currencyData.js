const axios = require("axios");

module.exports = async function(req, res, next) {
    console.log("---------- CURRENCY DATA ROUTE ----------")
    const coins = [{coin: "BTC", id: "bitcoin"}, {coin: "ETH", id: "ethereum"}, {coin: "BNB", id: "binancecoin"}, {coin: "SOL", id: "solana"}, {coin: "ADA", id: "cardano"}, {coin: "XRP", id: "ripple"}, {coin: "LUNA", id: "terra-luna"}, {coin: "DOT", id: "polkadot"}, {coin: "AVAX", id: "avalanche-2"}, {coin: "DOGE", id: "dogecoin"}, {coin: "SHIB", id: "shiba-inu"}, {coin: "MATIC", id: "matic-network"}, {coin: "LINK", id: "chainlink"}, {coin: "LTC", id: "litecoin"}, {coin: "ALGO", id: "algorand"}, {coin: "XLM", id: "stellar"}, {coin: "NEAR", id: "near"}, {coin: "ATOM", id: "cosmos"}]
    try {
        const { crypto } = req.params;
        const cryptoSelected = coins.filter(coin => coin.coin === crypto);
        const api = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoSelected[0].id}`);
        const percDay = api.data.market_data.price_change_percentage_24h.toString().split(".");
        const percentageDay = `${percDay[0]},${percDay[1].slice(0,2)}%`;
        const percMonth = api.data.market_data.price_change_percentage_30d.toString().split(".");
        const percentageMonth = `${percMonth[0]},${percMonth[1].slice(0,2)}%`;
        const data = {
            price: api.data.market_data.current_price.usd.toString(),
            percDay: percentageDay[0] === "-" ? percentageDay : `+${percentageDay}`, 
            percMonth: percentageMonth[0] === "-" ? percentageMonth : `+${percentageMonth}`,
            img: api.data.image.large,
            name: api.data.name
        }

        return res.status(200).send(data);
    } catch(error) { next(error) }
};
