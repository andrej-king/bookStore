const Product = require('../models/productModel');
const Cart    = require('../models/cartModel');

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

exports.getCart = (req, res) => {
	Cart.getCart(cart => {
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
				pageTitle: "Your cart",
				path: '/cart'
			})
		});
	});


}

exports.postCart = (req, res) => {
	const productId = req.body.productId;
	Product.findById(productId, (product) => {
		Cart.addProducts(productId, product.price);
		res.redirect('/cart');
	})
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