const passport = require("../../passport");

module.exports = function(req, res, next) {
    console.log("---------- GOOGLE SIGN IN ROUTE ----------")
    passport.authenticate("google", (err, user) => {
        if (err) next(err);
        else if (!user) return res.status(401).send("Sign in failed: bad credentials.");
        
        req.logIn(user, (err) => {
            if (err) next(err);
            else return res.redirect(`http://${process.env.IP_HOST}:19006`);
        });
    })(req, res, next);
};
