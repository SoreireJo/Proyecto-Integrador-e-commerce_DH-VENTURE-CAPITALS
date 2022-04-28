const express = require('express');
const router = express.Router();
const webControllers = require('../controllers/webControllers');

/*** HOME ***/ 
router.get('/', webControllers.index);

module.exports = router;