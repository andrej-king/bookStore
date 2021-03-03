//region declaring variable
const express       = require('express');
const ejs           = require('ejs');
const bodyParser    = require('body-parser');
const mongoConnect  = require('./utilites/db').mongoConnect;

const User          = require('./models/user');

const adminRouter   = require('./routes/adminRouter');
const mainRouter    = require('./routes/shopRouter');
const PORT          = process.env.PORT || 3000;
const app           = express();
//endregion

app.set('view engine', ejs);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use((req, res, next) => {
	User.findById('603f81d736f66130ec73758f')
		.then(user => {
			req.user = new User(user.name, user.email, user.cart, user._id);
			next();
		})
		.catch(error => {
			console.log(error);
		})
});

//region routes
app.use('/admin', adminRouter); // admin - is a filter
app.use(mainRouter);
//endregion

//region show page 404
app.use((req, res) => {
	res.status(404).render('404.ejs', {
		pageTitle: 'Page Not Found',
		path: ''
	});
});
//endregion

//region connect to db and port listener
mongoConnect(() => {
	app.listen(PORT, () => {
        console.log(`${PORT} is running`);
	});
});
//endregion