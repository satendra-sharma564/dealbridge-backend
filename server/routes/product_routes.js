const express = require('express');
const router = express.Router();
const controller = require('../controllers/product_controller');
const clickController = require('../controllers/click_controller');
// CRUD APIs
router.get('/products', controller.getProducts);
router.post('/products', controller.addProduct);
router.put('/products/:id', controller.updateProduct);
router.delete('/products/:id', controller.deleteProduct);
router.get('/track', clickController.trackClick);
router.get('/analytics', clickController.getAnalytics);
module.exports = router;