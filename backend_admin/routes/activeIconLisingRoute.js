const express = require("express");
const router = express.Router();
const { getPaginationIcon } = require("../controller/clientControllers/Icons/IconListingController");

router.post("/getAllIcons",getPaginationIcon);

module.exports = router;