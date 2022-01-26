const axios = require("axios");

module.exports = async function(req, res, next) {
    console.log("---------- ETH CURRENCIES DATA ROUTE ----------")
    const coins = [{coin: "BTC", id: "bitcoin"}, {coin: "ETH", id: "ethereum"}, {coin: "BNB", id: "binancecoin"}, {coin: "SOL", id: "solana"}, {coin: "ADA", id: "cardano"}]
    try {
        let dataCur = []
        for(var i = 0; i < coins.length; i++) {
            let api = await axios.get(`https://api.coingecko.com/api/v3/coins/${coins[i].id}`);
            let percDay = api.data.market_data.price_change_percentage_24h.toString().split(".");
            let percentageDay = `${percDay[0]},${percDay[1].slice(0,2)}%`;
            let percMonth = api.data.market_data.price_change_percentage_30d.toString().split(".");
            let percentageMonth = `${percMonth[0]},${percMonth[1].slice(0,2)}%`;
            dataCur.push({
                price: `$${api.data.market_data.current_price.usd}`,
                percDay: percentageDay[0] === "-" ? percentageDay : `+${percentageDay}`, 
                percMonth: percentageMonth[0] === "-" ? percentageMonth : `+${percentageMonth}`,
                img: api.data.image.large,
                name: api.data.name,
                symbol: api.data.symbol.toUpperCase()
            })
        }
        dataCur.push({
            price: "$4000",
            percDay: "+0.00%", 
            percMonth: "+0.00%",
            img: "https://pbs.twimg.com/profile_images/1184057626222444545/oZiWyMiY_400x400.png",
            name: "HenryCoin",
            symbol: "HNR"
        })
            
        return res.status(200).send(dataCur);
    } catch(error) { next(error) }
};
