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
    packName : {
        type : String,
        require : true,
        default : "no name"
    },
    bundleName : {
        type : String,
        require : true
    },
    style : {
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

module.exports = mongoose.model("draftIcons",iconSchema);