// ********* Require's ***********
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

// ********* Controller Require ***********
const usersControllers = require('../controllers/usersControllers');


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


/*** LOGIN USER ***/ 
router.get('/userLogin', usersControllers.userLogin);

/*** REGISTER USER ***/ 
// ** Validaciones **
const validUserRegister = [
    // body('surname').notEmpty().withMessage('Debes completar el campo Apellido').bail(),
    // body('name').notEmpty().withMessage('Debes completar el campo Nombre').bail(),
    // body('user').notEmpty().withMessage('Debes completar el campo Nombre de usuario').bail(),
    // body('mail')
        //.isEmail().withMessage('Debes completar el campo Correo electrónico con una cuenta válida').bail(),
    // body('birth').notEmpty().withMessage('Debes completar el campo Fecha de nacimiento').bail(),
    body('document')
        // .notEmpty().withMessage('Debes completar el campo Documento con los 8 dígitos').bail()
        // .isLength({ min: 8, max: 8}).withMessage('Debes completar el campo Documento con los 8 dígitos').bail(),
        .isLength({ min: 8, max: 8}).withMessage('Debes completar el campo Documento con los 8 dígitos').bail(),
    // body('address').notEmpty().withMessage('Debes completar el campo Domicilio').bail(),
    // body('city').notEmpty().withMessage('Debes completar el campo Ciudad').bail(),
    // body('prov').notEmpty().withMessage('Debes completar el campo Provincia').bail(),
    // body('cp').notEmpty().withMessage('Debes completar el campo Código Postal').bail(),
    // body('phone').notEmpty().withMessage('Debes completar el campo Teléfono').bail(),
    // body('password')
    //     .notEmpty().withMessage('Debes completar los campos de Contraseñas')
        // .isLength({ min: 8 }).withMessage('Las Contraseña deben de ser de al menos 8 caracteres, y deben coincidir')
        // .equals(req.body.repeat-password).bail(),
    body('password')
        .trim()
        .if((value, { req }) => (typeof req.body.passwordConfirm !== 'undefined')).bail()
        .custom((value, { req }) => value !== req.body.passwordConfirm).
        withMessage('The email must be a valid one').bail()
        .trim().matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"),
]
router.get('/userRegister', usersControllers.userRegister);
router.post('/userRegister', validUserRegister, fileUpload.single('avatar'), usersControllers.store);

module.exports = router;
