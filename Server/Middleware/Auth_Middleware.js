const jwt = require('jsonwebtoken');
const User = require('../Model/User_Model')

const Auth_Middleware = async(req,res,next)=>{
    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({msg:"UnAuthorized HTTP, Token not provided"})
    }
    console.log(token)

    const jwtToken = token.replace("Bearer","").trim();
    console.log(jwtToken)

    

    try {

        const isVarified = jwt.verify(jwtToken,process.env.JWT_SECRET)
        console.log(isVarified)

        const userdata = await User.findOne({email:isVarified.email}).
        select({
            password:0,
        })
        console.log("Data is "+userdata)

        
        /* const imgNm = await userdata.images;
        console.log("Images name is-"+imgNm)
        const getMyImages = (imgNm) => {
            const imagePath = path.join(__dirname, '..', 'Public/images', imgNm);
            return imagePath;
          };
        const imageName = imgNm;
        const displayImage = getMyImages(imageName)
        req.photo = displayImage */

        req.user = userdata;
        req.token = token;
        req.userId = userdata._id;

        next();
    } catch (error) {
        return res.status(401).json({msg: "unAuthorized. Invalid token"})
        
    }

    
}

module.exports = Auth_Middleware;