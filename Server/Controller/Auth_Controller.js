const UserFromModel = require('../Model/User_Model')
const bcrypt = require('bcrypt');

const mailer = require('../Helper/Mailer');
const User = require('../Model/User_Model');

const randamstring = require('randomstring');
const resetepassFromModel = require('../Model/ResetPassword')

const OTP = require('../Model/Otp')
const {oneMinute,fiveMinute} = require('../Helper/Otp_Velidate')

/* Controller:-
    In an express.js application , a 'controller' reders to a part of your code that is responsible for handling
    the application's logic.
    Controller are typically used to process incomming requests, interact with models(data source), and
    send response back to the clients.
    They help organize your application by seprating concern and following the MVA(Model-View-Controller) design pattern.
*/
/* Process and Rules for Creating the new User:
    1- Get the Ragistration data: Retrieve user data (name, email, password).
    2- Check email existance: check if the user is already ragistered with that email id.
    3- Hash password: Securely hash the password.
    4- Create User: Create a new user with hashed password.
    5- Save to DB: Save user data to the database.
    6- Respond: Respond with "Ragistration Successful" or handle errors.
 */

const home = async (req, res) => {
    try {
        res.status(200).send("This is homepage")
    } catch (error) {
        console.log(error)
    }
}

//Signup Logic
const ragister = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, mobile, password, isAdmin,is_verified} = req.body;
        const userExist = await UserFromModel.findOne({ email: email })

        if (userExist) {
            res.status(400).json({ message: "User Already ragisterd" })
        }

        //first way to hash the password
        // const saltRounds = 10;
        // const saltRounds = await bcrypt.genSalt(10);
        // const hash_pass = await bcrypt.hash(password, saltRounds)

        // const userCreated = await UserFromModel.create({
        // name,email,mobile,/* password:hash_pass */ password
        // })

        const users = new User({
            name: name,
            email: email,
            mobile: mobile,
            password: password,
            isAdmin: isAdmin,
            is_verified: is_verified,
            images: req.file.filename

        });
        const userData = await users.save();
        const userId = userData._id;

        // const msg = '<h1> Hello, ' + name + ', Please <a href="http:localhost:5000/api/auth/mail-verification/?id=' + userData._id + '">Varify</a> Your mail </h1>';
        const msg = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                padding: 20px;
                border: 2px solid black;
                display:flex;
                justify-content:center;
              }
              h1 {
                color: #333;
              }
              p {
                color: #666;
                font-size: 16px;
                line-height: 1.5;
              }
              b {
                color: #007bff;
              }
            </style>
          </head>
          <body>
            <p>Hello and Welcome Mr/Ms, <b>${name}</b>,</p>
            <p>You have successfully created an account on our website.</p>
            <h1>Your Credentials:</h1>
            <ul>
              <li><b>UserId:</b> ${email}</li>
              <li><b>Password:</b> ${password}</li>
            </ul>
          </body>
        </html>
      `;
      
      // Now 'msg' contains the styled HTML email message.
              mailer.sendMail(email, 'Wellcome Mail', msg);

        res.status(201).json({
            message: "User created",
            userData,
            token: await userData.generateToken(),
            userId: userData._id.toString()
        })
        /* In most cases, converting _id to a string is a good prictice because it ensures consistency and
            compatibility across different JWT libraries and systems. It also aligns with the expectation that 
            claims in a JWT are represented as strings.
         */

    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}


//Sign in Logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await UserFromModel.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ message: "User not found" })
        }
        //first way to Compare the password
        // const isMatch = await bcrypt.compare(password,userExist.password)
        //second way to compare password
        const isMatch = await userExist.compare_Pass(password);


        if (isMatch) {
            res.status(200).json({
                message: "User Found",
                token: await userExist.generateToken(),
                userId: userExist._id.toString()
            })
        }
        else {
            res.status(401).json({ error: "User Not Found" })
        }
    } catch (error) {
        res.status(401).json({ error: "wrong Credential" })
    }
}

//User data (send user data who is logged in)
const user = async (req, res) => {
    try {
        const userData = req.user;
        // const photoData = req.photo
        return res.status(200).json({ userData })/* .senFile(photoData) */;
    } catch (error) {
        console.log(error)

    }
}

//Send Mail while user Signup
const mailVerification = async (req, res) => {
    try {

        if (req.query.id == undefined) {
            res.render('404');
        }
        const userdata = await User.findOne({ _id: req.query.id });
        if (userdata) {
            if (userdata.is_verified == 1) {
                return res.send('User Verified Already')
            }
            await User.findByIdAndUpdate({ _id: req.query.id }, {
                $set: {
                    is_verified: 1
                }
            })
            return res.render('mail-verified')

        } else {
            return res.render('404').send({ message: "User not found" });
        }

    } catch (error) {
        console.log(error)
        return res.render('404');

    }
}

//Send Mail for email verification
const SendMailVerification = async (req, res) => {
    try {
        const { email } = req.body;
        const userExist = await UserFromModel.findOne({ email: email })
        if (!userExist) {
            return res.status(404).json({ message: "Email Not Exist" })
        }
        if (userExist.is_verified == 1) {
            return res.status(409).json({ message: "Email Already Verified" })
        }

        const msg = '<h1> Hello, Please <a href="http:localhost:5000/api/auth/mail-verification/?id=' + userExist._id + '">Varify</a> Your mail </h1>';
        mailer.sendMail(userExist.email, 'Mail varification', msg);

        res.status(201).json({
            success: true,
            message: "Email sends to your mail, Please check and right click on 'verify' and then open in new tab."
        })


    } catch (error) {
        console.log(error)
    }
}


const passwordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const userExist = await UserFromModel.findOne({ email: email })
        if (!userExist) {
            return res.status(404).json({ message: "Email Not Exist" })
        }
        console.log("data is" + email)

        const randomStr = randamstring.generate();
        console.log("Str is:-" + randomStr)
        
        const msg = '<header style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh;"><div style="background-color: #ffffff; padding: 20px; border: 1px solid #ccc; border-radius: 8px; text-align: center;"><h3>Hello and Wellcome Mr/Ms, <b style="color: #007bff;">'+userExist.name+'</b></h3><h2>Action Required: Reset-Password request</h2><p>You are receiving this email because a request was made for reseting your password so this can be used for authentication.</p><p>Please click on the button given below for Reset the Password:</p><a href = "http://localhost:5000/api/auth/forget-passwordform/?token=' + randomStr + '"><button style="font-size: 24px; font-weight: bold; background-color: #D22B2B; border: 2px solid black; border-radius: 10px; cursor: pointer; margin-top: 15px; color: #000000;">Reset Password</button></a><p>If you did not request this change, please change your password or use the email: <b>abhaydubey2767@gmail.com</b> to contact us.</p></div></header>'
        await resetepassFromModel.deleteMany({ user_id: userExist._id })
        const passReset = new resetepassFromModel({
            user_id: userExist._id,
            token: randomStr
        });
        await passReset.save();
        //Resete Password is a subject which shown in email
        mailer.sendMail(userExist.email, 'Resete Password', msg);
        return res.status(201).json({ success: true, message: "Reset Password Link send to your mail, Please check" })

    } catch (error) {
        console.log(error)

    }
}

const forgetPassword = async (req, res) => {
    try {
        if (req.query.token == undefined) {
            return res.send('404')
        }
        const resetdata = await resetepassFromModel.findOne({ token: req.query.token });
        if (resetdata) {
            // return res.send("Reset Password page")
            return res.render('Password_Reset', { resetdata })
        } else {
            res.render('404')
        }

    } catch (error) {
        console.log(error)
    }
}

const updatePassword = async (req, res) => {
    try {
        const { user_id, password, cpassword } = req.body;
        const resetdata = await resetepassFromModel.findOne({ user_id })
        if (password != cpassword) {
            return res.render('Password_Reset', { resetdata, error: "Confirm password not mathching" })
        }
        const hashPassword = await bcrypt.hash(cpassword, 10);
        await User.findByIdAndUpdate({ _id: user_id }, {
            $set: {
                password: hashPassword
            }
        })
        await resetepassFromModel.deleteMany({ user_id })
        return res.render('reset-succuss')


    } catch (error) {
        console.log(error)
    }
}


const OtpSend=async(req,res)=>{
    try {
        const { email } = req.body;
        const userExist = await UserFromModel.findOne({ email: email })
        if (!userExist) {
            return res.status(404).json({ message: "Email Not Exist" })
        }
        if (userExist.is_verified == 1) {
            return res.status(409).json({ message: "Email Already Verified" })
        }
        const r = Math.random()
        const genOtp = Math.round(r*900000+100000) //6 dight under 1000000
        console.log("Your code is:-"+genOtp)

        const oldLOtp = await OTP.findOne({user_id:userExist._id});
        if(oldLOtp){
            const sendOtpNext = await oneMinute(oldLOtp.timestamp);
            if(!sendOtpNext){
                return res.status(400).json({success:false, message:"Re-send Otp after 1 min"})
            }
        }

        const cDate = new Date();
        await OTP.findOneAndUpdate(
            {user_id:userExist._id},
            {otp: genOtp, timestamp: new Date(cDate.getTime())},
            {upsert:true,new:true,setDefaultsOnInsert:true} //upsert:true means when we want latest data then we use this and 
            //new:true so this will use when we crete new data and setDefaultsOnInsert:true

        )

        
        const msg = '<header style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh;"><div style="background-color: #ffffff; padding: 20px; border: 1px solid #ccc; border-radius: 8px; text-align: center;"><h3>Hello and Wellcome Mr/Ms, <b style="color: #007bff;">'+userExist.name+'</b></h3><h2>Action Required: One-Time Verification Code</h2><p>You are receiving this email because a request was made for a one-time code that can be used for authentication.</p><p>Please enter the following code for verification:</p><div style="font-size: 24px; font-weight: bold; margin-top: 15px; color: #3498db;">' + genOtp + '</div><p>If you did not request this change, please change your password or use the email: <b>abhaydubey2767@gmail.com</b> to contact us.</p></div></header>'
        mailer.sendMail(userExist.email,'Otp-verification',msg)

        return res.status(200).json({success:true, message:"Otp send successfuly"})
    } catch (error) {
        console.log(error)
        
    }
}

const OtVerify = async(req,res)=>{
    try {
        const {user_id, otp} = req.body;
        const checkotpData = await OTP.findOne({user_id,otp})
        if(!checkotpData){
            return res.status(400).json({success:false, message:"You enterded wrong otp"})
        }
        const isOtpExpired = await fiveMinute(checkotpData.timestamp)
        if(isOtpExpired){
            return res.status(400).json({success:false, message:"OTP is expired"})
        }

        await User.findByIdAndUpdate({_id:user_id},{
            is_verified:1
        })
        
        return res.status(200).json({success:true,message:"Account is verified Successfully"})
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    home, 
    ragister, 
    login, 
    user, 
    mailVerification, 
    SendMailVerification, 
    passwordReset, 
    forgetPassword, 
    updatePassword,
    OtpSend,
    OtVerify
}