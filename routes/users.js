const express = require('express');
const router = express.Router();
const userHandler = require('./handler/user')
const verifyToken = require('../middleware/verify-token');

router.post('/register', userHandler.register);
router.post('/login', userHandler.login);
router.put('/', verifyToken, userHandler.update);

module.exports = router;