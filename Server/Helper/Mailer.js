const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:"abhaydubey2767@gmail.com",
        pass:"yxeuoiwbzqdxovla"
    }
});

const sendMail = async(email,subject,content)=>{
    try {
        var mailOptions = {
            from:"abhaydubey2767@gmail.com",
            to:email,
            subject: subject,
            html: content
        };
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error)
            }
            console.log("Mail send:- "+info)
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {sendMail}