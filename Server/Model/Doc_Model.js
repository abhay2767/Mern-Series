const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User_Model' //'User'- this is 'User' model
    }, 
    doc:{
        type:String,
        required:true
    }
})

const Documents = new mongoose.model("Documents",documentSchema)

module.exports = Documents