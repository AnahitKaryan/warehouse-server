const Errors = require('./../errorsCollection/errors');
const connection = require('./../database/connection');
const log = require('./../config/logs');

module.exports.isUserMiddleware = async function(req, res, next) {
    if (req.session.user && req.cookies.session_id ) {
        log.info({'statusCode': res.statusCode}, 'Massage User is loggedin');
        next();
    } else {
        log.info({'statusCode': res.statusCode}, 'Error massage User is not loggedin');
    }
}