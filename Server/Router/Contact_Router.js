const express = require('express');
const router = express.Router()
const contactform = require('../Controller/Contact_Controller')
const validate = require('../Middleware/Validator_Middleware')
const {contactSchema} = require('../Validators/Auth_Validator')

router.use(express.json())

router.route('/contact').post(validate(contactSchema),contactform)

module.exports = router;