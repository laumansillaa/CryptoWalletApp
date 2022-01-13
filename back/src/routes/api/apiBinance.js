const Binance = require('node-binance-api');
const binance = new Binance()
module.exports = async function(req, res) {
   return res.status(200).send( await binance.futuresPrices());
};
