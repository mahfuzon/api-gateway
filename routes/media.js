const express = require('express');
const router = express.Router();
const mediaHAndler = require('./handler/media')

/* GET users listing. */
router.post('/', mediaHAndler.create);
router.get('/', mediaHAndler.getAll)
router.delete('/:id', mediaHAndler.destroy);

module.exports = router;
