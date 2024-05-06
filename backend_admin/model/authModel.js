const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const authSchema = moongoose.Schema({
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    userName : {
        type : String,
        require : true
    }
},{
    timestamps : true
});

module.exports = mongoose.model("User",authSchema);