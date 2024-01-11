const express = require('express');
const router = express.Router();
const Signup_Controller = require('../Controller/Signup_Controller');
const multer = require('multer');
const path = require('path');

// Remove bodyParser.json() if using Express 4.16.0 or later
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(express.static('Public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../Public/UserImages'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

router.post('/signup', upload.single('image'), Signup_Controller.register_user);

module.exports = router;
