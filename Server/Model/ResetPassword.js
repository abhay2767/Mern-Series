const mongoose = require('mongoose')

const resetePasswordSchema = new mongoose.Schema({
    user_id:{
        type: String,
        ref:'User' //'User'- this is 'User' model
    },
    token:{
        type: String,
    },
})

//define the model or the collection name
const resetepass = new mongoose.model('ResetPassword',resetePasswordSchema);

module.exports = resetepass;