//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

require('dotenv').config();
const app = require('./app.js');
const db = require('./db.js');
const Binance = require('node-binance-api');
const binance = new Binance()
const { createServer } = require("http");
const httpServer = createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, { cors: {
  origin: "http://192.168.1.8:19006",
  credentials:true
}});

// Server initialization.
(async function() {
  try {
    await db.sync({ force: true })
    console.log('Data base created.');
    httpServer.listen(app.get('port'), () => {
      console.log(`Server listening at port ${process.env.PORT}.`);
    });
    io.on("connection", socket => {
      socket.on("token client", token => {
        binance.futuresMiniTickerStream(token, element => {
          io.emit(token, element.close)});
      })
      console.log("Front connected.")
    })
  } catch(error) { console.error(error) }
})()

