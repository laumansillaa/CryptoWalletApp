const router = require('express').Router();

router.post("/ethereum/purchase", require("./ethereumPurchase.js"));
router.post("/stellar/purchase", require("./stellarPurchase.js"));

module.exports = router;
