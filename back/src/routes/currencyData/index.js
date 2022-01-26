const router = require('express').Router();

router.get("/:crypto", require("./currencyData.js"));

module.exports = router;