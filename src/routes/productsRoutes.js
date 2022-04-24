// ********* Require's ***********
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ********* Controller Require ***********
const productsControllers = require('../controllers/productsControllers');

// $ configurando multer desde storage, nos ahorramos el paso de desestructuración
// (Antes) let multerDiskStorage = multer.diskStorage( { // (Ahora ↓)

let storage = multer.diskStorage( {    
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
// $ En fileupload implementamos multer con la configuración que hicimos arriba
// $    como en multer se llama también storage, quitamos los : multerDiskStorage
// let fileUpload = multer({ storage: multerDiskStorage });

let fileUpload = multer({ storage });


/*** GET ALL PRODUCTS ***/ 
router.get('/productsList/:tik?', productsControllers.productsList);


/*** GET PRODUCTS x CATEGORY/: cat ***/ 
router.get('/productsCategory/:cat', productsControllers.productsCategory);


/*** SEARCH ***/ 
router.get('/productSearch', productsControllers.productSearch); 


/*** GET ONE PRODUCT /:id ***/ 
router.get('/productDetail/:id/:tok?', productsControllers.productDetail);


/*** CREATE ONE PRODUCT ***/ 
router.get('/productCreateForm', productsControllers.productCreateForm);
// $  agregamos el middleware multer seteando en su método .single el archivo del form
router.post('/productCreateForm', fileUpload.single('image'), productsControllers.store);


/*** EDIT ONE PRODUCT ***/ 
router.get('/productEditForm/:id', productsControllers.productEditForm);
router.post('/productEditForm/:id', fileUpload.single('image'), productsControllers.update);


/*** DELETE ONE PRODUCT***/
router.delete('/productsList/:id', productsControllers.delete);

module.exports = router;