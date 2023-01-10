const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const port = 4200

const configureDB = require("./config/database")
configureDB()
const routes = require("./config/routes")
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(port, ()=>{
    console.log('server running on port', port)
})