const passport = require('passport');
const User = require('../db.js').models.User;
require('./emailStrategy.js')(passport, User);

passport.serializeUser(function(user, done) {
  console.log('ENTERING passport.serializeUser -----------')
  console.log('user', user)
  console.log('done', done)
  console.log('QUITING passport.serializeUser -----------')
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  console.log('ENTERING passport.deserializeUser -----------')
  console.log('id', id)
  console.log('done', done)
  console.log('QUITING passport.deserializeUser -----------')
  try {
    const user = await User.findByPk(id)
    done(null, user);
  } catch(err) { return done(err) }
})

module.exports = passport;
