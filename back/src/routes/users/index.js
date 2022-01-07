const router = require('express').Router();
const postUser = require("./postUser.js");
const putUser = require("./putUser.js");

router.post("/create", postUser);
router.put("/:id", putUser);

module.exports = router;
