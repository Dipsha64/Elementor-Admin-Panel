const express = require("express");
const router = express.Router();
const { getPaginationIcon, getFilterIcon } = require("../controller/clientControllers/Icons/IconListingController");

router.post("/getAllIcons",getPaginationIcon);
router.post("/getFilterIcon",getFilterIcon);

module.exports = router;