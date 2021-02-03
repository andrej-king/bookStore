const Product = require('../models/productModel');

exports.getAddProduct = (req, res) => {
	res.render('admin/edit-product.ejs', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false
	});
};

exports.postAddProduct = (req, res) => {
	const product = new Product(
		null,
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

exports.getEditProduct = (req, res) => {
	const editMode = req.query.edit;
	const productId = req.params.productId;

	Product.findById(productId, product => {
		if (!product) {
			return res.redirect('/');
		}

		res.render('admin/edit-product.ejs', {
			pageTitle: 'Edit Product',
			path: '/admin/edit-product',
			editing: editMode,
			product: product
		});
	});
};

exports.postEditProduct = (req, res) => {
	const product = new Product(
		req.body.productId,
		req.body.title.trim(),
		req.body.imageUrl,
		req.body.price,
		req.body.description.trim()
	)
	product.save();
	res.redirect("/admin/products");
};