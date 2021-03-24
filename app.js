//region declaring variable
require('dotenv').config();
const express       = require('express');
const ejs           = require('ejs');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
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
	User.findById(`${process.env.USER_ID}`)
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
//endregion

//region show page 404
app.use((req, res) => {
	res.status(404).render('404.ejs', {
		pageTitle: 'Page Not Found',
		path: ''
	});
});
//endregion

mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.kfrvs.mongodb.net/${process.env.DB_COLLECTION_NAME}?retryWrites=true&w=majority`, {useUnifiedTopology: true, useNewUrlParser: true})
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