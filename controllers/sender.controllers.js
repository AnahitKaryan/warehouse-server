const { validationResult } = require('express-validator');
const Errors = require('./../errorsCollection/errors');
const HttpStatus = require('http-status-codes');
const connection = require('./../database/connection');

module.exports.getSenders = async function(req, res) {
    try{
        await connection.query('SELECT * FROM Senders', function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Senders not found');
            } else {
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.NotFound) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        }
        console.log("Error in queri select Senders" + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}

module.exports.setSenders = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    req.body.id = req.body.tableData.id;
    let data = req.body;
    delete data["tableData"];
    try {
        await connection.query('INSERT INTO Senders SET ? ', data , function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Senders set query error');
            } else {
                console.log('Added Row(s) in Senders table:', results.affectedRows);
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.Conflict) {
            return res.status(HttpStatus.Conflict).send({ message: err.message }); // 404
        }
        console.log("Error in queri insert Senders" + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}

module.exports.updateSenders = async function(req, res) {
    const data = [req.body.name, req.body.surname, req.body.id ];
    const query = `UPDATE Senders SET name=?, surname=? where id=?`;
    try {
        await connection.query(query, data, function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Senders not found');
            } else {
                console.log('Updated Row(s) in Senders table:', results.affectedRows);
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.NotFound) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        }
        console.log("Error in queri update Senders" + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}

module.exports.deleteSenders = async function(req, res) {console.log("deleti kanch i=  " + req.body.tableData.id);
    try {
        await connection.query(`DELETE FROM Senders WHERE id = ?`, req.body.tableData.id , function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('Senders not found');
            } else {
                console.log('Deleted Row(s) in Senders table:', results.affectedRows);
                res.status(200).json(results);
            }
        });
    } catch (err) {
        if (err instanceof Errors.NotFound) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        }
        console.log("Error in queri update Senders" + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}
