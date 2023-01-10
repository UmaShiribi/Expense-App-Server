const User = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userController = {}

userController.register = (req, res)=>{
    const body = req.body
    const user = new User(body)
    bcryptjs.genSalt(4)
        .then((salt)=>{
            bcryptjs.hash(user.password, salt)
                .then((encryptedPassword)=>{
                    user.password = encryptedPassword
                    user.save()
                    .then((user)=>{
                        res.json(user)
                    })
                    .catch((err)=>{
                        res.json(err)
                    })
                })
        })
}


userController.login = (req, res) =>{
    const {email, password} = req.body
    User.findOne({email: email})
        .then((user)=>{
            if (user){
                bcryptjs.compare(password, user.password)
                    .then((result)=>{
                        if (result) {
                            const tokenData = {
                                _id: user._id,
                                email: user.email,
                                mobile: user.mobile
                            }
                            const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: "1d"})
                            res.json({token: `Bearer ${token}`})
                        }else{
                            res.json({errors: "Invalid email or password",message:"Invalidate email or password"})
                        }
                    })
            }else{
                res.json({errors: "Invalid email or password",message:"Invalidate email or password"})
            }
        })
}

userController.account = (req,res)=>{
    res.json(req.user)
}

userController.update = (req, res)=>{
    const body = req.body
   User.findByIdAndUpdate({_id: req.user._id}, body, {new: true, runValidators:true})
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports = userController