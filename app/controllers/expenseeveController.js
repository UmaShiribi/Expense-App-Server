const Expenseeve = require("../models/expenseeveModel")
const Budget = require("../models/budgetModel")
const Category = require("../models/categoryModel")
const expenseeveController = {}

expenseeveController.create = (req,res)=>{
    const body = req.body
    const expenseeve = new Expenseeve(body)
    expenseeve.user = req.user._id
    expenseeve.save()
        .then((expense)=>{
            res.json(expense)
        })
        .catch((err)=>{
            res.json(err)
        })
}

expenseeveController.list = (req,res)=>{
    Expenseeve.find({user:req.user._id})
        .then((expenses)=>{
            res.json(expenses)
        })
        .catch((err)=>{
            res.json(err)
        })
}

expenseeveController.update = (req,res) =>{
    const id = req.params.id
    const body = req.body
    Expenseeve.findByIdAndUpdate({_id:id, user: req.user._id}, body, {new:true, runvalidators:true})
        .then((expense)=>{
            res.json(expense)
        })
        .catch((err)=>{
            res.json(err)
        })
}

expenseeveController.show = (req,res) => {
    const id = req.params.id
    Expenseeve.findOne({_id: id, user: req.user._id})
    .then((expense) => {
        res.json(expense)
    })
    .catch((err)=>{
        res.json(err)
    })
}

expenseeveController.destroy = (req,res) => {
    const id = req.params.id
    Expenseeve.findOneAndDelete({_id: id, user:req.user._id})
        .then((expense)=>{
            res.json(expense)
        })
        .catch((err)=>{
            res.json(err)
        })
}

expenseeveController.budgetCalculate = (req, res) => {
    Expenseeve.find({isDeleted:false, user:req.user._id})
        .then((expenses)=>{
            const totalExpense = expenses.reduce((pv,cv)=>{
                return pv+cv.amount
            },0)
            Budget.findOne({user:req.user._id})
            .then((budget)=>{
                const totalBudget = budget.amount
                const totalPercentage = Math.round((totalExpense/totalBudget)*100)
                res.json({totalPercentage, totalExpense, totalBudget})
            })
            .catch((err)=>{
                res.json(err)
            })
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports = expenseeveController