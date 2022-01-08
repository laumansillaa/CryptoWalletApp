const router = require('express').Router();

router.put("/updateData", require('./updateData.js'));

module.exports = router;
