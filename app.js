//region declaring variable
require('dotenv').config();
const express       = require('express');
const ejs           = require('ejs');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const mongoConnect  = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_COLLECTION_NAME}?retryWrites=true&w=majority`;
const session       = require('express-session');
const MongoDBStore  = require('connect-mongodb-session')(session); // save data about session in db
const User          = require('./models/user');

const adminRouter   = require('./routes/adminRouter');
const mainRouter    = require('./routes/shopRouter');
const authRouter    = require('./routes/authRouter');
const PORT          = process.env.PORT || 3000;
const app           = express();

// where save session
const store         = new MongoDBStore({
	uri: mongoConnect,
	collection: 'sessions'
});

//endregion

app.set('view engine', ejs);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// initialize session
app.use(session({
	secret: process.env.DATA_SECRET,
	resave: false,
	saveUninitialized: false,
	store: store
}));

app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}

	User.findById(req.session.user._id)
		.then(user => {
			req.user = user;
			next();
		})
		.catch(error => {
			console.log(error);
		})
});

//region routes
app.use('/admin', adminRouter); // admin - is a filter
app.use(mainRouter);
app.use(authRouter);
//endregion

//region show page 404
app.use((req, res) => {
	res.status(404).render('404.ejs', {
		pageTitle: 'Page Not Found',
		path: '',
		isAuthenticated: req.session.isLoggedIn
	});
});
//endregion

mongoose.connect(mongoConnect, {useUnifiedTopology: true, useNewUrlParser: true})
	.then(result => {
		User.findOne().then(user => {
			if (!user) {
				const user = new User({
					name: 'Mark',
					email: 'mark@gmail.com',
					cart: {
						item: []
					}
				});
				user.save();
			}
		});

		app.listen(PORT, () => {
			console.log(`${PORT} is running`);
		});
	})
	.catch(error => {
		console.log(error);
	});