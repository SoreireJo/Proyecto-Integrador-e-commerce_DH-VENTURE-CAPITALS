const { body, check } = require('express-validator');
const path = require('path');
let validUserRegister = []
/*** REGISTER USER ***/ 
// ** Validaciones **
validUserRegister = [
    check('apellido')
        .notEmpty().withMessage('Debes completar el campo apellido')
        .isLength({min: 2}).withMessage('El campo debe tener minimo 2 digitos'),
    check('nombre')
        .notEmpty().withMessage('Debes completar el campo nombre')
        .isLength({min: 2}).withMessage('El campo debe tener minimo 2 digitos'),
    check('email')
        .notEmpty().withMessage('Debes completar el campo email')
        .isEmail().withMessage('Debe tener un formato de email'),
    check('dni')
        .notEmpty().withMessage('Debes completar el campo dni')
        .isLength({min: 7}).withMessage('La contraseña debe tener mínimo de 7 dígitos')
        .isLength({max: 8}).withMessage('La contraseña debe tener máximo de 8 dígitos'),
    check('contrasenia')
        .notEmpty().withMessage('Debes completar el campo Contraseña')
        .isLength({min: 8}).withMessage('La contraseña debe tener mínimo 8 dígitos'),
    check('avatar')
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            if(!file){
                throw new Error('Debe seleccionar una imagen');
            }else{
                let fileExtension = path.extname(file.originalname);
                if(!acceptedExtensions.includes(fileExtension)){
                    throw new Error('Debe seleccionar una imagen con una extensión válida');
                }else{
                    return true;

    }}}),
 
];

module.exports = validUserRegister;