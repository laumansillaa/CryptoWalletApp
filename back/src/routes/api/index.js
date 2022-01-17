const router = require('express').Router();

router.get("/apiBinance", require('./apiBinance.js'));

module.exports = router;
