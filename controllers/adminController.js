const Product = require('../models/productModel');

exports.getAddProduct = (req, res) => {
	res.render('admin/edit-product.ejs', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		editing: false
	});
};

exports.postAddProduct = (req, res) => {
	const product = new Product({
		title:          req.body.title.trim(),
		price:          req.body.price,
		description:    req.body.description.trim(),
		imageUrl:       req.body.imageUrl.trim(),
		userId:         req.user._id
	});

	product.save()
		.then(result => {
			// console.log("Product saved");
			res.redirect('/admin/products');
		})
		.catch(error => {
			console.log("Failed to save product");
			res.redirect('/admin/products');
		});
};

exports.getProducts = (req, res) => {
	Product.find()
		.then(products => {
			res.render("admin/products.ejs", {
				products: products,
				pageTitle: "Admin products",
				path: "/admin/products"
			})
		})
		.catch(error => {
			console.log("Failed to fetch for admin controller");
			res.redirect('/');
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
			res.redirect('/');
		})
};

exports.postEditProduct = (req, res) => {
	Product.findById(req.body.productId).then(product => {
		product.title = req.body.title.trim();
		product.price = req.body.price;
		product.description = req.body.description.trim();
		product.imageUrl = req.body.imageUrl.trim();

		return product.save();
	})
		.then(result => {
			// console.log('Product data updated.');
			res.redirect("/admin/products");
		})
		.catch(error => {
			console.log(error);
			res.redirect("/admin/products");
		});
};

exports.postDeleteProduct = (req, res) => {
	const productId = req.body.productId;
	Product.findByIdAndDelete(productId)
		.then(() => {
			// console.log('Success delete product with id: ' + productId);
			res.redirect('/admin/products');
		})
		.catch(error => {
			console.log('Failed to delete product with id: ' + productId);
			res.redirect('/admin/products');
		})
};