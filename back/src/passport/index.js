const passport = require('passport');
const User = require('../db.js').models.User;
require('./emailStrategy.js')(passport, User);
require('./googleStrategy.js')(passport, User);

passport.serializeUser(function(user, done) {
  console.log('---------- PASSPORT SERIALIZE USER ----------')
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  console.log('---------- PASSPORT DESERIALIZE USER ----------')
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch(err) { return done(err) }
})

module.exports = passport;
