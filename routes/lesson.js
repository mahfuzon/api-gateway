const express = require('express');
const router = express.Router();
const lessonHAndler = require('./handler/lesson');

router.post('/', lessonHAndler.create);
// router.get('/:id', lessonHAndler.get);
router.get('/', lessonHAndler.getAll);
router.put('/:id', lessonHAndler.update);
// router.delete('/:id', lessonHAndler.destroy);

module.exports = router;