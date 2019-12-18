const { validationResult } = require('express-validator');
const Errors = require('./../errorsCollection/errors');
const HttpStatus = require('http-status-codes');
const connection = require('./../database/connection');
const bcrypt = require('bcrypt');
const log = require('./../config/logs');
const saltRounds = 10;

module.exports.getUsers = async function(req, res){
    try {
        await connection.query('SELECT * FROM Users',function(error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Users not found');
            } else {
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        log.info('Error in queri select Users' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

module.exports.setUsers = async function(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        log.info('UNPROCESSABLE_ENTITY error-' + errors);
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).jsonp(errors.array());
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
                log.info('Eroor: This email address is already being used.');
                return res.status(HttpStatus.CONFLICT).send('This email address is already being used.');
            } else {
                await bcrypt.hash(password, saltRounds, function(err, hash) {
                    connection.query('INSERT INTO Users (name, surname, birthdate, gemus, email, password) VALUES(?, ?, ?, ?, ?, ?)', [name, surname, birthdate, gemus, email, hash], function (error, results, fields) {
                        if (error) {
                            throw new Errors.InternalServerError('Users set query error');
                        } else {
                            log.info('Added Row(s) in Users table:' + results.affectedRows);
                            res.status(HttpStatus.OK);
                            res.send('Successful registretion');
                        }
                    });
                });
            }
        });
    } catch (err) {
        log.info('Error in queri insert Users' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

module.exports.updateUsers = async function(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        log.info('UNPROCESSABLE_ENTITY error-' + errors);
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).jsonp(errors.array());
     }

    const password = req.body.password;
    const email =req.body.email;
    const query = `UPDATE Users SET password=? where email=?`;

    try {
        await bcrypt.hash(password, saltRounds, function(err, hash) {
                    connection.query(query, [hash, email], function (error, results, fields) {
                        if (error) {
                            throw new Errors.InternalServerError('Users not found');
                        } else {
                            log.info('Updated Row(s) in Users table:' + results.affectedRows);
                            res.status(HttpStatus.OK).json(results);
                        }
                    });
                });
    } catch (err) {
        log.info('Error in queri update User' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}