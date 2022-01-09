module.exports = function(app) {
    app.use('/user', require('./user'));
    app.use('/session', require('./session'));

    app.get('/', (req, res) => {
        res.status(200).send('THIS IS /')
    });
};
