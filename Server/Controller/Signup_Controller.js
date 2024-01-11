const User = require('../Model/Signup_Model')

const ragister_user = async(req,res)=>{
    try {
        

        const user = new User({
            name:req.body.name,
            email:req.body.email,
            image:req.file.filename
        })
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const userdata = await User.findOne({email:req.body.email});
        if(userdata){
            return res.status(400).json({message: "Email already ragisterd"})
        }else{
            const user_data = await user.save();
            return res.status(200).json(user_data)
        }

    } catch (error) {
        console.log(error)
        return res.status(100).json({error:"Not get the api"})
    }
}

module.exports = ragister_user