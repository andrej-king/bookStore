const express       = require('express');
const path          = require('path');
const rootDirectory = require('../utilites/path');
const adminData    = require('./admin');
const router        = express.Router();

router.get('/', (req, res) => {
	const products = adminData.products;

	res.render('shop.ejs', {
		pageTitle: 'Products',
		path: '/',
		productsMain: products
	});
});

module.exports = router;