const mongoose = require("mongoose");

const packSchema = mongoose.Schema({
    packName : {
        type : String,
        require : true
    },
    slug : {
        type : String,
        require : true
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
    },
    packImage : {
        type : String,
    },
    packImagePath : {
        type : String,
    },
    packItemCount : {
        type : Number,
    },
    category : {
        type : Object
    },
    style : {
        type : Object
    },
    description : {
        type : String
    },
    kitDetails : {
        type : Object
    }
},{
    timestamps : true
})

module.exports = mongoose.model("Pack",packSchema);