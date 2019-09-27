const connection = require('./../database/connection');
const Errors = require('./../errorsCollection/errors');
const HttpStatus = require('http-status-codes');

module.exports.getCurrentUser = async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    try {
        if (email && password) {
            await connection.query(
                {
                 sql: 'SELECT * FROM `Users` WHERE `email` = ? AND `password` = ?' ,
                 timeout: 40000, // 40s
                 values: [email,password]
                }, function(error, results, fields) {
                    if (results.length > 0) {
                        req.session.loggedin = true;
                        req.session.email = email;
                        res.status(200).json(results);
                    } else {
                        res.send('Incorrect Email and/or Password!');
                    }
                    res.end();
                }
            );
        } else {
            res.send('Please enter Email and Password!');
            throw new Errors.InternalServerError('Users not found');
            res.end();
        }
    } catch (err) {
        if (err instanceof Errors.NotFound) {
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        }
        console.log("Error in queri select currentUser" + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}
