const express = require("express");
const router = express.Router();
const Admin_Controller = require('../Controller/Admin_Controller')
const Auth_Middleware = require('../Middleware/Auth_Middleware');
const Admin_Middleware = require('../Middleware/Admin_Middleware')

router.route('/users').get(Auth_Middleware,Admin_Middleware,Admin_Controller.GetAllUser)
router.route('/users/:id').get(Auth_Middleware,Admin_Middleware,Admin_Controller.GetUserById)
router.route('/users/update/:id').patch(Auth_Middleware,Admin_Middleware,Admin_Controller.UpdateuserById)
router.route('/contacts').get(Auth_Middleware,Admin_Middleware,Admin_Controller.GetAllContacts)
router.route('/contacts/delete/:id').delete(Auth_Middleware,Admin_Middleware,Admin_Controller.DeleteContacts)
router.route('/users/delete/:id').delete(Auth_Middleware,Admin_Middleware,Admin_Controller.DeleteUser)
router.route('/services').post(Auth_Middleware,Admin_Middleware,Admin_Controller.AddService)


module.exports = router;