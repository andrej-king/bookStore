const mongodb       = require('mongodb');
const MongoClient   = mongodb.MongoClient;

let _db; //_ - the variable used internally only

const mongoConnect = (cb) => {
	// MongoClient.connect('mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.uqgyu.mongodb.net/BookStoreDB?retryWrites=true&w=majority', {useUnifiedTopology: true})
	MongoClient.connect('mongodb://localhost:27017/BookStoreDB', {useUnifiedTopology: true})
		.then(client => {
			console.log('connected');
			_db = client.db();
			cb();
			// client.close();
		})
		.catch(error => {
			throw error;
		});
}

const getDb = () => {
	if (_db) {
		return _db; // returns the connection
	}
	throw "No db found";
}

exports.mongoConnect    = mongoConnect;
exports.getDb           = getDb;