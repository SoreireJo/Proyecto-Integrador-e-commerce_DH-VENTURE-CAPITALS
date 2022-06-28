const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const apiControllers = require('../../controllers/api/users');

const storage = multer.diskStorage( {    
    // * Lugar donde guardamos el archivo
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../../public/images/products');
        callback(null, folder);
    },
    //*  nombre que le damos al archivo
    filename: function(req, file, callback) {
        let imageName = 'product-' + Date.now()+ '-' + file.originalname;
        callback(null, imageName);
    }
});
const fileUpload = multer({ storage });

// prueba api
/*** GET ALL USERS ***/ 
router.get('/users', apiControllers.Users);
router.get('/users/:id?', apiControllers.Detail);

module.exports = router;