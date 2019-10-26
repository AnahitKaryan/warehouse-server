const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const controllers = require('../controllers/sender.controllers.js');
const middlewares = require('../middlewares/isUserMiddlewares');
//middlewares.isUserMiddleware,
router.route('/')
.get( controllers.getSenders)
.post([
    check('name').not().isEmpty().withMessage('----Name is empty!-----'),
    check('surname').not().isEmpty().withMessage('-----Surname is empty ------')
],  controllers.setSenders)
.put( controllers.updateSenders)
.delete( controllers.deleteSenders);

module.exports = router;