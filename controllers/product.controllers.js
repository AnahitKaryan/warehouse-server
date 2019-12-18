const { validationResult } = require('express-validator');
const Errors = require('./../errorsCollection/errors');
const HttpStatus = require('http-status-codes');
const connection = require('./../database/connection');
const log = require('./../config/logs');

module.exports.getProducts = async function(req, res) {
    try{
        await connection.query('SELECT * FROM Products', function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Products not found');
            } else {
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        log.info('Error in queri select product' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

module.exports.setProducts = async function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        log.info('UNPROCESSABLE_ENTITY error-' + errors);
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).jsonp(errors.array());
    }

    const data = req.body;

    try {
        await connection.query('INSERT INTO Products SET ? ', data , function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Products set query error');
            } else {
                log.info('Added Row(s) in Products table:' + results.affectedRows);
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        log.info('Error in queri insert Products' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

module.exports.updateProducts = async function(req, res) {
    const data = [req.body.name, req.body.type, req.body.constly, req.body.price, req.body.quantity, req.body.status, req.body.date1, req.body.date2, req.body.priority, req.body.id ];
    const query = `UPDATE Products SET name=?,type=?,constly=?,price=?,quantity=?,status=?,date1=?,date2=?,priority=? where id=?`;
    try {
        await connection.query(query, data, function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Products not found');
            } else {
                log.info('Updated Row(s) in Products table:' +  results.affectedRows);
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        log.info('Error in queri update products' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}

module.exports.deleteProducts = async function(req, res) {
    try { 
        await connection.query(`DELETE FROM Products WHERE id = ?`, req.body.id , function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Products not found');
            } else {
                log.info('Deleted Row(s) in Products table:' + results.affectedRows);
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        log.info('Error in queri update products' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}