const passport = require('../../passport');

module.exports = function(req, res, next) {
    console.log('ENTERING /session/localSignin ----------')
    passport.authenticate('local', (err, user) => {
        console.log('ENTERING passport.authenticate CB ----------')
        console.log('ERR', err)
        console.log('USER', user)
        console.log('QUITING passport.authenticate CB ----------')
        if (err) next(err);
        else if (!user) return res.status(401).send('Authentication failed: bad credentials.');
        
        req.logIn(user, (err) => {
            console.log('ENTERING req.logIn CB ----------')
            console.log('ERR', err)
            console.log('QUITING req.logIn CB ----------')
            if (err) next(err);
            else return res.status(200).send('Authentication succeeded.'); 
        })
    })(req, res, next);
}
