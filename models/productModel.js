const fs        = require('fs');
const path      = require('path');
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
	constructor(title, url, price, description) {
		this.title          = title;
		this.imageUrl       = url;
		this.price          = price;
		this.description    = description;
	}

	// save to products.json
	save() {
		this.id = Math.random().toString();
		getProductsFromFile(products => { // will save callback result in var product
			products.push(this);

			fs.writeFile(filePath, JSON.stringify(products), (error) => {
				console.log(error);
			});
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
}