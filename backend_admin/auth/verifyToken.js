const jwt = require("jsonwebtoken");

const authenticate = async(req,res,next) =>{
    const authToken = req.headers.authorization;
    if(!authToken || !authToken.startswith("Bearer ")){
        return res.json({message : "No token, authorization denied",status : false});
    }
    try{
        console.log(authToken);
        next();
    }
    catch(error){
        console.log(error);
    }
}

module.exports = { authenticate };