const express = require('express');
const router = express.Router();
const userHAndler = require('./handler/user')

router.post('/register', userHAndler.register);

module.exports = router;