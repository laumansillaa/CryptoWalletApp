const router = require('express').Router();
const localLogin = require('./localLogin.js');

router.post('/login', localLogin);

module.exports = router;
