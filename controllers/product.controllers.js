const { validationResult } = require('express-validator');
const Errors = require('./../errorsCollection/errors');
const HttpStatus = require('http-status-codes');
const connection = require('./../database/connection');

module.exports.getProducts = async function(req, res) {
    try{
        await connection.query('SELECT * FROM Products', function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Products not found');
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.NotFound) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        }
        console.log("Error in queri select products" + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}

module.exports.setProducts = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    req.body.id = req.body.tableData.id;
    let data = req.body;
    delete data["tableData"];
    try {
        await connection.query('INSERT INTO Products SET ? ', data , function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Products set query error');
            } else {
                console.log('Added Row(s) in Products table:', results.affectedRows);
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.Conflict) {
            return res.status(HttpStatus.Conflict).send({ message: err.message }); // 404
        }
        console.log("Error in queri insert Products" + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
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
                console.log('Updated Row(s) in Products table:', results.affectedRows);
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.NotFound) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        }
        console.log("Error in queri update products" + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}

module.exports.deleteProducts = async function(req, res) {
    try {
        await connection.query(`DELETE FROM Products WHERE id = ?`, req.body.tableData.id , function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Products not found');
            } else {
                console.log('Deleted Row(s) in Products table:', results.affectedRows);
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.NotFound) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        }
        console.log("Error in queri update products" + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}
