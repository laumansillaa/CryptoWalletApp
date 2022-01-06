const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middlewares.
const app = express();
app.name = 'SERVER';
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Update to match the domain you will make the request from.
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Routes middleware.
// const recipes = require('./routes/recipes');
// const diets = require('./routes/diets');
// app.use('/recipes', recipes);
// app.use('/diets', diets);

// Error catching endware.


app.use((error, req, res, next) => { 
  const status = error.status || 500;
  const message = error.message || error;
  console.error(error);
  res.status(status).send(message);
});

module.exports = app;
