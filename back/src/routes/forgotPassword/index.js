const router = require('express').Router();

router.post('/tokenrequest', require('./password.js'))
router.post('/resetpassword', require('./resetpassword'))

module.exports = router;