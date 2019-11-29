const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controllers = require('../controllers/shop.controllers.js');
const middlewares = require('../middlewares/isUserMiddlewares');

router.route('/')
.get(middlewares.isUserMiddleware, controllers.getShops)
.post([
    check('name').not().isEmpty().withMessage('----Name is empty!-----'),
    check('status').not().isEmpty().withMessage('-----Status is empty ------')
], middlewares.isUserMiddleware, controllers.setShops)
.put(middlewares.isUserMiddleware, controllers.updateShops)
.delete(middlewares.isUserMiddleware, controllers.deleteShops);

module.exports = router;