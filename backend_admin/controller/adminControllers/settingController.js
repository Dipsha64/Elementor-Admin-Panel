const categoryModel = require("../../model/categoryModel");
const styleModel = require("../../model/styleModel");

// Manage Category
const getCategory = async(req,res) => {
    try {
        const getAllData = await categoryModel.find();
        if(getAllData){
            res.json({message : "Category created successfully",status : true, data : getAllData});
        }
        else{
            res.json({message : "Something went wrong, Please try again later.",status : false});
        }
    } catch (error) {
        console.log(error);
        res.json({message : "Something went wrong, Please try again later.",status : false});
    }
}

const createCategory = async(req,res) => {
    try {
        const valueExist = await categoryModel.findOne({categoryValue : req.body.categoryVal.trim().toLowerCase().replace(/\s/g,'-')});
        if(valueExist){
            res.json({message : "This Category alredy exists",status : false});
        }
        else{
            const newData = await categoryModel.create({
                categoryName : req.body.categoryVal, categoryValue : req.body.categoryVal.trim().toLowerCase().replace(/\s/g,'-')
            })
            res.json({message : "Category created successfully",status : true, data : newData});
        }
    } catch (error) {
        console.log(error);
        res.json({message : "Something went wrong, Please try again later.",status : false});
    }
}
const updateCategory = async(req,res) => {
    try {
        const newObj = {...req.body.categoryObj, categoryName : req.body.newValue,categoryValue: req.body.newValue.trim().toLowerCase().replace(/\s/g,'-'), updatedAt : new Date()};
        const itemId = req.body.categoryObj._id;
        const updatedItem = await categoryModel.findByIdAndUpdate(
            itemId,
            newObj,
            { new: true }  // This option returns the updated document
        );
        if(updatedItem){
            res.json({message : "Category Updated successfully",status : true, data : newObj});
        }
    } catch (error) {
        console.log(error);
    }
}
const deleteCategory = async(req,res) => {
    try {
        const id = req.body.categoryVal._id;
        const categoryData = await categoryModel.findOneAndDelete({ _id:id});
        res.json({message : "Category deleted successfully",status : true, data : categoryData});
    } catch (error) {
        console.log(error);
    }
}

// Manage Style
const getStyle = async(req,res) => {
    try {
        const getAllData = await styleModel.find();
        if(getAllData){
            res.json({message : "Style Get successfully",status : true, data : getAllData});
        }
        else{
            res.json({message : "Something went wrong, Please try again later.",status : false});
        }
    } catch (error) {
        console.log(error);
        res.json({message : "Something went wrong, Please try again later.",status : false});
    }
}

const createStyle = async(req,res) => {
    try {
        const valueExist = await styleModel.findOne({styleValue : req.body.styleVal.trim().toLowerCase().replace(/\s/g,'-')});
        if(valueExist){
            res.json({message : "This Category alredy exists",status : false});
        }
        else{
            const newData = await styleModel.create({
                styleName : req.body.styleVal, styleValue : req.body.styleVal.trim().toLowerCase().replace(/\s/g,'-')
            })
            res.json({message : "Category created successfully",status : true, data : newData});
        }
    } catch (error) {
        console.log(error);
        res.json({message : "Something went wrong, Please try again later.",status : false});
    }
}
const updateStyle = async(req,res) => {
    try {
        const newObj = {...req.body.styleObj, styleName : req.body.newValue,styleValue: req.body.newValue.trim().toLowerCase().replace(/\s/g,'-'), updatedAt : new Date()};
        const itemId = req.body.styleObj._id;
        const updatedItem = await styleModel.findByIdAndUpdate(
            itemId,
            newObj,
            { new: true }  // This option returns the updated document
        );
        if(updatedItem){
            res.json({message : "Style Updated successfully",status : true, data : newObj});
        }
    } catch (error) {
        console.log(error);
    }
}
const deleteStyle = async(req,res) => {
    try {
        const id = req.body.styleVal._id;
        const styleData = await styleModel.findOneAndDelete({ _id:id});
        res.json({message : "Style deleted successfully",status : true, data : styleData});
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getCategory,createCategory, updateCategory,deleteCategory, getStyle,createStyle, updateStyle,deleteStyle };