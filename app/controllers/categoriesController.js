const Category = require("../models/categoryModel")
const categoriesController = {}

categoriesController.create = (req, res)=>{
    const body = req.body
    const category = new Category(body)
    category.user = req.user._id
    category.save()
        .then((category)=>{
            res.json(category)
        })
        .catch((err)=>{
            res.json(err)
        })
}

categoriesController.list = (req, res)=>{
    Category.find({user: req.user._id})
        .then((categories)=>{
             res.json(categories)
        })
        .catch((err)=>{
            res.json(err)
        })
}

categoriesController.update = (req, res)=>{
    const body = req.body
    const id = req.params.id
    Category.findOneAndUpdate({_id: id, user:req.user._id}, body, {new:true, runValidators:true})
        .then((category)=>{
            res.json(category)
        })
        .catch((err)=>{
            res.json(err)
        })
}

categoriesController.show = (req, res)=>{
    const id = req.params.id
    Category.findOne({_id:id, user:req.user._id})
    .then((category)=>{
        res.json(category)
    })
    .catch((err)=>{
        res.json(err)
    })
}

categoriesController.destroy = (req, res)=>{
    const id = req.params.id
    Category.findOneAndDelete({_id:id, user:req.user._id})
        .then((category)=>{
            res.json(category)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports = categoriesController