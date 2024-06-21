const categoryModel = require("../../model/categoryModel");
const styleModel = require("../../model/styleModel");

// Manage Category
const getCategory = async(req,res) => {
    try {
        const getAllData = await categoryModel.find();
        console.log("DATAA",getAllData);
    } catch (error) {
        console.log(error);
    }
}

const createCategory = async(req,res) => {
    try {
        console.log("REQQQQ", req.body , req.body.categoryVal.trim().toLowerCase().replace(/\s/g,'-'));
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
    }
}
const updateCategory = async(req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}
const deleteCategory = async(req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

// Manage Style
const getStyle = async(req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

const createStyle = async(req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}
const updateStyle = async(req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}
const deleteStyle = async(req,res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getCategory,createCategory, updateCategory,deleteCategory, getStyle,createStyle, updateStyle,deleteStyle };