const { body } = require('express-validator');
/*** REGISTER USER ***/ 
// ** Validaciones **
let validUserRegister = [
    body('document')
        .isLength({min: 7, max: 8} )
        .withMessage('El campo Documento debe tener 8 dígitos'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener mínimo 6 dígitos'),
];

module.exports = validUserRegister; 