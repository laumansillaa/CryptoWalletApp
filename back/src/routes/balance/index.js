const router = require('express').Router();

router.get("/data", require("./data.js"));

module.exports = router;
