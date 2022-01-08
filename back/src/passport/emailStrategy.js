const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db').models.User;

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },

  async function (email, password, done) {
    try {
      const user = await User.findOne({ where: { email: email } });

      if (!user || user.password !== password) {
        return done(null, false)
      } else {
        return done(null, user)
      }
    } catch (err) { return done(err) }
  }
));
