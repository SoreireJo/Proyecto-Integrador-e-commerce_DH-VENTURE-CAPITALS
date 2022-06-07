// ********* Require's ***********
const express = require('express');
const router = express.Router();


// ********* Controller Require ***********
const direccionControllers = require('../controllers/direccionControllers');


/*** GET ALL PRODUCTS ***/ 
router.get('/pais', direccionControllers.pais);

module.exports = router;