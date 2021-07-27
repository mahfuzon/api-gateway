const express = require('express');
const router = express.Router();
const courseHandler = require('./handler/course');
const verifyToken = require('../middleware/verify-token');


router.get('/:id', courseHandler.get);
router.get('/', courseHandler.getAll);
router.post('/', verifyToken, courseHandler.create);
router.put('/:id', verifyToken, courseHandler.update);
router.delete('/:id', verifyToken, courseHandler.destroy);

module.exports = router;