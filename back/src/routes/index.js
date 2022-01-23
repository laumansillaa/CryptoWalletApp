module.exports = function(app) {
    app.use('/user', require('./user'));
    app.use('/session', require('./session'));
    // app.use("/api", require("./api"));    
    app.use("/payment", require('./mercadopago'))
    app.use("/operation", require("./operation"));
    app.use("/balance", require("./balance"));
    app.use('/password', require('./forgotPassword'))
    app.use('/charts', require("./charts"));
    app.use('/contact', require('./contact'))
};
