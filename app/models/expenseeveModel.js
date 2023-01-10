const mongoose = require("mongoose")
const Schema = mongoose.Schema

const expenseeveSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    expenseDate:{
        type:Date,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false,
        required:true
    }
}, {timestamps:true})

const Expenseeve = mongoose.model("Expenseeve", expenseeveSchema)

module.exports = Expenseeve