// ********* Require's ***********
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const validUserProducts = require('./validations/validationProducts');

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
//Actualizado: menues y acceso de los perfiles "Admin" y "Usuarios" (no a los clientes)
/*** GET ALL PRODUCTS USERS && ADMIN ***/ 

router.get('/index/:id?', productsControllers.Index);

//Revisar:  no se si es correcto :id? para que cuando venga con un id lo reciba o cuando venga con nada tambien lo hice pensando en el usuario para comprobar si es un admin o un cliente o un usuario

// Actualizado: Solo Admin Crud de Categorias
/*** GET ALL x CATEGORY ADMIN ***/ 
router.get('/categories/list/:id?', productsControllers.Categories);
/*** EDIT ONE CATEGORIES ***/ 
router.get('/categories/edit/:id', productsControllers.Catedit);
router.post('/categories/edit/:id',productsControllers.Catupdate);
/*** CREATE ONE CATEGORIES ***/
router.get('/categories/create',productsControllers.Catcreate);
router.post('/categories/create',productsControllers.Catsave);
/*** DELETE ONE CATEGORIES***/
router.delete('/categories/list/:id?',  productsControllers.Catdelet);
// Actualizado: Solo Admin Crud de Promos

/*** GET ALL x PROMOS ADMIN ***/ 
router.get('/promos/list/:id?', productsControllers.Promos);
/*** EDIT ONE PROMOS ***/ 
router.get('/promos/edit/:id', productsControllers.Proedit);
router.post('/promos/edit/:id',productsControllers.Proupdate);
/*** CREATE ONE PROMOS ***/ 
router.get('/promos/create',productsControllers.Procreate);
router.post('/promos/create',productsControllers.Prosave);
/*** DELETE ONE PROMOS***/
router.delete('/promos/list/:id?',  productsControllers.Prodelet);

// Actualizado: a partir de aqui es la vista del cliente

/*** GET ALL PRODUCTS CLIENTS ***/ 
router.get('/list/:id?', productsControllers.List);

/*** GET PRODUCTS x CATEGORY/: cat ***/ 
router.get('/category/:id', productsControllers.Category);

/*** SEARCH ***/ 
router.get('/search', productsControllers.Search); 

/*** GET ONE PRODUCT /:id ***/ 
router.get('/detail/:id', productsControllers.Detail);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsControllers.Create);
router.post('/create',  fileUpload.single('image'), validUserProducts, productsControllers.Store);


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsControllers.Edit);
router.post('/edit/:id', fileUpload.single('image'), validUserProducts, productsControllers.Update);


/*** DELETE ONE PRODUCT***/
router.delete('/list/:id?',  productsControllers.Delete);

module.exports = router;