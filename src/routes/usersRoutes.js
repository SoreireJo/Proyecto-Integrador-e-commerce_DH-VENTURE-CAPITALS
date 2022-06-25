// ********* Require's ***********
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { check, validationResult } = require('express-validator');
const validUserRegister = require('./validations/validationRegister');
const validUserLogin = require('./validations/validationLogin');

// ********* Controller Require ***********
const usersControllers = require('../controllers/usersControllers');



// ********* Configurando el Multer ***********
const storage = multer.diskStorage( {    
    // * Lugar donde guardamos el archivo
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../../public/images/users');
        callback(null, folder);
    },
    //*  nombre que le damos al archivo
    filename: function(req, file, callback) {
        let imageName = 'user-' + Date.now() + '-' + file.originalname;
        callback(null, imageName);
    }
});
const fileUpload = multer({ storage });

/*** LOGIN USER ***/ 
router.get('/login', usersControllers.login);
router.post('/login', validUserLogin, usersControllers.proccessLogin);

router.get('/logout', usersControllers.logout);

/*** REGISTER USER ***/ 
router.get('/register/:id?', usersControllers.register);
router.post('/register', fileUpload.single('avatar'), validUserRegister, usersControllers.store);

router.get('/edit/:id', usersControllers.Edit);
router.post('/edit/:id', fileUpload.single('image'), usersControllers.Update);

// Actualizado: Acceso Unicamente el admin

router.get('/index',usersControllers.Index);


/*** GET ALL USERS ***/ 

router.get('/list/:id?', usersControllers.List);
/*** SEARCH ***/ 
router.get('/search', usersControllers.Search); // vemos si queda




// Actualizado: Solo Admin Crud de Roles

router.get('/roles/list/:id?', usersControllers.Roles);

router.get('/roles/create',usersControllers.Rolcreate);
router.post('/roles/create',usersControllers.Rolsave);

/*** EDIT ONE PROMOS ***/ 
router.get('/roles/edit/:id', usersControllers.Roledit);
router.post('/roles/edit/:id',usersControllers.Rolupdate);

router.delete('/roles/list/:id?',  usersControllers.Roldelet);

module.exports = router;