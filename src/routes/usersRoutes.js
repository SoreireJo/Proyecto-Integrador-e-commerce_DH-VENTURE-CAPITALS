// ********* Require's ***********
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ********* Controller Require ***********
const usersControllers = require('../controllers/usersControllers');


// ********* Multer ***********
let storage = multer.diskStorage( {    
    // * Lugar donde guardamos el archivo
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../../public/images/products');
        callback(null, folder);
    },
    //*  nombre que le damos al archivo
    filename: function(req, file, callback) {
        let imageName = 'user-' + Date.now() + '-' + file.originalname;
        callback(null, imageName);
    }
});
let fileUpload = multer({ storage });

/*** LOGIN USER ***/ 
router.get('/userLogin', usersControllers.userLogin);

/*** REGISTER USER ***/ 
router.get('/userRegister', usersControllers.userRegister);
router.post('/userRegister', fileUpload.single('avatar'), usersControllers.store);

module.exports = router;