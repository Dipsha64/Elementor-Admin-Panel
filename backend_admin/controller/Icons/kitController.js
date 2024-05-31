const kitModel = require("../../model/kitModel");

const createKit = async(req,res) => {
    try {
        console.log("KIT DTAAAA", req.body);
        const kitExist = await kitModel.findOne({kitName : req.body.kitName});
        if(kitExist){
            res.json({message: "Kit Name is already exist.",status : false});
        }
        else{
            const kitData = new kitModel({
                kitName : req.body.kitName
            })
            await kitData.save();
            res.json({message: "Kit Created",status : true});
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllKit = async(req,res) =>{
    try {
        const kitData = await kitModel.find();
        res.json({message: "Kit Get Successfully.",status : true, data : kitData});
    } catch (error) {
        console.log(error);
    }
}
module.exports = { createKit, getAllKit };