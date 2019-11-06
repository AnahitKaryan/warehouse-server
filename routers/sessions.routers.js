const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controllers = require('../controllers/sessions.controllers.js');
const middlewares = require('../middlewares/isUserMiddlewares');

router.route('/')
.delete(middlewares.isUserMiddleware, controllers.deleteSessions);

module.exports = router;