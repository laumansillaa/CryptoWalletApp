const router = require('express').Router();

router.get("/stellar", require("./currenciesStellarData.js"));
router.get("/eth", require("./currenciesEthData.js"));

module.exports = router;