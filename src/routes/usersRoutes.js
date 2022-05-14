// ********* Require's ***********
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

// ********* Controller Require ***********
const usersControllers = require('../controllers/usersControllers');
const userLoggedMiddleware = require('../middleware/userLoggedMiddleware');


// ********* Configurando el Multer ***********
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


//VALIDACIONES
let validateLogin = [
    body('user')
        .notEmpty().withMessage('Debes completar el campo usuario').bail(),
    body('password')
        .notEmpty().withMessage('Debes completar la campo contraseña').bail()
];

/*** LOGIN USER ***/ 
router.get('/userLogin', usersControllers.userLogin);
router.post('/userLogin', userLoggedMiddleware, validateLogin,  usersControllers.proccessLogin);
router.get('/logout', usersControllers.logout);
/*** REGISTER USER ***/ 
router.get('/userRegister', usersControllers.userRegister);
router.post('/userRegister', fileUpload.single('avatar'), usersControllers.store);

module.exports = router;