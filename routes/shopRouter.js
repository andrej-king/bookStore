const express           = require('express');
const router            = express.Router();
const isAuth            = require('../middleware/isAuth');
const shopController    = require('../controllers/shopController');

router.get('/', shopController.getShop);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postCart);
router.post('/cart-delete-item', isAuth, shopController.postDeleteFromCart);
router.post('/cart-update-qty-item', isAuth, shopController.postUpdateFromCart);
router.get('/orders', isAuth, shopController.getOrders);
router.post('/create-order', isAuth, shopController.postOrder);

module.exports = router;