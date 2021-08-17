const express = require('express');
const webhookHandler = require('./handler/webhook');
const router = express.Router();

router.post('/webhook', webhookHandler.webhook);

module.exports = router;