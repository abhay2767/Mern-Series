const ContactFromModel = require('../Model/Contact_Model');


const contactform = async (req,res)=>{
    try {
        const {name, email, message} = req.body;

        const data = await ContactFromModel.create({
            name,email,message
        })

        res.status(201).json({
            message: "Data inserted",
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

module.exports = contactform