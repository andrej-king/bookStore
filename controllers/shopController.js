const Product = require('../models/productModel');
const Cart    = require('../models/cartModel');

exports.getShop = (req, res) => {
	res.redirect('/products');
}

exports.getProducts = (req, res) => {
	Product.fetchAll()
		.then(products => {
			res.render('shop/product-list.ejs', {
				products: products,
				pageTitle: 'Products',
				path: '/products'
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
	req.user.getCart()
		.then(products => {
			res.render('shop/cart.ejs', {
				pageTitle: "Your cart",
				path: '/cart',
				products: products
			});
		})
		.catch(error => {
			console.log('Fail to fetch the cart');
		})
}

exports.postCart = (req, res) => {
	const productId = req.body.productId;

	Product.findById(productId)
		.then(product => {
			req.user.addToCart(product);
		})
		.then(result => {
			console.log('Product saved to cart');
			res.redirect('/cart');
		});
}

exports.postDeleteFromCart = (req, res) => {
	const productId = req.body.productId;
	req.user.deleteItemFromCart(productId)
		.then(result => {
			res.redirect('/cart');
		})
		.catch(error => {
			console.log('Fail ro delete an item from cart');
		})
}

exports.postUpdateFromCart = (req, res) => {
	const productId = req.body.productId;
	const qtyUpdate = req.body.quantity_update;


	Product.findById(productId)
		.then(product => {
			req.user.updateQtyInCart(product, qtyUpdate);
		})
		.then(result => {
			console.log('Product quantity updated');
			res.redirect('/cart');
		});
}

exports.getOrders = (req, res) => {
	req.user.getOrders()
		.then(orders => {
			console.log(orders);

			res.render('shop/orders.ejs', {
				pageTitle: "Your Orders",
				path: '/orders',
				orders: orders
			});
		})
		.catch(error => {
			console.log(error);
		})

}

exports.postOrder = (req, res) => {
	req.user.addOrder()
		.then(result => {
			res.redirect('orders');
		})
		.catch(error => {
			console.log(error);
		})
}

exports.getCheckout = (req, res) => {
	res.render('shop/checkout.ejs', {
		pageTitle: "Checkout",
		path: '/checkout'
	})
}