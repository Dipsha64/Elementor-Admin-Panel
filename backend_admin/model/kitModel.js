const mongoose = require("mongoose");

const kitSchema = mongoose.Schema({
    kitName : {
        type : String,
        require : true
    },
    kitImage : {
        type : String,
    },
    kitItemCount : {
        type : Number,
        default : 0
    }
},{
    timestamps : true
})

module.exports = mongoose.model("Kit",kitSchema);