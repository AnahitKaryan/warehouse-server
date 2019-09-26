const express = require('express');
const app = express();

const connection = require('./connection'); 

const cors = require("cors");
const session = require('express-session');
const bodyParser = require('body-parser');
const Errors = require('./errors'); // my collection of custom exceptions
const HttpStatus = require('http-status-codes');
const { check, validationResult } = require('express-validator');
const users = require('./routers/user.routers.js');
const products = require('./routers/product.routers.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
});
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(cors('*'));

function getCurrentUser (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	if (email && password) {
		connection.query({
						  sql: 'SELECT * FROM `Users` WHERE `email` = ? AND `password` = ?' ,
						  timeout: 40000, // 40s
						  values: [email,password]
						}, function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.email = email;
				res.send(results);
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
	
}

//----------------------query user Insert-----------------------
function checkPassword (password) {
    connection.query('SELECT * FROM Users WHERE password=?' , [password], function(error, results, fields) {
        if (results.length > 0) {
            return false;
        } else {
            return true;
        }           
    });  
}

//-----------------------------------------------------------------------------------------------

app.use('/signup', users);

app.route('/signin')
.post(function(request, response){
	getCurrentUser(request, response);	
});

app.route('/home')
.get(function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});


app.use('/products', products);

app.listen(8081);
module.exports = app;
