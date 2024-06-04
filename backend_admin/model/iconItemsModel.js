const mongoose = require("mongoose");

const iconSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    tag : {
        type : Array,
        require : true
    },
    category : {
        type : String,
        require : true
    },
    packId : {
        type : mongoose.Types.ObjectId,
        ref: 'Pack',
        require : true,
    },
    kitDetails : {
        type : Object,
    },
    style : {
        type : String,
    },
    iconPathName : {
        type : String
    },
    createdAt : {
        type : Date,
    },
    updatedAt : {
        type : Date
    },
    status : {
        type : String,
        default : "draft"
    }
},{
    timestamps : true
})

module.exports = mongoose.model("iconItems",iconSchema);