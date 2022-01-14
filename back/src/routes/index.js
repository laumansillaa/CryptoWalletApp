module.exports = function(app) {
    app.use('/user', require('./user'));
    app.use('/session', require('./session'));
    app.use("/api", require("./api"))
    app.use("/transaction", require("./transactions"));
};
