const { validationResult } = require('express-validator');
const Errors = require('./../errorsCollection/errors');
const HttpStatus = require('http-status-codes');
const connection = require('./../database/connection');
const log = require('./../config/logs');

module.exports.getHistories = async function(req, res) {
    try{
        await connection.query('SELECT * FROM Histories', function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Histories not found');
            } else {
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        log.info('Error in queri select product' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

module.exports.setHistories = async function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).jsonp(errors.array());
    }

    const data = req.body;

    try {
        await connection.query('INSERT INTO Histories SET ? ', data , function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Histories set query error');
            } else {
                log.info('Added Row(s) in Histories table:' + results.affectedRows);
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        log.info('Error in queri insert Histories' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

module.exports.updateHistories = async function(req, res) {

    const data = [req.body.name, req.body.type, req.body.constly, req.body.price, req.body.quantity, req.body.status, req.body.date1, req.body.date2, req.body.priority, req.body.sender, req.body.shop, req.body.exportDate, req.body.id ];
    const query = `UPDATE Histories SET name=?,type=?,constly=?,price=?,quantity=?,status=?,date1=?,date2=?,priority=?,shop=?,sender=?,exportDate=? where id=?`;
   
    try {
        await connection.query(query, data, function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Histories not found');
            } else {
                log.info('Updated Row(s) in Histories table:' +  results.affectedRows);
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        log.info('Error in queri update products' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

module.exports.deleteHistories = async function(req, res) {
    try { 
        await connection.query(`DELETE FROM Histories WHERE id = ?`, req.body.id , function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Histories not found');
            } else {
                log.info('Deleted Row(s) in Histories table:' + results.affectedRows);
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        log.info('Error in queri update products' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}