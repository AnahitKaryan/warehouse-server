const { validationResult } = require('express-validator');
const Errors = require('./../errorsCollection/errors');
const HttpStatus = require('http-status-codes');
const connection = require('./../database/connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getUsers = async function(req, res){
    try {
        await connection.query('SELECT * FROM Users',function(error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Users not found');
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.NotFound) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        }
        console.log('Error in queri select Users' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}

module.exports.setUsers = async function(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
     } 
    const name = req.body.name; 
    const surname = req.body.surname;
    const birthdate = req.body.birthdate;
    const gemus = req.body.gemus;
    const email = req.body.email;
    const password  = req.body.password ;
    try {
        await connection.query('SELECT * FROM Users WHERE email=?' , [email], async function(error, results, fields) {
            if (results.length > 0) {
                return res.status(400).jsonp(['Error','Email exists']);
            } else {
                await bcrypt.hash(password, saltRounds, function(err, hash) {
                    connection.query('INSERT INTO Users (name, surname, birthdate, gemus, email, password) VALUES(?, ?, ?, ?, ?, ?)', [name, surname, birthdate, gemus, email, hash], function (error, results, fields) {
                        if (error) {
                            throw new Errors.InternalServerError('Users set query error');
                        } else {
                            console.log('Added Row(s) in Users table:', results.affectedRows);
                            res.status(200).json(results);
                        }
                    });
                });
            }
        });

       
    } catch (err) {
        if (err instanceof Errors.Conflict) {
            return res.status(HttpStatus.Conflict).send({ message: err.message }); // 404
        }
        console.log('Error in queri insert Users' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}
