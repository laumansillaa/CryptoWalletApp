const router = require('express').Router();

router.post('/signup', require('./signup'));
router.post('/localSignin', require('./localSignin'));
router.post('/signout', require('./signout'));

module.exports = router;
