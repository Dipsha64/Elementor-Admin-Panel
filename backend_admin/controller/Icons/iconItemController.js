const iconItemsModel = require("../../model/iconItemsModel");
const packModel = require("../../model/packModel");
const path = require('path');
const fs = require('fs');

const saveDraftIcons = async(req,res) =>{
    try {
        const files = req.files;
        console.log("files..",files);
        // if (Array.isArray(files) && files.length > 0) {
        //     const packData = await packModel.create({
        //         name : 'no name',
        //         slug : "no_name",
        //         createdAt : new Date(),
        //         updatedAt : new Date(), 
        //         status : "draft"
        //     }).then((result)=>{
        //         console.log("Pack Create Successfully",result);
        //         let count = 0;
        //         uploadItemsFunction = async () =>{
        //             if(count >= files.length){
        //                 res.json({message : "Icon Item Uploaded Successfully",status : true});
        //             }
        //             else{
        //                 let names = files[count].originalname.split(', ');
        //                 console.log("result._id...",result._id);
        //                 const iconDetails = {
        //                     name : names[0],
        //                     tag : names,
        //                     category : '',
        //                     packId : "111",
        //                     bundleName : '',
        //                     style : '',
        //                     createdAt : new Date(),
        //                     updatedAt : new Date(),
        //                     path : files[count].path,
        //                     status : "draft"
        //                 }
        //                 const newPack = await iconItemsModel.create({
        //                     iconDetails
        //                 }).then(()=>{
        //                     console.log("Item Created successfully...");
        //                     count++;
        //                     uploadItemsFunction(files);
        //                 }).catch((error)=>{
        //                     console.log(error);
        //                 });
        //             }
        //         }
        //         uploadItemsFunction(files);
        //     }).catch((error)=>{
        //         console.log(error);
        //     })
        // } else {
        //   throw new Error("File upload unsuccessful");
        // }

        if (Array.isArray(files) && files.length > 0) {
            const newPackData = new packModel({
                name : 'no name',
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
                        category : '',
                        packId : newPackData._id,
                        bundleName : '',
                        style : '',
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
module.exports = { saveDraftIcons, getAllIconItem, getParticularPackIconItem };