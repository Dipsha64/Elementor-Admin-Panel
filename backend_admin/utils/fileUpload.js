const multer = require("multer");
const path =  require("path");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads/icons/")
    },
    filename:(req,file,cb)=>{
        console.log("UPLOADDD", file);
        let ext = path.extname(file.originalname);
        cb(null,`${Date.now()}_${file.originalname.split(', ')[0]}${ext}`);
    }
});

// const upload = multer({ storage: storage,}).array('files');

const upload = multer({storage : storage});

module.exports = upload;