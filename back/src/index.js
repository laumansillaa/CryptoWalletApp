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

// Server initialization.
(async function() {
  try {
    await db.sync({ force: true })
    console.log('Data base created.');
    await Promise.all([
      db.models.User.create({firstname: 'julian', lastname: 'alvarez', email: 'julian@gmail.com', password: 'password123', phone: '1133333333', pin: '123456'}),
      db.models.User.create({firstname: 'carlos', lastname: 'gonzalez', email: 'carlos@gmail.com', password: 'password321', phone: '1144444444', pin: '654321'})
    ])
    app.listen(app.get('port'), () => {
      console.log(`Server listening at port ${process.env.PORT}.`);
    });
  } catch(error) { console.error(error) }
})()
