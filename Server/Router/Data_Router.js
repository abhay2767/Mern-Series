const express = require("express")
const router = express.Router();
const Data_Controller = require('../Controller/Data_Controller')
const Auth_Middleware = require('../Middleware/Auth_Middleware')
const bodyParser = require('body-parser')
const validate = require('../Middleware/Validator_Middleware')
const {note_Upload_Schema,image_Upload_Schema,doc_Upload_Schema} = require('../Validators/Auth_Validator')
const multer = require("multer");
const path = require("path");

router.use(express.json())
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}))

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

router.route('/add-notes').post(validate(note_Upload_Schema),Auth_Middleware,Data_Controller.Add_notes)
router.route('/get-notes').get(Auth_Middleware,Data_Controller.Get_notes)
router.route('/get-current-note/:id').get(Auth_Middleware,Data_Controller.Get_noteById)
router.route('/update-notes/:id').patch(validate(note_Upload_Schema),Auth_Middleware,Data_Controller.Update_notes)
router.route('/delete-notes/:id').delete(Auth_Middleware,Data_Controller.Delete_notes)

router.route('/add-image').post(upload.single('images'),validate(image_Upload_Schema),Auth_Middleware,Data_Controller.Add_image)
router.route('/get-image').get(Auth_Middleware,Data_Controller.Get_image)
router.route('/delete-image/:id').delete(Auth_Middleware,Data_Controller.Delete_Image)

router.route('/add-document').post(upload.single('doc'),validate(doc_Upload_Schema),Auth_Middleware,Data_Controller.Add_document)
router.route('/get-document').get(Auth_Middleware,Data_Controller.Get_document)
router.route('/delete-document/:id').delete(Auth_Middleware,Data_Controller.Delete_document)

module.exports = router;