const path = require('path');
const { body } = require('express-validator');

/*** REGISTER USER ***/ 
// ** Validaciones **
const validUserProducts = [
    body('name')
         .notEmpty()
        .withMessage('Debes completar el campo nombre del producto')
        .isLength({min: 5})
        .withMessage('El campo nombre debe tener minimo 5 digitos'),  
    body('description')
         .notEmpty()
        .withMessage('Debes completar el campo descripción')
        .isLength({min: 20})
        .withMessage('El campo descripcion debe tener minimo 20 digitos'),
    body('image')
        .custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.jpeg', '.png','.gif'];
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

module.exports = validUserProducts;