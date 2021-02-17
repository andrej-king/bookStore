const Product = require('../models/productModel');
const Cart    = require('../models/cartModel');

exports.getProducts = (req, res) => {
	Product.fetchAll()
		.then(products => {
			res.render('shop/product-list.ejs', {
				products: products,
				pageTitle: 'Products',
				path: '/'
			});
		})
		.catch(error => {
			console.log("Failed to fetch for shop controller");
		});
};

exports.getProduct = (req, res) => {
	const productId = req.params.productId;
	Product.findById(productId)
		.then(product => {
			res.render('shop/product-detail.ejs', {
				product: product,
				pageTitle: product.title,
				path: '/products'
			});
		})
		.catch(error => {
			console.log("Failed to fetch by id for shop controller");
		});
}

exports.getCart = (req, res) => {
	res.render('shop/cart.ejs', {
		pageTitle: "Your cart",
		path: '/cart'
	});
	/*Cart.getCart(cart => {
		Product.fetchAll(products => {
			const cartProducts = [];
			for (product of products) {
				const cartProductData = cart.products.find(cartProduct => cartProduct.id === product.id);
				if (cartProductData) {
					cartProducts.push({productData: product, qty: cartProductData.qty});
				}
			}
			res.render('shop/cart.ejs', {
				products: cartProducts,
				totalPrice: cart.totalPrice,
				pageTitle: "Your cart",
				path: '/cart'
			})
		});
	});*/


}

exports.postCart = (req, res) => {
	const requestMethod = req.body._method;
	const productId = req.body.productId;

	if (requestMethod === 'DELETE') {
		// delete method
		/*Product.findById(productId, (product) => {
			Cart.removeProducts(productId, product.price);
			res.redirect('/cart');
		});*/
		res.redirect('/cart');
	} else if (requestMethod === "PUT") {
		/*const quantityToUpdate = req.body.quantity_update;
		Product.findById(productId, (product) => {
			Cart.updateQuantityProducts(productId, product.price, quantityToUpdate);
			res.redirect('/cart');
		});*/
		res.redirect('/cart');
	} else {
		Product.findById(productId, (product) => {
			Cart.addProducts(productId, product.price);
			res.redirect('/cart');
		});
	}
}

exports.getOrders = (req, res) => {
	res.render('shop/orders.ejs', {
		pageTitle: "Orders",
		path: '/orders'
	})
}

exports.getCheckout = (req, res) => {
	res.render('shop/checkout.ejs', {
		pageTitle: "Checkout",
		path: '/checkout'
	})
}