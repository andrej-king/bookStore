const path          = require('path');
const rootDirectory = require('../utilites/path');
const express       = require('express');
const router        = express.Router();
const products       = [];
// mini app pluggable to another express app

router.get('/add-product', (req, res) => {
	// res.sendFile(path.join(rootDirectory, 'views', 'add-product.html'));
	res.render('add-product.ejs', {
		pageTitle: 'Add Product',
		path: '/admin/add-product'
	});
});

router.post('/add-product', (req, res) => {
	products.push({title: req.body.title.trim()});
	res.redirect('/');
})

exports.router = router;
exports.products = products;
// module.exports = router;