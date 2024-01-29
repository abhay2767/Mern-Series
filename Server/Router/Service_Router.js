const express = require('express');
const router = express.Router();
const Service_Controller = require('../Controller/Service_Controller')

router.route('/servicedata').get(Service_Controller.services)
router.route('/servicedata/search').post(Service_Controller.searchService)

module.exports = router;