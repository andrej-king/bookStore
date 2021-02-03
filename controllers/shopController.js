const Product = require('../models/productModel');

exports.getProducts = (req, res) => {
	Product.fetchAll(products => {
		// res.render('shop/index.ejs', {
		res.render('shop/product-list.ejs', {
			products: products,
			pageTitle: 'Products',
			path: '/'
		});
	});
};

exports.getProduct = (req, res) => {
	const productId = req.params.productId;
	Product.findById(productId, product => {
		res.render('shop/product-detail.ejs', {
			product: product,
			pageTitle: product.title,
			path: '/products'
		});
	});
}