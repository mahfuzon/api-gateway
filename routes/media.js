const express = require('express');
const router = express.Router();
const mediaHAndler = require('./handler/media')

/* GET users listing. */
router.post('/', mediaHAndler.create);
router.get('/', mediaHAndler.getAll)

module.exports = router;
