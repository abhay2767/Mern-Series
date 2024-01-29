const Admin_Middleware = async(req,res,next)=>{
    try {
        // console.log(req.user)
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            return res.status(403).json({message: "Access denied, User is not an Admin"})
        }
        //res.status(200).json({message: req.user.isAdmin})
        //If User is an admin, proceed to the next middleware(If the value of 'isAdmin' is true else return an error)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = Admin_Middleware;