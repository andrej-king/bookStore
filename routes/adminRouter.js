const express           = require('express');
const router            = express.Router();
const isAuth            = require('../middleware/isAuth');
const productController = require('../controllers/adminController');

// mini app pluggable to another express app

router.get('/add-product', isAuth, productController.getAddProduct);
router.post('/add-product', isAuth, productController.postAddProduct);

router.get('/products', isAuth, productController.getProducts);

router.get('/edit-product/:productId', isAuth, productController.getEditProduct);
router.post('/edit-product', isAuth, productController.postEditProduct);

router.post('/delete-product', isAuth, productController.postDeleteProduct);

module.exports = router;