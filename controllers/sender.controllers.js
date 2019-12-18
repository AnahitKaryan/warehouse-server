const { validationResult } = require('express-validator');
const Errors = require('./../errorsCollection/errors');
const HttpStatus = require('http-status-codes');
const connection = require('./../database/connection');
const log = require('./../config/logs');

module.exports.getSenders = async function(req, res) {
    try{
        await connection.query('SELECT * FROM Senders', function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Senders not found');
            } else {
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.NotFound) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        }
        log.info('Error in queri select Senders' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}

module.exports.setSenders = async function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        log.info('UNPROCESSABLE_ENTITY error-' + errors);
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).jsonp(errors.array());
    }

    const data = req.body;
   
    try {
        await connection.query('INSERT INTO Senders SET ? ', data , function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Senders set query error');
            } else {
                log.info('Added Row(s) in Senders table:' + results.affectedRows);
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        log.info('Error in queri insert Senders' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

module.exports.updateSenders = async function(req, res) {

    const data = [req.body.name, req.body.surname, req.body.priority, req.body.id ];
    const query = `UPDATE Senders SET name=?, surname=?, priority=?  where id=?`;

    try {
        await connection.query(query, data, function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Senders not found');
            } else {
                log.info('Updated Row(s) in Senders table:' + results.affectedRows);
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        log.info('Error in queri update Senders' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

module.exports.deleteSenders = async function(req, res) {
    try {
        await connection.query(`DELETE FROM Senders WHERE id = ?`, req.body.id , function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Senders not found');
            } else {
                log.info('Deleted Row(s) in Senders table:' + results.affectedRows);
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        log.info('Error in queri update Senders' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}