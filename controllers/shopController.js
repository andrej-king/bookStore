const Product   = require('../models/productModel');
const Cart      = require('../models/cartModel');
const Order     = require('../models/orderModel');

exports.getShop = (req, res) => {
	res.redirect('/products');
}

exports.getProducts = (req, res) => {
	Product.find()
		.then(products => {
			res.render('shop/product-list.ejs', {
				products: products,
				pageTitle: 'Products',
				path: '/products',
				isAuthenticated: req.session.isLoggedIn,
				csrfToken: req.csrfToken() // send csurf token
			});
		})
		.catch(error => {
			console.log("Failed to fetch for shop controller");
			res.redirect('/');
		});
};

exports.getProduct = (req, res) => {
	const productId = req.params.productId;
	Product.findById(productId)
		.then(product => {
			res.render('shop/product-detail.ejs', {
				product: product,
				pageTitle: product.title,
				path: '/products',
				isAuthenticated: req.session.isLoggedIn
			});
		})
		.catch(error => {
			console.log(`Failed to fetch by id ${productId} for shop controller`);
			res.redirect('/');
		});
}

exports.getCart = (req, res) => {
	req.user
		.populate('cart.items.productId')
		.execPopulate()
		.then(user => {
			const products = user.cart.items;
			res.render('shop/cart.ejs', {
				pageTitle: "Your cart",
				path: '/cart',
				products: products,
				isAuthenticated: req.session.isLoggedIn
			});
		})
		.catch(error => {
			console.log('Fail to fetch the cart');
			res.redirect('/');
		});
}

exports.postCart = (req, res) => {
	const productId = req.body.productId;

	Product.findById(productId)
		.then(product => {
			return req.user.addToCart(product);
		})
		.then(result => {
			// console.log('Product saved to cart');
			res.redirect('/cart');
		})
		.catch(error => {
			console.log(error);
			res.redirect('/');
		});
}

exports.postDeleteFromCart = (req, res) => {
	const productId = req.body.productId;
	req.user.deleteItemFromCart(productId)
		.then(result => {
			// console.log(`Success deleted item ${productId} from cart`);
			res.redirect('/cart');
		})
		.catch(error => {
			console.log('Fail to delete an item from cart');
			res.redirect('/');
		})
}

exports.postUpdateFromCart = (req, res) => {
	const productId = req.body.productId;
	const qtyUpdate = req.body.quantity_update;

	Product.findById(productId)
		.then(product => {
			return req.user.addToCart(product, qtyUpdate);
		})
		.then(result => {
			// console.log('Product quantity updated');
			res.redirect('/cart');
		})
		.catch(error => {
			console.log(error);
			res.redirect('/cart');
		})
}

exports.getOrders = (req, res) => {
	Order.find({'user.userId': req.user._id})
		.then(orders => {
			res.render('shop/orders.ejs', {
				pageTitle: "Your Orders",
				path: '/orders',
				orders: orders,
				isAuthenticated: req.session.isLoggedIn
			});
		})
		.catch(error => {
			console.log(error);
			res.redirect('/');
		})

}

exports.postOrder = (req, res) => {
	req.user
		.populate('cart.items.productId')
		.execPopulate()
		.then(user => {
			const products = user.cart.items.map(i => {
				return {qty: i.qty, product: {...i.productId._doc}}; // _doc для получения чистых объектов без meta data и т.д.
			});
			const order = new Order({
				user: {
					name: req.user.name,
					userId: req.user._id
				},
				products: products
			});

			return order.save();
		})
		.then(() => {
			return req.user.clearCart();
		})
		.then(() => {
			// console.log('Success added products from cart to orders.');
			res.redirect('orders');
		})
		.catch(error => {
			console.log(error);
			res.redirect('/');
		});
}