const express = require('express');
const router = express.Router();
const webControllers = require('../controllers/webControllers');

/*** HOME ***/ 
router.get('/', webControllers.index);

/*** CONTENIDO FOOTER PAGES ***/ 
router.get('/medios-de-pago', webControllers.cFooterMediosDePago);

router.get('/boton-de-arrepentimiento', webControllers.cFooterBotonArrepentimiento);

module.exports = router;