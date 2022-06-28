// ********* Require's ***********
const express = require('express');
const router = express.Router();
const path = require('path');

// ********* Controller Require ***********
const apisControllers = require('../controllers/apisControllers');

/*** GET ALL PRODUCTS ***/ 
router.get('/products', apisControllers.Products);

/*** GET ONE PRODUCT /:id ***/ 
router.get('/products/:id?', apisControllers.ProductDetail);

/*** GET ALL USERS ***/ 
router.get('/users', apisControllers.Users);

/*** GET ONE USERS ***/ 
router.get('/users/:id?', apisControllers.UserDetail);

module.exports = router;