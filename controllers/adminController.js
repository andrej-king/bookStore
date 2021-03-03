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
		req.body.title.trim(),
		req.body.imageUrl,
		req.body.price,
		req.body.description.trim()
	)
	product.save()
		.then(result => {
			console.log("Product saved");
			res.redirect('/admin/products');
		})
		.catch(error => {
			console.log("Failed to save product");
			res.redirect('/admin/products');
		});
};

exports.getProducts = (req, res) => {
	Product.fetchAll()
		.then(products => {
			res.render("admin/products.ejs", {
				products: products,
				pageTitle: "Admin products",
				path: "/admin/products"
			})
		})
		.catch(error => {
			console.log("Failed to fetch for admin controller");
		})
}

exports.getEditProduct = (req, res) => {
	const editMode = req.query.edit;
	const productId = req.params.productId;

	Product.findById(productId)
		.then(product => {
			if (!product) {
				return res.redirect('/');
			}

			res.render('admin/edit-product.ejs', {
				pageTitle: 'Edit Product',
				path: '/admin/edit-product',
				editing: editMode,
				product: product
			});
		})
		.catch(error => {
			console.log("Failed to edit product for admin controller");
		})
};

exports.postEditProduct = (req, res) => {
	const product = new Product(
		req.body.title.trim(),
		req.body.imageUrl,
		req.body.price,
		req.body.description.trim(),
		req.body.productId
	)
	product.save();
	res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res) => {
	const productId = req.body.productId;
	Product.deleteById(productId)
		.then(() => {
			res.redirect('/admin/products');
		});
};