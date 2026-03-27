const express = require('express');
const router = express.Router();
const { trackClick } = require('../controllers/click_controller');

router.get('/track', trackClick);

module.exports = router;