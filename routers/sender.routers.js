const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controllers = require('../controllers/sender.controllers.js');
const middlewares = require('../middlewares/isUserMiddlewares');

router.route('/')
.get(middlewares.isUserMiddleware, controllers.getSenders)
.post([
    check('name').not().isEmpty().withMessage('----Name is empty!-----'),
    check('surname').not().isEmpty().withMessage('-----Surname is empty ------')
], middlewares.isUserMiddleware, controllers.setSenders)
.put(middlewares.isUserMiddleware, controllers.updateSenders)
.delete(middlewares.isUserMiddleware, controllers.deleteSenders);

module.exports = router; 