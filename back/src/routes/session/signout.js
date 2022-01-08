const passport = require('passport');
require('../../passport');

module.exports = function(req, res, next) {
    // passport.authenticate('local', (err, user, info) => {
    //     if (err) return next(err);
    //     else if (info) return res.send(info.message);
        
    //     req.logIn(user, (err) => {
    //         if (err) next(err);
    //         else return res.redirect('/');
    //     })
    // })(req, res, next);
}
