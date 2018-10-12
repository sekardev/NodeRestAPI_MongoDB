var express = require('express')
var router = express.Router();
var cors = require('cors');

router.use(cors());
router.use('/users', require('./user.router'));


module.exports = router;