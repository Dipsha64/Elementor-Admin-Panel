const draftIconModel = require("../../model/draftIconModel");

const saveDraftIcons = async(req,res) =>{
    try {
        const files = req.files;
        console.log("files...Controller",files);
        if (Array.isArray(files) && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                let names = files[i].originalname.split(', ');
                console.log("NAMEE",names[0]);
                const iconDetails = {
                    name : names[0],
                    tag : names,
                    category : '',
                    packName : '',
                    bundleName : '',
                    style : '',
                    createdAt : new Date(),
                    updatedAt : new Date(),
                    path : files[i].path
                }
                // const newUser = await doctorModel.create({
                //     iconDetails
                // })
            }
            res.json(files);
        } else {
          throw new Error("File upload unsuccessful");
        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { saveDraftIcons };