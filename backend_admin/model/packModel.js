const mongoose = require("mongoose");

const packSchema = mongoose.Schema({
    name : {
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
    }
},{
    timestamps : true
})

module.exports = mongoose.model("Pack",packSchema);