const Product = require('../models/productModel');

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
	res.redirect('/');
};

exports.getProducts = (req, res) => {
	Product.fetchAll(products => {
		res.render("admin/products.ejs", {
			products: products,
			pageTitle: "Admin products",
			path: "/admin/products"
		})
	})
}