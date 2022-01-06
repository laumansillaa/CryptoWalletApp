const passport = require('passport');
const {User} = require('./models/User.js').models;
require('./mailStrategy.js');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id)
    done(null, user);
  } catch(err) {
      return done(err);
  }
})
