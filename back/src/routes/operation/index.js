const router = require('express').Router();

router.get("/record", require("./record.js"));
router.post("/ethereum/purchase", require("./ethereumPurchase.js"));
router.post("/stellar/purchase", require("./stellarPurchase.js"));
router.post("/stellar/sell", require("./stellarSell.js"));
router.post("/stellar/transfer", require("./stellarTransfer.js"));

module.exports = router;
