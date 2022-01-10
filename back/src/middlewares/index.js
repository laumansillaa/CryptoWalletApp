const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

module.exports = function (app) {
  app.use(morgan('dev'));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Update to match the domain you will make the request from.
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

  // Authentication middlewares
  app.use(session({
    secret: 'hs01sAFol2ldpHqp1R0394l',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cors());

  // Access middlewares.
  app.use((req, res, next) => {
    if (
      (!req.url.startsWith('/session/') || req.url === '/session/signout') &&
      !req.isAuthenticated()
    ) {
      return res.status(401).send('Access denied.');
    } else next()
  });
  app.use((req, res, next) => {
    if (
      (req.url.startsWith('/session/') && req.url !== '/session/signout') &&
      req.isAuthenticated()
    ) {
      return res.status(200).send('You have already signed up.');
    } else next()
  });
}
