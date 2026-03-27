const express = require('express');
const router = express.Router();
const { getPlatforms } = require('../controllers/platform_controller');

router.get('/', getPlatforms);

module.exports = router;