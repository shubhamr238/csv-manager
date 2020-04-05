const express = require("express");
const app = express();
const router = express.Router();
const multer=require('multer');
// var upload = multer({ dest: 'uploads/' });
const csvController = require('../controllers/csvController');

const FileSchema=require('../models/csvFile');

var storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'uploads/');
    },
    filename: function(req, file,cb){
        cb(null, file.fieldname+"-"+Date.now()+"."+ file.originalname.split('.')[file.originalname.split('.').length -1]);
    },
});

var upload=multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(csv)$/)) {
            // return cb(null, false)
            return cb(new Error('Only csv files are allowed!'));
        }
        cb(null, true);
    }
});



//different routes
router.get("/new",csvController.ViewUploadForm);

router.post("/new", upload.single('csvFile') ,function(req, res, next){
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    FileSchema.create(file, function(err, file){
        if(err){
            console.log(err);
        }
        console.log(file);
    });
    res.send(file);
    
});

module.exports = router;