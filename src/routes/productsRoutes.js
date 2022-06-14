// ********* Require's ***********
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ********* Controller Require ***********
const productsControllers = require('../controllers/productsControllers');


// ********* Configurando el Multer ***********
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


/*** GET ALL PRODUCTS ***/ 
router.get('/list/:id?', productsControllers.List);
// router.get('/list/', productsControllers.list);

/*** GET PRODUCTS x CATEGORY/: cat ***/ 
router.get('/category/:id', productsControllers.Category);


/*** SEARCH ***/ 
router.get('/search', productsControllers.Search); 


/*** GET ONE PRODUCT /:id ***/ 
router.get('/detail/:id', productsControllers.Detail);


/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsControllers.Create);
router.post('/create', fileUpload.single('image'), productsControllers.Store);


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsControllers.Edit);
router.post('/edit/:id', fileUpload.single('image'), productsControllers.Update);


/*** DELETE ONE PRODUCT***/
router.delete('/list/:id?',  productsControllers.Delete);

module.exports = router;