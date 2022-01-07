module.exports = function(app) {
    app.use('/users', require('./users'))
    app.use('/session', require('./session'))
};
