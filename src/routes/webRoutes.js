const express = require('express');
const router = express.Router();
const path = require('path');
const webControllers = require('../controllers/webControllers');

router.get('/', webControllers.index);

module.exports = router;