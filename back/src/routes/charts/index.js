const router = require('express').Router();

router.get("/charts", require("./charts.js"));

module.exports = router;
