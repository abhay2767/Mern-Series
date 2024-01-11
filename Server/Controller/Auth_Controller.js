const UserFromModel = require('../Model/User_Model')
const bcrypt = require('bcrypt');

const mailer = require('../Helper/Mailer');
const User = require('../Model/User_Model');

const randamstring = require('randomstring');
const resetepassFromModel = require('../Model/ResetPassword')

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
        console.log("In")
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

        const msg = '<h1> Hello, ' + name + ', Please <a href="http:localhost:5000/api/auth/mail-verification/?id=' + userData._id + '">Varify</a> Your mail </h1>';
        mailer.sendMail(email, 'Mail varification', msg);

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
        return res.status(200).json({ userData })/* .sendFile(userData.images); */
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
        const msg = '<p>Hii ' + userExist.name + ', Please Click <a href = "http://localhost:5000/api/auth/forget-passwordform/?token=' + randomStr + '">here</a>to reset your password.<p>';
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

module.exports = {
    home, ragister, login, user, mailVerification, SendMailVerification, passwordReset, forgetPassword, updatePassword
}