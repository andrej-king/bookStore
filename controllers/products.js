// controller for all product - related logic
// const products = [];

const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
	res.render('admin/add-product.ejs', {
		pageTitle: 'Add Product',
		path: '/admin/add-product'
	});
};

exports.postAddProduct = (req, res) => {
	const product = new Product(
			req.body.title.trim(),
			req.body.imageUrl,
			req.body.price,
			req.body.description.trim()
		)
	product.save();

/*	products.push({
		title: req.body.title.trim(),
		imageUrl: req.body.imageUrl,
		price: req.body.price,
		description: req.body.description.trim()
	});*/
	res.redirect('/');
};

exports.getProducts = (req, res) => {
	Product.fetchAll(products => {
		res.render('shop/index.ejs', {
			products: products,
			pageTitle: 'Products',
			path: '/'
		});
	});

	/*res.render('shop/index.ejs', {
		pageTitle: 'Products',
		products: products,
		path: '/'
	});*/
};