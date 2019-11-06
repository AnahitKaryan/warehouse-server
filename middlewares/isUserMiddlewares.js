const Errors = require('./../errorsCollection/errors');
const connection = require('./../database/connection');

module.exports.isUserMiddleware = async  function(req, res, next) {
    try{
        await connection.query('SELECT * FROM sessions', function (error, results, fields) {
            if (error) {
                console.log('Error massage User is not loggedin');
                throw new Errors.InternalServerError('sessions not found');
            } else {
                console.log('Massage User is loggedin');
                next();
            }
        });
    } catch (err) {
        if (err instanceof Errors.NotFound) {
            console.log('Error massage User is not loggedin');
        }
        console.log('Error in queri select sessions' + err);
    }
}

  