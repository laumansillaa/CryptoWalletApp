const router = require('express').Router();

router.post("/transaction", require('./transactions.js'));

module.exports = router;
