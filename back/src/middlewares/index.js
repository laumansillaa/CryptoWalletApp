const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

module.exports = function (app) {
  app.use(morgan('dev'));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
  app.use(
    cors({
      // origin: `http://${process.env.IP_HOST}:19006`,
      origin: "*",
      credentials: true,
    })
  );

  // Session middlewares.
  app.use(session({
    secret: 'hs01sAFol2ldpHqp1R0394l',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 360*24*60*60*1000}
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Authentication middlewares.
  app.use((req, res, next) => {
    console.log('---------- ACCESS MIDDLEWARE 1 ----------')
    if (
      (!(req.url.startsWith('/session/') || req.url.startsWith('/password/'))  || req.url === '/session/signout') &&
      !req.isAuthenticated()
    ) {
      return res.status(401).send('Access denied.');
    } else next()
  });
  app.use((req, res, next) => {
    console.log('---------- ACCESS MIDDLEWARE 2 ----------')
    if (
      ((req.url.startsWith('/session/') && req.url !== '/session/signout') || req.url.startsWith("/password/")) &&
      req.isAuthenticated()
    ) {
      return res.status(200).send('You have already signed up.');
    } else next()
  });
}
