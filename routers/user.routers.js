const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controllers = require('../controllers/user.controllers.js');

router.route('/')
.get(controllers.getUsers)
.post([
    check('name').not().isEmpty().withMessage('----Name is empty!-----').matches(/^[A-Z]{1,}[a-z]{0,}$/).withMessage('-----Incorect name ------'),
    check('surname').not().isEmpty().withMessage('-----Surname is empty ------').matches(/^[A-Z]{1,}[a-z]{0,}$/).withMessage('-----Incorect surname ------'),
    check('email').not().isEmpty().withMessage('-----Email is empty ------').normalizeEmail().isEmail().withMessage('-----Incorect email------'),
    check('birthdate').not().isEmpty().withMessage('-----Birthay is empty ------').withMessage('-----Incorect birthay------'),
    check('gemus').isIn(['male','female']).withMessage('----- Incorect gender,please enter the male or female------'),
    check('password').not().isEmpty().withMessage('----Password is empty!-----').matches(/^[0-9]{5,}$/).withMessage('-----Incorect password ------')
   ], controllers.setUsers);

module.exports = router; 