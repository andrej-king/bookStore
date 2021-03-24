const User = require('../models/user');

exports.getLogin = (req, res) => {
	if (req.session.isLoggedIn) {
		res.redirect('/');
	}
	res.render('auth/login.ejs', {
		pageTitle: 'Login',
		path: '/login',
		isAuthenticated: req.session.isLoggedIn
	});
}

exports.postLogin = (req, res) => {
	User.findById(`${process.env.USER_ID}`)
		.then(user => {
			req.session.isLoggedIn = true;
			req.session.user = user;
			req.session.save(() => {
				res.redirect('/');
			});
		});
}

exports.postLogout = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	})
}