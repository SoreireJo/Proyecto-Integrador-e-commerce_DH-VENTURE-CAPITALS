const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsControllers = require('../controllers/productsControllers');

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

router.get('/detail/:id', productsControllers.detail);

router.get('/productCreateForm', productsControllers.productCreateForm);

router.post('/productsList', fileUpload.single('image'), productsControllers.store); 

router.delete('/:id/delete', productsControllers.delete); 

module.exports = router;