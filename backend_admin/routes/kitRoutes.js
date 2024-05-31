const express = require("express");
const router = express.Router();
const { createKit, getAllKit } = require("../controller/Icons/kitController");

router.post("/addKit", createKit);
router.get("/getKit",getAllKit);

module.exports = router;