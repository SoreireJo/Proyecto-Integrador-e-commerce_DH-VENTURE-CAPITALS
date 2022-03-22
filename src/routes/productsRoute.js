const express = require('express');
const router = express.Router();
const path = require('path');
const productsControllers = require('../controllers/productsControllers');

router.get('/productDetail', webControllers.productDetail);

router.get('/productCreateForm', webControllers.productCreateForm);
router.post('/', fileUpload.single('image'), webControllers.store); 

module.exports = router;