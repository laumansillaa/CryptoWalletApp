const Binance = require('node-binance-api');
const binance = new Binance()
/* const tokens = {
    BTCUSDT:"BTCUSDT",
    ETHUSDT:"ETCUSDT",
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
 */

module.exports = function generator(io){

    binance.futuresMiniTickerStream("BTCUSDT",(element)=>{
        io.emit("BTCUSDT",element.close)});
    binance.futuresMiniTickerStream("ETHUSDT",(element)=>{
        io.emit("ETHUSDT",element.close)});
    binance.futuresMiniTickerStream("BNBUSDT",(element)=>{
        io.emit("BNBUSDT",element.close)});
    binance.futuresMiniTickerStream("SOLUSDT",(element)=>{
        io.emit("SOLUSDT",element.close)});
    binance.futuresMiniTickerStream("ADAUSDT",(element)=>{
        io.emit("ADAUSDT",element.close)});
    binance.futuresMiniTickerStream("XRPUSDT",(element)=>{
        io.emit("XRPUSDT",element.close)});
    binance.futuresMiniTickerStream("LUNAUSDT",(element)=>{
        io.emit("LUNAUSDT",element.close)});
    binance.futuresMiniTickerStream("DOTUSDT",(element)=>{
        io.emit("DOTUSDT",element.close)});
    binance.futuresMiniTickerStream("AVAXUSDT",(element)=>{
        io.emit("AVAXUSDT",element.close)});
    binance.futuresMiniTickerStream("DOGEUSDT",(element)=>{
        io.emit("DOGEUSDT",element.close)});
    binance.futuresMiniTickerStream("1000SHIBUSDT",(element)=>{
        io.emit("1000SHIBUSDT",element.close)});
    binance.futuresMiniTickerStream("MATICUSDT",(element)=>{
        io.emit("MATICUSDT",element.close)});
    binance.futuresMiniTickerStream("LINKUSDT",(element)=>{
        io.emit("LINKUSDT",element.close)});
    binance.futuresMiniTickerStream("LTCUSDT",(element)=>{
        io.emit("LTCUSDT",element.close)});
    binance.futuresMiniTickerStream("ALGOUSDT",(element)=>{
        io.emit("ALGOUSDT",element.close)});
    binance.futuresMiniTickerStream("XLMUSDT",(element)=>{
        io.emit("XLMUSDT",element.close)});
    binance.futuresMiniTickerStream("NEARUSDT",(element)=>{
        io.emit("NEARUSDT",element.close)});
    binance.futuresMiniTickerStream("ATOMUSDT",(element)=>{
        io.emit("ATOMUSDT",element.close)});

                   
           


};