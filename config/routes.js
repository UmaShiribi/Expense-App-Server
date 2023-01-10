const express = require("express")
const routes = express.Router()

const multer = require("multer")
const upload= multer({dest:'uploads/'})

const userController = require("../app/controllers/usersController")
const budgetController = require("../app/controllers/budgetController")
const categoriesController = require("../app/controllers/categoriesController")
const expenseeveController = require("../app/controllers/expenseeveController")
const {authentication, authorization} = require("../app/middlewares/authentication")

routes.post("/api/user/register",userController.register)
routes.post("/api/user/login",userController.login)
routes.get("/api/user/account",authentication,userController.account)
routes.put("/api/user/account",authentication, upload.single("image"), userController.update)


routes.post("/api/user/budget",budgetController.create)
routes.get("/api/user/budget",authentication,budgetController.list)
routes.put("/api/user/budget",authentication,budgetController.update)
//routes.delete("/api/user/budget",authentication,authorization,budgetController.destroy)

routes.post("/api/user/category",authentication,categoriesController.create)
routes.get("/api/user/category",authentication,categoriesController.list)
routes.get("/api/user/category/:id",authentication,categoriesController.show)
routes.put("/api/user/category/:id",authentication,categoriesController.update)
routes.delete("/api/user/category/:id",authentication,authorization,categoriesController.destroy)

routes.post("/api/user/expenses",authentication,expenseeveController.create)
routes.get("/api/user/expenses",authentication,expenseeveController.list)
routes.get("/api/user/expense/:id",authentication,expenseeveController.show)
routes.put("/api/user/expense/:id",authentication,expenseeveController.update)
routes.delete("/api/user/expense/:id",authentication,authorization,expenseeveController.destroy)
routes.get("/api/user/expensesChart",authentication,expenseeveController.budgetCalculate)

module.exports = routes
