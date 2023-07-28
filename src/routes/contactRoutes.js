const express = require('express');
const { identifyContact } = require('../controllers/contactController');

const router = express.Router();

// Handle the /identify endpoint
router.post('/identify', identifyContact);

module.exports = router;
