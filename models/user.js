const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	cart: { // embedded document
		items: [{
			productId: {
				type: Schema.Types.ObjectId,
				ref: 'Product',
				required: true
			},
			qty: {
				type: Number,
				required: true
			}
		}]
	}
});

// create own function
userSchema.methods.addToCart = function (product, changeQty = null) {
	// find the index of the product if the products is already in the cart
	const cartProductIndex = this.cart.items.findIndex(cp => {
		return cp.productId.toString() === product._id.toString();
	});

	let newQty = 1;

	const updatedCartItems = [...this.cart.items]; // spread operator

	if (cartProductIndex >= 0) {
		// is the product exists, update it's quantity
		switch (changeQty) {
			case '+1':
				newQty = this.cart.items[cartProductIndex].qty + 1;
				break;
			case '-1':
				newQty = this.cart.items[cartProductIndex].qty - 1;
				break;
			default:
				newQty = this.cart.items[cartProductIndex].qty + 1;
		}
		updatedCartItems[cartProductIndex].qty = newQty;
	} else {
		// add product in cart if it not in the cart yet
		updatedCartItems.push({productId: product._id, qty: newQty});
	}

	// save the product to cart and update the database
	this.cart = { items: updatedCartItems };

	return this.save();
}

userSchema.methods.deleteItemFromCart = function (productId) {
	this.cart.items = this.cart.items.filter(item => {
		return item.productId.toString() !== productId.toString();
	});

	return this.save();
}

userSchema.methods.clearCart = function () {
	this.cart = {items: []};
	return this.save();
}

module.exports = mongoose.model('User', userSchema); // mongoose will autoconvert User model to collection 'users'