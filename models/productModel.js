const fs        = require('fs');
const path      = require('path');
const Cart      = require('./cartModel');
const filePath  = path.join(path.dirname(require.main.filename), 'data', 'products.json');

const getProductsFromFile = (cb) => {
	fs.readFile(filePath, (error, fileContent) => {
		if (error) {
			return cb([]);
		}

		cb(JSON.parse(fileContent));
	});
}

module.exports = class Product {
	constructor(id, title, url, price, description) {
		this.id             = id;
		this.title          = title;
		this.imageUrl       = url;
		this.price          = price;
		this.description    = description;
	}

	// save to products.json
	save() {
		getProductsFromFile(products => { // will save callback result in var product
			if (this.id) { // if a product with this id exist
				const existingProductIndex = products.findIndex(product => product.id === this.id);
				const updatedProducts = [...products]; // spread operator - pull out existing products and store them in a new array
				updatedProducts[existingProductIndex] = this;

				fs.writeFile(filePath, JSON.stringify(updatedProducts), (error) => {
					console.log(error);
				});
			} else {
				this.id = Math.random().toString();
				products.push(this);
				fs.writeFile(filePath, JSON.stringify(products), (error) => {
					console.log(error);
				});
			}
		});
	}

	// read from file products.json
	static fetchAll(cb) {
		getProductsFromFile(cb);
	}

	static findById(id, cb) {
		getProductsFromFile(products => {
			// filter a product by its id
			const product = products.find(p => p.id === id);
			cb(product);
		});
	}

	static deleteById(id) {
		getProductsFromFile(products => {
			const product = products.find(productinArray => productinArray.id === id);
			const updatedProducts = products.filter(product => product.id !== id);
			fs.writeFile(filePath, JSON.stringify(updatedProducts), (error) => {
				if (!error) {
					console.log("File updated!");
					Cart.deleteProduct(product.id, product.price);
				} else {
					console.log("Error in delete product");
				}
			});

		});
	}
}