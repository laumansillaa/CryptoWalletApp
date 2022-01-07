const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

  async function (mail, password, done) {
    try {
      const user = await db.users.findByUsername(mail)

      if (!user) return done(null, false)

      else if (user.password !== password) return done(null, false)

      else return done(null, user);
    }

    catch (err) {
      return done(err);
    }
  }
));
