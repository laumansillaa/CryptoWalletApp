const router = require('express').Router();

router.get("/:crypto", require("./currencyData.js"));
router.get("/", require("./currenciesData.js"))

module.exports = router;