const express = require('express');
const router = express.Router();
const services = require("../Controller/Service_Controller")


router.route('/servicedata').get(services)

module.exports = router;