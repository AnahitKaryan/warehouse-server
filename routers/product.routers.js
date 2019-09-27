const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controllers = require('../controllers/product.controllers.js');

router.route('/')
.get(controllers.getProducts)
.post([
    check('name').not().isEmpty().withMessage('----Name is empty!-----'),
    check('type').not().isEmpty().withMessage('-----Type is empty ------'),
    check('constly').not().isEmpty().withMessage('-----Consily is empty ------'),
    check('price').not().isEmpty().withMessage('-----price is empty ------'),
    check('quantity').not().isEmpty().withMessage('-----Quantity is empty ------'),
    check('status').not().isEmpty().withMessage('-----Status is empty ------'),
    check('date1').not().isEmpty().withMessage('-----Date1------'),
    check('date2').not().isEmpty().withMessage('-----Date2 is empty ------'),
    check('priority').not().isEmpty().withMessage('-----Priorityy is empty ------')

], controllers.setProducts)
.put(controllers.updateProducts)
.delete(controllers.deleteProducts);

module.exports = router; 