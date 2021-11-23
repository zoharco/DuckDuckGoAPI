const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index-controller');

router.get('/:searchText', indexController.getOffsetResults);

module.exports = router;