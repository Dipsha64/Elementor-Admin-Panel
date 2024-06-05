const express = require("express");
const router = express.Router();
const { getAllDraftPack, getParticularPack } = require("../controller/Icons/packController");

router.get("/getDraftPack",getAllDraftPack);
router.post("/packSingleData",getParticularPack);

module.exports = router;