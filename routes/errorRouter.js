const express           = require('express');
const router            = express.Router();
const errorController   = require('../controllers/errorController');

router.get('*', errorController.notFound);
router.post('*', errorController.notFound);

module.exports = router;