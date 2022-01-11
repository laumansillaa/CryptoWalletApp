module.exports = function(req, res, next) {
    console.log('---------- ROUTE SESSION SIGN OUT ----------')
    req.logout();
    return res.status(200).send('Sign out succeeded.')
};
