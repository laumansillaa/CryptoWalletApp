const router = require('express').Router();
const passport = require('../../passport');

router.post('/signup', require('./signup.js'));
router.post('/localSignin', require('./localSignin.js'));
router.get('/googleSignin', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/googleSignin/callback', require('./googleSignin.js'))
router.post('/signout', require('./signout.js'));
router.post('/verifyUser', require('./verifyUser'))

module.exports = router;
