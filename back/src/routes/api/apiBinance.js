const Binance = require('node-binance-api');
const binance = new Binance()

const tokens = {
   BTCUSDT:"BTCUSDT",
   ETCUSDT:"ETCUSDT",
   BNBUSDT:"BNBUSDT",
   SOLUSDT:"SOLUSDT",
   ADAUSDT:"ADAUSDT",
   XRPUSDT:"XRPUSDT",
   LUNAUSDT:"LUNAUSDT",
   DOTUSDT:"DOTUSDT",
   AVAXUSDT:"AVAXUSDT",
   DOGEUSDT:"DOGEUSDT",
   "1000SHIBUSDT":"1000SHIBUSDT",
   MATICUSDT:"MATICUSDT",
   LINKUSDT:"LINKUSDT",
   LTCUSDT:"LTCUSDT",
   ALGOUSDT:"ALGOUSDT",
   XLMUSDT:"XLMUSDT",
   NEARUSDT:"NEARUSDT",
   ATOMUSDT:"ATOMUSDT",
   





}

module.exports = async function(req, res) {
   let aux = Object.entries(await binance.futuresPrices());
     
      aux = aux.filter((element) =>tokens[element[0]])
      aux = aux.sort(function(a,b){
               if(a[1] > b[1]){
                  return 1;
               }
               if(a[1] < b[1]){
                  return -1;
               }
               return 0

               });
     
   return res.status(200).json(aux);
};
