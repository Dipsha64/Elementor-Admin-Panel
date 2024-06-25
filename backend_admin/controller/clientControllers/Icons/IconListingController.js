const iconItemsModel = require("../../../model/iconItemsModel");
const path = require('path');
const fs = require('fs');

const getPaginationIcon = async (req,res) => {
    try{
        const page = parseInt(req.body.page) || 1;
        const limit = parseInt(req.body.limit) || 10;

        let iconData = null;
        const search = req.body.query;
        const regex = new RegExp(search, 'i');
        const query = search !== '' ? { tag : { $in: [regex] } } : {};
        // let query = {};
        // if (search) {
        //     query = { tags: { $regex: new RegExp(search, 'i') } };
        // }

        iconData = await iconItemsModel.find(query).skip((page-1)*limit).limit(parseInt(limit));
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

const getFilterIcon = async (req,res) => {
    try {
        const query = req.body.type === "category" ? { 'category._id' : req.body.value._id } : { 'style._id' : req.body.value._id};
        let iconData = null;
        iconData = await iconItemsModel.find(query);
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
        else{
            res.json({message : "No Data found for  fildter", status : false});
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getPaginationIcon, getFilterIcon };