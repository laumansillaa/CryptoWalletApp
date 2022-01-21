const passport = require('../../passport');

module.exports = function(req, res, next) {
    console.log('---------- SESSION LOCAL SIGN IN ROUTE ----------')
    passport.authenticate('local', (err, user) => {
        if (!user) return res.status(401).send('Sign in failed: bad credentials.');
        if(user.verifieldUser) {
            if (err) next(err);            
            req.logIn(user, (err) => {
                if (err) next(err);
                else return res.status(200).send('Sign in succeeded.'); 
            })
        } else {
            res.status(400).send('The unverified User')
        }
    })(req, res, next);
}
