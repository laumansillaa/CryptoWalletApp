const app = require('express')();

// Configuration.
app.name = 'SERVER';
app.set('port', process.env.PORT || 3001);

// Middlewares.
require('./middlewares')(app);

// Routes middleware.
require('./routes')(app);

// Error catching endware.
app.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.log('ENTERING error carching endware ----------')
  console.log('STATUS', err.status)
  console.log('MESSAGE', err.message)
  console.log('ERR', err)
  console.log('QUITING error carching endware ----------')
  console.error(err);
  return res.status(status).send(message);
});

module.exports = app;
