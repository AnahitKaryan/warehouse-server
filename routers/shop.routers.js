const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controllers = require('../controllers/shop.controllers.js');

router.route('/')
.get(controllers.getShops)
.post([
    check('name').not().isEmpty().withMessage('----Name is empty!-----'),
    check('status').not().isEmpty().withMessage('-----Status is empty ------')

], controllers.setShops)
.put(controllers.updateShops)
.delete(controllers.deleteShops);

module.exports = router;