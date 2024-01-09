const error_Middleware = (err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Backend Error";
    const extra_Error = err.extra_Error || "Error from Backend";

    return res.status(status).json({message, extra_Error})
}

module.exports = error_Middleware;