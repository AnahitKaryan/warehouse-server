const express = require('express');
const router = express.Router();
const controllers = require('../controllers/currentUser.controllers.js');

router.route('/')
.post(controllers.getCurrentUser);

module.exports = router; 