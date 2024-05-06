const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controller/authController");

router.post("/adminRegister",registerUser);
router.post("/adminLogin",loginUser);

module.exports = router;