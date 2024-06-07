const iconItemsModel = require("../../../model/iconItemsModel");
const path = require('path');
const fs = require('fs');

const getPaginationIcon = async (req,res) => {
    try{
        console.log("getPaginationIcon", req.body);
        const page = parseInt(req.body.page) || 1;
        const limit = parseInt(req.body.limit) || 10;

        const iconData = await iconItemsModel.find().skip((page-1)*limit).limit(limit);
        console.log("ICONNN DATAA", iconData);
        if(iconData && iconData.length > 0){
            const iconWithImages = iconData.map(item => {
                const imagePath = path.join(__dirname, '../../uploads/icons/', item.iconPathName);
                let imageData = null;
                try {
                    imageData = fs.readFileSync(imagePath, 'utf8');
                } catch (err) {
                  console.error(`Error reading image at ${imagePath}`, err);
                }
                return {
                  ...item.toObject(),
                  imageData: imageData
                };
            })
            res.json({message : "Get Icon Data",data : iconWithImages, status : true});
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getPaginationIcon };