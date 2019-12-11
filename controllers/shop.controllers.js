const { validationResult } = require('express-validator');
const Errors = require('./../errorsCollection/errors');
const HttpStatus = require('http-status-codes');
const connection = require('./../database/connection');
const log = require('./../config/logs');

module.exports.getShops = async function(req, res) {
    try{
        await connection.query('SELECT * FROM Shops', function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Shops not found');
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.NotFound) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        }
        log.info('Error in queri select Shops' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}

module.exports.setShops = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    const data = req.body;
    try {
        await connection.query('INSERT INTO Shops SET ? ', data , function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Shops set query error');
            } else {
                log.info('Added Row(s) in Shops table:' + results.affectedRows);
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.Conflict) {
            return res.status(HttpStatus.Conflict).send({ message: err.message }); // 404
        }
        log.info('Error in queri insert Shops' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}

module.exports.updateShops = async function(req, res) {
    const data = [req.body.name, req.body.priority, req.body.id ];
    const query = `UPDATE Shops SET name=?, priority=? where id=?`;
    try {
        await connection.query(query, data, function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Shops not found');
            } else {
                log.info('Updated Row(s) in Shops table:' + results.affectedRows);
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.NotFound) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        }
        log.info('Error in queri update Shops' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}

module.exports.deleteShops = async function(req, res) {
    try {
        await connection.query(`DELETE FROM Shops WHERE id = ?`, req.body.id , function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Shops not found');
            } else {
                log.info('Deleted Row(s) in Shops table:' + results.affectedRows);
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.NotFound) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        }
        log.info('Error in queri update Shops' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}