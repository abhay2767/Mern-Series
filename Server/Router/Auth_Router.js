const express = require("express");
const router = express.Router();
const { home, ragister, login, user } = require('../Controller/Auth_Controller')
const Auth_Controller = require('../Controller/Auth_Controller')
const { signupSchema, loginSchema, emailSchema,validateOtp } = require('../Validators/Auth_Validator');
const validate = require('../Middleware/Validator_Middleware')
const Auth_Middleware = require('../Middleware/Auth_Middleware');
const bodyParser = require('body-parser')


/* This line of code adds Express middleware that parses incoming requests bodies with JSON payloads.
    It's important to place this before any routes that need to handle JSON data in the request body.
    This middleware is responsible for parsing JSON data from requests and it should be applied at the begining
    of your middleware stack to ensure it's available for all subsequence route handlers.    
*/
router.use(express.json())

//This will helps to get the data from the form in 'views'
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))

const multer = require("multer");
const path = require("path");

router.use(express.static('Public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../Public/images'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

router.route('/').get(home)
/* router.get('/',(req,res)=>{
    res.status(200).send("Wellcome to You using router");
}) */

//validate(signupchema) is a middleware which is used to validate user input is in a right formet or not.
router.route('/ragister').post(upload.single('images'), validate(signupSchema), Auth_Controller.ragister)

//validate(loginSchema) is a middleware which is used to validate user input is in a right formet or not.
router.route('/login').post(validate(loginSchema), Auth_Controller.login)

router.route('/user').get(Auth_Middleware, Auth_Controller.user)

//Sending mail to user ragistered email
router.route('/mail-verification').get(Auth_Controller.mailVerification)

//validate(emailSchema) is a middleware which is used to validate user input is in a right formet or not.
router.route('/send-mail-verification').post(validate(emailSchema), Auth_Controller.SendMailVerification)

router.route('/reset-password').post(validate(emailSchema), Auth_Controller.passwordReset)

router.route('/forget-passwordform').get(Auth_Controller.forgetPassword)
router.route('/forget-passwordform').post(Auth_Controller.updatePassword)

router.route('/otp-send').post(validate(emailSchema),Auth_Controller.OtpSend)
router.route('/otp-verify').post(validate(validateOtp),Auth_Controller.OtVerify)

module.exports = router;