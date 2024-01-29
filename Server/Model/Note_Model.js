const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User_Model' //'User'- this is 'User' model
    }, 
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:'General'
    }
})

const Notes = new mongoose.model('notes',noteSchema);

module.exports = Notes