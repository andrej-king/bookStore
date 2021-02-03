const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/adminController');

// mini app pluggable to another express app

router.get('/add-product', productController.getAddProduct);
router.get('/products', productController.getProducts);

router.post('/add-product', productController.postAddProduct);

module.exports = router;