const authModel = require("../../model/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (obj) =>{
    return jwt.sign({id : obj.id},process.env.JWT_SECRET_KEY,{expiresIn : '15d'});
}

const registerUser = async(req,res) =>{
    try {
        console.log("req.body",req.body);
        const { email, password, userName } = req.body;
        const userExist = await authModel.findOne({email : req.body.email});
        if(userExist){
            res.json({message : "Admin alredy exists",status : false});
        }
        else{
            const hashPassword = await bcrypt.hash(req.body.password,10);
            const newUser = await authModel.create({
                email, password : hashPassword, userName
            })
            res.json({message : "Admin created successfully",status : true});
        }
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req,res) =>{
    try{
        console.log("BODYY", req.body);
        const { email, password, userName } = req.body;
        let userExist = await authModel.findOne({email : req.body.email});
        if(!userExist){
            res.json({message : "User not found, Please try again.",status : false});
        }
        else{
            bcrypt.compare(req.body.password, userExist.password,(err,data)=>{
                if(data){
                    const userObj = { id : userExist._id, email : userExist.email, userName : userExist.userName };
                    let token = generateToken(userObj);
                    res.json({message : "Admin Login successfully",status : true,data : userObj,token : token});
                }
                else{
                    res.json({message : "Incorrect email & password, try again",status : false});
                }
            })
        }
    }
    catch(error){
        console.log(error);
    }
}


module.exports = { registerUser,loginUser };