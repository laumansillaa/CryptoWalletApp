const router = require('express').Router();

router.get("/data", require("./data.js"));
router.post("/ethereum/purchase", require("./ethereumPurchase.js"));
router.post("/stellar/purchase", require("./stellarPurchase.js"));

module.exports = router;
