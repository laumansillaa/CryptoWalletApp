module.exports = function(req, res, next) {
    req.logout();
    return res.status(200).send('Sign out succeeded.')
};
