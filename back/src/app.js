const app = require("express")();

// Configuration.
app.name = "SERVER";
app.set("port", process.env.PORT || 3001);

// Middlewares.
require("./middlewares")(app);

// Routes middleware.
require("./routes")(app);

// Error catching endware.
app.use((err, req, res, next) => { 
  console.log("---------- ERROR CATCHING ENDWARE ----------")
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  return res.status(status).send(message);
});

module.exports = app;
