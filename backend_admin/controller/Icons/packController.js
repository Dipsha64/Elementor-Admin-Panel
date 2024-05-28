const packModel = require("../../model/packModel");
const path = require('path');
const fs = require('fs');

const getAllDraftPack = async (req,res) =>{
    try {
        const draftPackData = await packModel.find({"status" : "draft"});
        const filePath = path.join(__dirname, '../../uploads/icons/',"1716296082108_Gratitude.svg");
        // console.log("filePath...",filePath);

        console.log("draftPackData..LENGTH",draftPackData.length);
        // if(draftPackData && draftPackData.length > 0){
        //     let count = 0;
            
        // }

        const packWithImages = draftPackData.map(item => {
            const imagePath = path.join(__dirname, '../../uploads/icons/', item.packImage);
            let imageData = null;
            try {
                // imageData = fs.readFileSync(imagePath, { encoding: 'base64' });
                imageData = fs.readFileSync(imagePath, 'utf8');
                // const svgContent = fs.readFileSync(svgPath, 'utf8');
                // res.setHeader('Content-Type', 'image/svg+xml');
                // console.log("imageData..",imageData);
                // res.send(imageData);
            } catch (err) {
              console.error(`Error reading image at ${imagePath}`, err);
            }
            return {
              ...item.toObject(),
              imageData: imageData
            };
        });
      
        //   res.json(usersWithImages);

        // const result = draftPackData.map((item) => {
        //     // item["fileUrl"] = `http://localhost:${process.env.PORT}/uploads/icons/1716296082108_Gratitude.svg`;
        //     item["isActive"] = true
        //     return item;
        // });
        // console.log("draftPackData...",draftPackData ,typeof draftPackData);

        // res.sendFile(filePath, err => {
        //     if (err) {
        //         res.status(404).send('Image not found');
        //     }
        // });
        res.json({message: "Get All Draft Packs.",data : packWithImages,status : true});
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllDraftPack };