
//----------------------query users Select------------------------
const { validationResult } = require('express-validator');
const Errors = require('./../errors'); // my collection of custom exceptions
const connection = require('./../connection'); 

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
        console.log("Error in queri select Users" + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}

module.exports.setUsers = async function(req, res) { 

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    // } else if(!checkPassword(req.body.password)) {
//           return res.status(400).jsonp(['Error','Password']);
    }
    try {
        await connection.query('INSERT INTO Users SET ? ', req.body , function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Users set query error');
            } else {
                console.log('Added Row(s) in Users table:', results.affectedRows);
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.Conflict) {
            return res.status(HttpStatus.Conflict).send({ message: err.message }); // 404
        }
        console.log("Error in queri insert Users" + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}


