const path          = require('path');
const rootDirectory = require('../utilites/path');
const express       = require('express');
const router        = express.Router();
// mini app pluggable to another express app

router.get('/add-product', (req, res) => {
	res.sendFile(path.join(rootDirectory, 'views', 'add-product.html'));
	// res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

router.post('/add-product', (req, res) => {
	res.redirect('/');
})

module.exports = router;