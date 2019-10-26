const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const users = require('./routers/user.routers.js');
const currentUsers = require('./routers/currentUser.routers.js');
const products = require('./routers/product.routers.js');
const shops = require('./routers/shop.routers.js');
const senders = require('./routers/sender.routers.js');
const config = require('./configs/dbConfig');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors('*'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
});

app.use(session({
	secret: '!@#$%^&*()',
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: false,
      secure: false,
    }
}));

app.use('/signup', users);
app.use('/signin', currentUsers);
app.use('/products', products);
app.use('/shops', shops);
app.use('/senders', senders);

app.route('/home')
.get(function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(config.DN_PORT);
module.exports = app;