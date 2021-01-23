const fs        = require('fs');
const path      = require('path');
const filePath  = path.join(path.dirname(require.main.filename), 'data', 'products.json');

module.exports = class Product {
	constructor(title, url, price, description) {
		this.title          = title;
		this.imageUrl       = url;
		this.price          = price;
		this.description    = description;
	}

	// save to products.json
	save() {
		fs.readFile(filePath, (error, fileContent) => {
			let products = [];

			if (!error) {
				products = JSON.parse(fileContent);
			}

			products.push(this);

			fs.writeFile(filePath, JSON.stringify(products), (error) => {
				console.log(error);
			});
		})
	}

	// read from file products.json
	static fetchAll(cb) {
		fs.readFile(filePath, (error, fileContent) => {
			if (error) {
				cb([]);
			}

			cb(JSON.parse(fileContent));
		});
	}
}