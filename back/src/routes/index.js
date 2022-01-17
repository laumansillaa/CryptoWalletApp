module.exports = function(app) {
    app.use('/user', require('./user'));
    app.use('/session', require('./session'));
    app.use("/operation", require("./operation"));
    app.use("/balance", require("./balance"));
    app.use("/api", require("./api"))
};
