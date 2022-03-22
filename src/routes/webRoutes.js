const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const webControllers = require('../controllers/webControllers');

// ---- Multer ---- //
let storage = multer.diskStorage( {
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../../public/images/products');
        callback(null, folder);
    },
    filename: function(req, file, callback) {
        let imageName = 'product-' + Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
});
let fileUpload = multer({ storage });

router.get('/', webControllers.index);

router.get('/login', webControllers.login);

router.get('/register', webControllers.register);

router.get('/productDetail', webControllers.productDetail);

router.get('/productCreateForm', webControllers.productCreateForm);
router.post('/', fileUpload.single('image'), webControllers.store); 

module.exports = router;