const express           = require('express');
const router            = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.getProducts);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);

module.exports = router;