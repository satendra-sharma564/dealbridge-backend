const express = require('express');
const router = express.Router();
const { getPlatforms, addPlatform, updatePlatform, deletePlatform } = require('../controllers/platform_controller');

router.get('/', getPlatforms);
router.post('/', addPlatform);
router.put('/:id', updatePlatform);
router.delete('/:id', deletePlatform);
module.exports = router;