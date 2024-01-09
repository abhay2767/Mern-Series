const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type:String
    },
    message:{
        type:String
    }
})

const Contact = new mongoose.model('Contact_Data', contactSchema)

module.exports = Contact