const passport = require('passport');
const User = require('../db.js').models.User;
require('./emailStrategy.js');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findByPk(id)
    done(null, user);
  } catch(err) { return done(err) }
})

module.exports = passport;
