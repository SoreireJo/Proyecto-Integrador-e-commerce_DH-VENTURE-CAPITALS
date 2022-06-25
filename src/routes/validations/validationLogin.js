const { body } = require('express-validator');
//VALIDACIONES
const validateLogin = [
    body('user')
        .notEmpty().withMessage('Debes completar el campo usuario').bail(),
    body('password')
        .notEmpty().withMessage('Debes completar la campo contraseña').bail()
];

module.exports = validateLogin;