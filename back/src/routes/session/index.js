const router = require('express').Router();

router.post('/signin', require('./signin'));
router.post('/localLogin', require('./localLogin'));

module.exports = router;
