//region declaring variable
require('dotenv').config();
const express       = require('express');
const ejs           = require('ejs');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose'); //work with db
const mongoConnect  = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_COLLECTION_NAME}?retryWrites=true&w=majority`;
const session       = require('express-session');
const flash         = require('connect-flash'); // for show client side msg
const csurf         = require('csurf'); // check protect session
const MongoDBStore  = require('connect-mongodb-session')(session); // save data about session in db
const User          = require('./models/user');

const adminRouter   = require('./routes/adminRouter');
const mainRouter    = require('./routes/shopRouter');
const authRouter    = require('./routes/authRouter');
const errorRouter   = require('./routes/errorRouter');
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

// initialize csurf
const csurfProtection = csurf();

// initialize session
app.use(session({
	secret: process.env.DATA_SECRET,
	resave: false,
	saveUninitialized: false,
	store: store
}));

// csurf use
app.use(csurfProtection);

// connect flash use
app.use(flash());

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

// added token csurf
app.use((req, res, next) => {
	res.locals.csrfToken = req.csrfToken();
	next();
});

//region routes
app.use('/admin', adminRouter); // admin - is a filter
app.use(mainRouter);
app.use(authRouter);
app.use(errorRouter);
//endregion

mongoose.connect(mongoConnect, {useUnifiedTopology: true, useNewUrlParser: true})
	.then(result => {
		app.listen(PORT, () => {
			console.log(`${PORT} is running`);
		});
	})
	.catch(error => {
		console.log(error);
	});