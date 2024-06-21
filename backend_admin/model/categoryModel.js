const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    categoryName : {
        type : String,
        require : true
    },
    categoryValue : {
        type : String,
    },
    createdAt : {
        type : Date,
    },
    updatedAt : {
        type : Date
    }
},{
    timestamps : true
})

module.exports = mongoose.model("Category",categorySchema);