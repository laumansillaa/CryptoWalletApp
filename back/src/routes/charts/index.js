const router = require('express').Router();

router.get("/:crypto", require("./charts.js"));

module.exports = router;
