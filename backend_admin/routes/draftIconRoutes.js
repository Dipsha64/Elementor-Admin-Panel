const express = require("express");
const router = express.Router();
const { saveDraftIcons, getParticularPackIconItem, saveActiveIcons } = require("../controller/Icons/iconItemController");
const upload = require("../utils/fileUpload");

// const multer = require("multer");
// const path =  require("path");

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"./uploads/icons/")
//     },
//     filename:(req,file,cb)=>{
//         console.log("UPLOADDD", file);
//         let ext = path.extname(file.originalname);
//         cb(null,`${Date.now()}_${file.originalname}`)
//     }
// });

// const upload = multer({storage});

// router.post("/addDraftIcon",upload.array('iconFile'),(req,res)=>{
//         const file = req.iconFile;
//         console.log("req...Upload",file);
//         if (!file) {
//             return res.status(500).send({ success: false, message: "Please upload a file" });
//         } 
//         res.send({ success: true, fileInfo: file.path });
// });

// router.post("/addDraftIcon", upload.array("files"), (req, res) => {
//     const files = req.files;
//     console.log("files...",files);
//     if (Array.isArray(files) && files.length > 0) {
//       res.json(files);
//     } else {
//       throw new Error("File upload unsuccessful");
//     }
//   });

// router.post('/addDraftIcon', (req, res) => {
//     upload(req, res, (err) => {
//         console.log("GPT UPLOADDD",req.files);
//     });
// });

router.post("/addDraftIcon",upload.array('files'),saveDraftIcons);
router.post("/getPackIcons",getParticularPackIconItem);
router.post("/addActiveIcons",saveActiveIcons);

module.exports = router;