const express = require('express');
const router = express.Router();
const mentorHAndler = require('./handler/mentor')

router.post('/', mentorHAndler.create);
router.get('/:id', mentorHAndler.get);
router.get('/', mentorHAndler.getAll);
router.put('/:id', mentorHAndler.update);
router.delete('/:id', mentorHAndler.destroy);

module.exports = router;