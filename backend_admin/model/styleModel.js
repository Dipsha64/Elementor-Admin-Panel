const mongoose = require("mongoose");

const styleSchema = mongoose.Schema({
    styleName : {
        type : String,
        require : true
    },
    styleValue : {
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

module.exports = mongoose.model("Style",styleSchema);