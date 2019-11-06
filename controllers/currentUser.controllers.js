const connection = require('./../database/connection');
const Errors = require('./../errorsCollection/errors');
const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');

module.exports.getCurrentUser = async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    try {
        if (email && password) {
            await connection.query('SELECT password FROM Users WHERE email = ?', [email], async function(error, results, fields) {
                    if (results.length > 0) {
                        const match = await bcrypt.compare(password, results[0].password);
                        if(match) {
                            req.session.user = email + password;
                            res.cookie('user', req.session.user, { maxAge: 900000});
                            res.setHeader('Cookie', req.session.user);
                            res.status(200)
                            res.json(results);
                        } else {
                            res.status(400).send('Incorrect Password!');
                        }
                    } else {
                        res.status(401).send('Incorrect Email and/or Password!');
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
        console.log('Error in queri select currentUser' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message }); // 500
    }
}