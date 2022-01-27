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

require("dotenv").config();
const { PORT } = process.env;
const app = require("./app.js");
const db = require("./db.js");
const { createServer } = require("http");
const httpServer = createServer(app);

// Server initialization.
(async function() {
  try {
    await db.sync({ force: true })
    console.log("Data base created.");
    await require("./utils/defaultUserCreator.js")();
    console.log("Default user created."); 
    await require("./utils/binanceConnectionCreator.js")(httpServer);
    console.log("Client socket connected.");

    await httpServer.listen(app.get("port"));
    console.log(`Server listening at port ${PORT}.`);
  } catch(error) { console.error(error) }
})()
