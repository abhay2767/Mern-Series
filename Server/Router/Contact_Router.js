const express = require('express');
const router = express.Router()
const contactform = require('../Controller/Contact_Controller')


router.use(express.json())

router.route('/contact').post(contactform) 

module.exports = router;