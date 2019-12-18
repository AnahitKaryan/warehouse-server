const { validationResult } = require('express-validator');
const Errors = require('./../errorsCollection/errors');
const HttpStatus = require('http-status-codes');
const connection = require('./../database/connection');
const sessionStore = require('./../database/connection');
const log = require('./../config/logs');

module.exports.deleteSessions = async function(req, res) {
    
    if (req.session.user && req.cookies.session_id) {
        res.clearCookie('session_id');
        sessionStore.close();
        req.session.destroy(function(err) {
            log.info('Session destrroy error:' + err);
        })
    }

    try {
        await connection.query(`DELETE FROM sessions`,function (error, results, fields) {
            if (error) {
                throw new Errors.InternalServerError('sessions not found');
            } else {
                log.info('Deleted Row(s) in sessions table:' + results.affectedRows);
                res.user = '';
                res.status(HttpStatus.OK).json(results);
            }
        });
    } catch (err) {
        log.info('Error in queri update sessions' + err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
}