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

const searchService = async(req,res)=>{
    try {
        var search =req.body.search;
        var service_data = await Service.find({"service":{$regex: ".*"+search+".*",$options:'i'}});
        // console.log(service_data)
        if(service_data.length >0 ){
            res.status(200).json({
                success:true,
                messages:"Service Details",
                service_data
            })
        }else{
            res.status(400).json({success:false,messages:"Not found anythingh"})
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {services,searchService}