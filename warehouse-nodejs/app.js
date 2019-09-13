const express = require('express');
const app = express();
const { check, oneOf, validationResult } = require('express-validator');
var cors = require("cors");

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//conect db and node--------------------------------------------------------------------------
var mysql      = require('mysql');
var connection = mysql.createConnection({
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

function getCurrentUser (user) {
	return new Promise (function (res, rej) {
							const queryStr = `SELECT 1 FROM Users WHERE email=${user.email} AND password=${user.password}`;
							connection.query(queryStr, function (error, results, fields) {
								if (error) {
									rej(error);
								} else {
									if (results.length  > 0) {
								    	res(results);
									}
								}
						    }); 

						});
}

//----------------------query Insert-----------------------
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
    check('name').not().isEmpty().withMessage('----Name is empty!-----').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('-----Incorect name ------'),
    check('surname').not().isEmpty().withMessage('-----Surname is empty ------').matches(/^[A-Z]{1}[a-z]{1,}$/).withMessage('-----Incorect surname ------'),
    check('email').not().isEmpty().withMessage('-----Email is empty ------').normalizeEmail().isEmail().withMessage('-----Incorect email------'),
    check('birthdate').not().isEmpty().withMessage('-----Birthay is empty ------').withMessage('-----Incorect birthay------'),
    check('gemus').isIn(['male','female']).withMessage('----- Incorect gender,please enter the male or female------')
   ],function(req, res) {
   		const errors = validationResult(req);
        if (!errors.isEmpty()) {
  	   		return res.status(422).jsonp(errors.array());
		} else {
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
.post(function(req, res) { 
	getCurrentUser(req.body).then((value)=> {
		res.send(req.body);
	}
	).catch( (error)=> {
		console.log("Error in queri Signin" + error);
		return res.status(400);
	})
		
});


app.listen(8081);
module.exports = app;
