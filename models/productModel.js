// work with mongodb
const mongodb   = require('mongodb');
const getDb     = require('../utilites/db').getDb; // import db connection

class Product {
	constructor(title, url, price, description, id) {
		this.title          = title;
		this.imageUrl       = url;
		this.price          = price;
		this.description    = description;
		this._id            = id ? new mongodb.ObjectId(id) : null;
	}

	save() {
		const db = getDb(); // connect to mongodb and save the product
		let dbOperation;

		if (this._id) { // update product
			dbOperation = db.collection('products').updateOne({_id: this._id}, {$set: this});
		} else { // new product
			dbOperation = db.collection('products').insertOne(this);
		}

		return dbOperation.then(result => {
			console.log('success save or update product');
		})
		.catch(error => {
			console.log("failed save or update product")
		});
	}

	static fetchAll() {
		const db = getDb();

		return db.collection('products').find().toArray() // will work if < 1000 rows
			.then(products => {
				return products;
			})
			.catch(error => {
				console.log("Failed to fetch all the products");
			});
	}

	static findById(productId) {
		const db = getDb();

		return db.collection('products').findOne({_id: new mongodb.ObjectId(productId)})
			.then(product => {
				return product;
			})
			.catch(error => {
				console.log('failed to fetch the product details');
			});
	}
}

module.exports = Product;