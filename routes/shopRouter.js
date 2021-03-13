const express           = require('express');
const router            = express.Router();
const shopController = require('../controllers/shopController');

router.get('/', shopController.getShop);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postDeleteFromCart);
router.post('/cart-update-qty-item', shopController.postUpdateFromCart);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);
router.post('/create-order', shopController.postOrder);

module.exports = router;