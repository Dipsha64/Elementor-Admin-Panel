const express = require("express");
const router = express.Router();
const { saveDraftIcons } = require("../controller/Icons/draftIconController");

router.post("/addDraftIcon",saveDraftIcons);

module.exports = router;