const Service = require("../Model/Service_Model")

const services = async(req,res)=>{
    try {
        const response = await Service.find();
        if(!response){
            res.status(401).json({msg: "No Service Found"})
        }
        res.status(200).json({response})
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = services