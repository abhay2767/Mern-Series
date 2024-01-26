const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User_Model' //'User'- this is 'User' model
    }, 
    images:{
        type:String,
        required:true
    }
})

const Images = new mongoose.model("Images",imageSchema)

module.exports = Images