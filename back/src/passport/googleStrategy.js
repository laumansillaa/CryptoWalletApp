const GoogleStrategy = require('passport-google-oauth2').Strategy;

module.exports = function(passport, User) {
  passport.use(new GoogleStrategy({
      clientID: '868799943192-uo3c46es6paosq2uc28k1vkbkihh8a86.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/session/googleSignin/callback'
    },

    async function(accessToken, refreshToken, profile, done) {
      console.log('---------- PASSPORT GOOGLE STRATEGY ----------')
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
            email,
            pin: '000000'
          });

          done(null, dbCreatedUser);
        }
      } catch(error) { done(error) }
    }
  ));
}
