const express =  require("express");
const router = express.Router();
const { getCategory,createCategory, updateCategory,deleteCategory, getStyle,createStyle, updateStyle,deleteStyle  } = require("../controller/adminControllers/settingController");

router.get("/getCategory",getCategory);
router.post("/addCategory", createCategory);
router.put("/updateCategory",updateCategory);
router.post("/deleteCategory",deleteCategory);

router.get("/getStyle",getStyle);
router.post("/addStyle", createStyle);
router.put("/updateStyle", updateStyle);
router.post("/deleteStyle",deleteStyle);

module.exports = router;