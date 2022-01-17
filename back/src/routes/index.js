module.exports = function(app) {
    app.use('/user', require('./user'));
    app.use('/session', require('./session'));
<<<<<<< HEAD
    // app.use("/api", require("./api"));    
=======
>>>>>>> 87286c9f8bfca62d0dfcb02d33ae3cbf8f626b76
    app.use("/payment", require('./mercadopago'))
    app.use("/operation", require("./operation"));
    app.use("/balance", require("./balance"));
};
