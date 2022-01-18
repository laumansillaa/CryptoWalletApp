module.exports = function(req, res, next) {
    console.log('---------- SESSION SIGN OUT ROUTE ----------')
    req.logout();
    return res.status(200).send('Sign out succeeded.')
};
