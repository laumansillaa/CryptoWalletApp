const router = require('express').Router();

router.post('/localLogin', require('./localLogin'));

module.exports = router;
