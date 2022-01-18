const router = require('express').Router();

router.get("/record", require("./record.js"));
router.post("/ethereum/purchase", require("./ethereumPurchase.js"));
router.post("/stellar/purchase", require("./stellarPurchase.js"));

module.exports = router;
