const mongodb       = require('mongodb');
const MongoClient   = mongodb.MongoClient;

let _db; //_ - the variable used internally only

const mongoConnect = (cb) => {
	MongoClient.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.kfrvs.mongodb.net/${process.env.DB_COLLECTION_NAME}?retryWrites=true&w=majority`, {useUnifiedTopology: true})
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