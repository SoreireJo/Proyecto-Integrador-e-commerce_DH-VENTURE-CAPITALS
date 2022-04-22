const express = require('express');
const router = express.Router();
const path = require('path');
const webControllers = require('../controllers/webControllers');

/*** HOME ***/ 
router.get('/', webControllers.index);

/*** TEST PRUEBAS ***/ 
router.get('/testPruebas', webControllers.testPruebas);

module.exports = router;