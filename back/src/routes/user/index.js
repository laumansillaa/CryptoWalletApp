const router = require('express').Router();

router.post("/create", require('./create.js'));
router.put("/updateData/:id", require('./updateData.js'));

module.exports = router;
