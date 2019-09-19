const express = require('express');
const app = express();
const { check, oneOf, validationResult } = require('express-validator');
const cors = require("cors");
var session = require('express-session');
const bodyParser = require('body-parser');

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

//conect db and node--------------------------------------------------------------------------
const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'a28762',
    database : 'warehouse'
});
 
connection.connect();


//----------------------query Select------------------------

function getUsers () {
	return new Promise (function (res, rej) {
							connection.query('SELECT * FROM Users', function (error, results, fields) {
								if (error) {
									rej(error);
								} else {
								    res(results);
								}
						    });
						});
}

function getCurrentUser (request, response) {
	var email = request.body.email;
	var password = request.body.password;
	if (email && password) {
		connection.query({
						  sql: 'SELECT * FROM `Users` WHERE `email` = ? AND `password` = ?' ,
						  timeout: 40000, // 40s
						  values: [email,password]
						}, function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.email = email;
				response.send(results);
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
	
}

//----------------------query Insert-----------------------
function checkPassword (password) {
    connection.query('SELECT * FROM Users WHERE password=?' , [password], function(error, results, fields) {
        if (results.length > 0) {
            return false;
        } else {
            return true;
        }           
    });  
}


function setUsers (user) {
	return new Promise (function (res, rej) { console.log(user);
							connection.query('INSERT INTO Users SET ? ', user , function (error, results, fields) {
								if (error) {
									rej(error);
								} else {
								    res(results);
								}
						    });
						});
}

//-----------------------------------------------------------------------------------------------


app.route('/signup')
.get(function(req, res) {
	getUsers().then((value)=> {
				console.log(value);
				res.send(value);
			  }
).catch((error)=> {
			console.log("Error in queri select" + error);
			res.send(error);
})
	
})
.post([
    check('name').not().isEmpty().withMessage('----Name is empty!-----').matches(/^[A-Z]{1,}[a-z]{0,}$/).withMessage('-----Incorect name ------'),
    check('surname').not().isEmpty().withMessage('-----Surname is empty ------').matches(/^[A-Z]{1,}[a-z]{0,}$/).withMessage('-----Incorect surname ------'),
    check('email').not().isEmpty().withMessage('-----Email is empty ------').normalizeEmail().isEmail().withMessage('-----Incorect email------'),
    check('birthdate').not().isEmpty().withMessage('-----Birthay is empty ------').withMessage('-----Incorect birthay------'),
    check('gemus').isIn(['male','female']).withMessage('----- Incorect gender,please enter the male or female------'),
    check('password').not().isEmpty().withMessage('----Password is empty!-----').matches(/^[0-9]{5,}$/).withMessage('-----Incorect password ------')
   ],function(req, res) {
   		const errors = validationResult(req);
        if (!errors.isEmpty()) {
  	   		return res.status(422).jsonp(errors.array());
		// } else if(!checkPassword(req.body.password)) {
  //           return res.status(400).jsonp(['Error','Password']);
        }else {
			setUsers(req.body).then((value)=> {
				res.send(req.body);
			}
			).catch( (error)=> {
				console.log("Error in queri Insert" + error);
				res.send(error);
			})
		}
});

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



app.listen(8081);
module.exports = app;
