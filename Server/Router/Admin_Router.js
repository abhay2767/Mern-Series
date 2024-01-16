const express = require("express");
const router = express.Router();
const Admin_Controller = require('../Controller/Admin_Controller')
const Auth_Middleware = require('../Middleware/Auth_Middleware');
const Admin_Middleware = require('../Middleware/Admin_Middleware')

const bodyParser = require('body-parser')
router.use(express.json())
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}))
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

router.route('/admin').get(Admin_Controller.AdminHome)

router.route('/users').get(Auth_Middleware,Admin_Middleware,Admin_Controller.GetAllUser)
router.route('/users/:id').get(Auth_Middleware,Admin_Middleware,Admin_Controller.GetUserById)
router.route('/users/update/:id').patch(Auth_Middleware,Admin_Middleware,Admin_Controller.UpdateuserById)
router.route('/contacts').get(Auth_Middleware,Admin_Middleware,Admin_Controller.GetAllContacts)
router.route('/contacts/delete/:id').delete(Auth_Middleware,Admin_Middleware,Admin_Controller.DeleteContacts)
router.route('/users/delete/:id').delete(Auth_Middleware,Admin_Middleware,Admin_Controller.DeleteUser)
router.route('/services').post(upload.single('images'),Auth_Middleware,Admin_Middleware,Admin_Controller.AddService)


module.exports = router;