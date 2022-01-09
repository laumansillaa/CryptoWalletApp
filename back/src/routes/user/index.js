const router = require('express').Router();

router.get("/getData", require('./getData.js'));
router.put("/updateData", require('./updateData.js'));

module.exports = router;
