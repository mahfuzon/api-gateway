const express = require('express');
const router = express.Router();
const tokenHandler = require('./handler/refresh_token');

router.post('/', tokenHandler.create);

module.exports = router;