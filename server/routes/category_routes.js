const express = require('express');
const router = express.Router();
const controller = require('../controllers/category_controller');

router.get('/categories', controller.getCategories);
router.post('/categories', controller.addCategory);
router.put('/categories/:id', controller.updateCategory);
router.delete('/categories/:id', controller.deleteCategory);

module.exports = router;
