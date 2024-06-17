const iconItemsModel = require("../../../model/iconItemsModel");
const path = require('path');
const fs = require('fs');

const getPaginationIcon = async (req,res) => {
    try{
        console.log("getPaginationIcon", req.body);
        const page = parseInt(req.body.page) || 1;
        const limit = parseInt(req.body.limit) || 10;

        let iconData = null;
        const search = req.body.query;
        const regex = new RegExp(search, 'i');
        console.log("search..",search);
        const query = search !== '' ? { tag : { $in: [regex] } } : {};
        // let query = {};
        // if (search) {
        //     query = { tags: { $regex: new RegExp(search, 'i') } };
        // }

        console.log("query...",query);
        iconData = await iconItemsModel.find(query).skip((page-1)*limit).limit(parseInt(limit));
        console.log("API iconData" , iconData.length);
        if(iconData && iconData.length > 0){
            const iconWithImages = iconData.map(item => {
                const imagePath = path.join(__dirname, '../../../uploads/icons/', item.iconPathName);
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