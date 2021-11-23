const express = require('express');
const router = express.Router();
const lastQueriesController = require('../controllers/last-quries-controller');

router.post('/', lastQueriesController.saveLastQueris);
router.get('/', lastQueriesController.getLastQueris);

module.exports = router;