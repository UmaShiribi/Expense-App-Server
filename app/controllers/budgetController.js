const Budget = require("../models/budgetModel")
const budgetController = {}

budgetController.create = (req,res)=>{
    const body = req.body
    const budget = new Budget(body)
    budget.save()
        .then((budgetData)=>{
            res.json(budgetData)
        })
        .catch((err)=>{
            res.json(err)
        })
}

budgetController.list=(req, res)=>{
    Budget.find({user:req.user._id})
        .then((budget)=>{
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err)
        })
}

budgetController.update = (req,res)=>{
    Budget.findOneAndUpdate({user:req.user._id},req.body,{new:true, runValidators:true})
        .then((budget)=>{
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err)
        })
}

budgetController.destroy = (req, res)=>{
    Budget.findOneAndDelete({user: req.user._id})
        .then((budget)=>{
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports = budgetController