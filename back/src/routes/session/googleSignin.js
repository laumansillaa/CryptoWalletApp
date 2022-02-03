const passport = require("../../passport");

module.exports = function(req, res, next) {
    console.log("---------- GOOGLE SIGN IN ROUTE ----------")
    passport.authenticate("google", (err, user) => {
        if (err) next(err);
        else if (!user) return res.status(401).send("Sign in failed: bad credentials.");
        
        req.logIn(user, (err) => {
            if (err) next(err);
            else return res.status(200).send("Sign in succeeded.");
        });
    })(req, res, next);
};
