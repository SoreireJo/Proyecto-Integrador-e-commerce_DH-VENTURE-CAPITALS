// ********* Require's ***********
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const validUserRegister = require('./validations/validationRegister');
const validUserLogin = require('./validations/validationLogin');

// ********* Controller Require ***********
const usersControllers = require('../controllers/usersControllers');
const userLoggedMiddleware = require('../middleware/userLoggedMiddleware');


// ********* Configurando el Multer ***********
const storage = multer.diskStorage( {    
    // * Lugar donde guardamos el archivo
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../../public/images/users');
        callback(null, folder);
    },
    //*  nombre que le damos al archivo
    filename: function(req, file, callback) {
        let imageName = 'user-' + Date.now() + '-' + file.originalname;
        callback(null, imageName);
    }
});
const fileUpload = multer({ storage });

/*** LOGIN USER ***/ 
router.get('/login', usersControllers.login);
router.post('/login', validUserLogin,  usersControllers.proccessLogin);

router.get('/logout', usersControllers.logout);

router.get('/register', usersControllers.register);
router.post('/register', fileUpload.single('avatar'), validUserRegister, usersControllers.store);

module.exports = router;