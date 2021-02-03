const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/adminController');

// mini app pluggable to another express app

router.get('/add-product', productController.getAddProduct);
router.post('/add-product', productController.postAddProduct);

router.get('/products', productController.getProducts);

router.get('/edit-product/:productId', productController.getEditProduct);
router.post('/edit-product', productController.postEditProduct);

module.exports = router;