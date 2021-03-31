const bcrypt    = require('bcryptjs'); // encrypt for password
const User      = require('../models/user');

exports.getLogin = (req, res) => {
	if (req.session.isLoggedIn) {
		return res.redirect('/');
	}

	let msg = req.flash('error');
	if (msg.length > 0) {
		msg = msg[0];
	} else {
		msg = null;
	}

	res.render('auth/login.ejs', {
		pageTitle: 'Login',
		path: '/login',
		isAuthenticated: req.session.isLoggedIn,
		errorMsg: msg
	});
}

exports.postLogin = (req, res) => {
	const email     = req.body.email.trim().toLowerCase();
	const password  = req.body.password;
	const invError  = 'Invalid login or password';
	const smthError = 'Something went wrong';

	User.findOne({email: email})
		.then(userDoc => {
			if (!userDoc) {
				req.flash('error', invError);
				return res.redirect('/login');
			}

			bcrypt.compare(password, userDoc.password) // compare returns true or false
				.then(match => {
					if (match) {
						// set a session
						req.session.isLoggedIn  = true;
						req.session.user        = userDoc;
						return req.session.save((error) => {
							console.log(error);
							res.redirect('/');
						});
					} else {
						req.flash('error', invError);
						return res.redirect('/login');
					}
				})
				.catch(error => {
					console.log(error);
					req.flash('error', smthError);
					res.redirect('/login');
				})
		})
		.catch(error => {
			console.log(error);
			req.flash('error', smthError);
			res.redirect('/login');
		});
}

exports.postLogout = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	})
}

exports.getSignup = (req, res) => {
	if (req.session.isLoggedIn) {
		return res.redirect('/');
	}

	let msg = req.flash('error');
	if (msg.length > 0) {
		msg = msg[0];
	} else {
		msg = null;
	}

	res.render('auth/signup.ejs', {
		pageTitle: 'SignUp',
		path: '/signup',
		isAuthenticated: req.session.isLoggedIn,
		errorMsg: msg
	});
}

exports.postSignup = (req, res) => {
	const username  = req.body.username.trim().toLowerCase();
	const email     = req.body.email.trim().toLowerCase();
	const password  = req.body.password;
	const confPass  = req.body.confirmPassword;

	User.findOne({email: email})
		.then(userDoc => {
			if (userDoc) {
				req.flash('error', 'Email already exists');
				return res.redirect('/signup');
			}

			if (password !== confPass) {
				req.flash('error', 'Password mismatch');
				return res.redirect('/signup');
			}

			return bcrypt.hash(password, 12)
				.then(hashedPassword => {
					const user = new User({
						name: username,
						email: email,
						password: hashedPassword,
						cart: {items: []}
					});

					return user.save();
				})
				.then(result => {
					res.redirect('/login');
				})
				.catch(error => {
					console.log(error);
					req.flash('error', 'Something went wrong');
					res.redirect('/signup');
				})
		})
}