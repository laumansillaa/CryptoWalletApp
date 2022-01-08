const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, User) {
  passport.use('local', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    },

    async function (email, password, done) {
      console.log('ENTERING LocalStrategy -----------')
      console.log('password', password)
      console.log('email', email)
      console.log('done', done)
      console.log('QUITING LocalStrategy -----------')
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
};
