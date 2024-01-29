const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User', //'User'- this is 'User' model
        required:true,
    },
    otp:{
        type: Number,
        required: true
    },
    timestamp:{
        type:Date,
        default:Date.now,
        required:true,
        get: (timestamp) => timestamp.getTime(),
        set: (timestamp) => new Date(timestamp),
    }
});

//define the model or the collection name
const OTP = new mongoose.model('otpMail',otpSchema);

module.exports = OTP;