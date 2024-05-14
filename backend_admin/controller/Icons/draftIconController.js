const draftIconModel = require("../../model/draftIconModel");

const saveDraftIcons = async(req,res) =>{
    try {
        console.log("req.body",req.body);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { saveDraftIcons };