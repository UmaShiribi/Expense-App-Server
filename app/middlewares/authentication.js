const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const authentication = (req, res,next)=>{
    const token = req.header("Authorization").split(" ")[1]
    try{
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        User.findById(tokenData._id)
            .then((user)=>{
                req.user = user
                next()
            })
            .catch((err)=>{
                res.json({errors:"Invalid Token", message:"Invalid Token"})
            })
    }catch(err){
        res.json({errors:"Invalid Token", message:"Invalid Token"})
    }
}

const authorization = (req, res, next)=>{
    if(req.user.role==="admin"){
        next()
    }else{
        res.json({
            notice:"You are not allowed to access this route"
        })
    }
}

module.exports={
    authentication, authorization
}