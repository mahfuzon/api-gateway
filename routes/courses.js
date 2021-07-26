const express = require('express');
const router = express.Router();
const courseHandler = require('./handler/course');

/* GET users listing. */
router.get('/:id', courseHandler.get);
router.get('/', courseHandler.getAll);
router.post('/', courseHandler.create);
router.put('/:id', courseHandler.update);
router.delete('/:id', courseHandler.destroy);

module.exports = router;