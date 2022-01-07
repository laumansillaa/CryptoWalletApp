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
// const dietsLoader = require('./preloaders/dietsLoader.js')
// const recipesLoader = require('./preloaders/recipesLoader.js')

// Syncing all the models at once.
db.sync({ force: true }).then(async () => {
  console.log('Data base created.');
  await db.models.User.create({firstname: 'julian', lastname: 'alvarez', email: 'juli@gmail.com', password: '12345678', pin: '12345678'})
  await db.models.User.create({firstname: 'carlos', lastname: 'alvarez', email: 'carlos@gmail.com', password: '12345678', pin: '12345678'})
  // await Promise.all(dietsLoader());
  // console.log('Diets loaded.');
  // await Promise.all(recipesLoader());
  // console.log('Default recipes loaded.');
  app.listen(app.get('port'), () => {
    console.log(`Server listening at ${process.env.PORT}.`);
  });
});
