const express = require('express');
const router = express.Router();
const path = require('path');
const webControllers = require('../controllers/webControllers');

router.get('/', webControllers.index);

router.get('/login', webControllers.login);

router.get('/register', webControllers.register);

router.get('/productDetail', webControllers.productDetail);

router.get('/productCreateForm', webControllers.productCreateForm);

module.exports = router;