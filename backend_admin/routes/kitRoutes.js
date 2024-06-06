const express = require("express");
const router = express.Router();
const { createKit, getAllKit } = require("../controller/adminControllers/Icons/kitController");

router.post("/addKit", createKit);
router.get("/getKit",getAllKit);

module.exports = router;