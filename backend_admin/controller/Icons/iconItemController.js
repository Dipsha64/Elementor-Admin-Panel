const iconItemsModel = require("../../model/iconItemsModel");
const packModel = require("../../model/packModel");
const path = require('path');
const fs = require('fs');

const saveDraftIcons = async(req,res) =>{
    try {
        const files = req.files;
        console.log("files..",files);

        if (Array.isArray(files) && files.length > 0) {
            const newPackData = new packModel({
                packName : 'no name',
                slug : "no_name",
                createdAt : new Date(),
                updatedAt : new Date(), 
                status : "draft",
                packItemCount : files.length,
                packImagePath : files.length > 0 ? files[0].path : null,
                packImage : files.length > 0 ? files[0].filename : null,
            });
            await newPackData.save();

            let count = 0;
            uploadItemsFunction = async () =>{
                if(count >= files.length){
                    res.json({message : "Icon Item Uploaded Successfully",data : newPackData,status : true});
                }
                else{
                    let names = files[count].originalname.split(/[,,.]/).map(item => item.trim().toLowerCase().replace(/\s/g,'-'));
                    names.splice(-1, 1);
                    const iconDetails = new iconItemsModel({
                        name : names[0],
                        tag : names,
                        packId : newPackData._id,
                        createdAt : new Date(),
                        updatedAt : new Date(),
                        path : files[count].path,
                        iconPathName : files[count].filename,
                        status : "draft"
                    })
                    await iconDetails.save(); 
                    console.log("Item Created successfully...");
                    count++;
                    uploadItemsFunction(files);
                }
            }
            uploadItemsFunction(files);       
        }
    }
    catch (error) {
        console.log(error);
    }
}

const saveActiveIcons = async (req,res) => {
    try {
        console.log(req.body);
        const { formData, packId, status, iconData } = req.body;
        const updatePackObj = {
            packName : formData.packName,
            slug : formData.packName.trim().toLowerCase().replace(/\s/g,'-'),
            updatedAt : new Date(), 
            status : status,
            category : formData.category,
            style : formData.style,
            description : formData.description,
            kitDetails : formData.kitValue
        };
        console.log("updatePackObj..",updatePackObj);
        const newData = await packModel.findByIdAndUpdate(packId,updatePackObj);
        if(iconData && iconData.length > 0){
            let count = 0;
            updateItemsFunction = async () =>{
                if(count >= iconData.length){
                    res.json({message : "Icon Item Uploaded Successfully",data : newData,status : true});
                }
                else{
                    let tagArr = iconData[count].tag.map(item => item.trim().toLowerCase().replace(/\s/g,'-'));
                    const iconDetails = {
                        name: tagArr[0],
                        tag : tagArr,
                        updatedAt : new Date(),
                        status : status,
                        category : formData.category,
                        style : formData.style,
                        kitDetails : formData.kitValue
                    }
                    await iconItemsModel.findByIdAndUpdate(iconData._id,iconDetails);
                    console.log("Item Created successfully...");
                    count++;
                    updateItemsFunction(iconData);
                }
            }
            updateItemsFunction(iconData); 
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllIconItem = async (req,res) =>{
    try {
        
    } catch (error) {
        console.log(error);
    }
}

const getParticularPackIconItem = async (req,res) => {
    try {
        console.log("getPackIcons..", req.body);
        const id = req.body.packId;
        const iconData = await iconItemsModel.find({ packId : id});
        console.log("iconData...",iconData);
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
            });
          
            res.send({message : "Pack Icon Get Successfully", status : true, data : iconWithImages});
        }
        else{
            res.send({message : "SOmething went wrong! Please Try again!", status : false});
        }
    } catch (error) {
       console.log(error); 
    }
}
module.exports = { saveDraftIcons, getAllIconItem, getParticularPackIconItem,saveActiveIcons };