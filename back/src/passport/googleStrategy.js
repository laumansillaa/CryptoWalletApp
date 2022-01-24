const GoogleStrategy = require("passport-google-oauth2").Strategy;

module.exports = function(passport, User) {
  passport.use(new GoogleStrategy({
      clientID: "868799943192-lqbn0pis135kmna4mvckvg83j9s7n9i2.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/session/googleSignin/callback"
    }, async function(accessToken, refreshToken, profile, done) {
      console.log("---------- PASSPORT GOOGLE STRATEGY THEN ----------")
      try {
        const firstname = profile.name.givenName; 
        const lastname = profile.name.familyName;
        const email = profile.emails[0].value;
      
        const dbUser = await User.findOne({
          where: { email: email } 
        });
        
        if (dbUser) {
          done(null, dbUser)
        } else {
          const dbCreatedUser = await User.create({
            firstname,
            lastname,
            sessionType: "google",
            email,
            password: null,
            usd: "0",
            pin: "000000"
          });
          done(null, dbCreatedUser);
        }
      } catch(error) { done(error) }
    }
  ));
}
