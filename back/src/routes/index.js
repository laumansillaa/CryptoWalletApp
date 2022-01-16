module.exports = function(app) {
    app.use('/user', require('./user'));
    app.use('/session', require('./session'));
   
    app.use("/", require("./transactions"));
    app.use("/balance", require("./balance"));
};
