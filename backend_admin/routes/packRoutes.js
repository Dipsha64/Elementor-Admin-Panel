const express = require("express");
const router = express.Router();
const { getAllDraftPack } = require("../controller/Icons/packController");

router.get("/getDraftPack",getAllDraftPack);

module.exports = router;