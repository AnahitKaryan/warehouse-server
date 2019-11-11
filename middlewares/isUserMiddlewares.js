const Errors = require('./../errorsCollection/errors');
const connection = require('./../database/connection');

module.exports.isUserMiddleware = async function(req, res, next) {
    console.log('Cookies: ', req.cookies)
    console.log('Sesion: ', req.session)
    console.log('req.session.user: ', req.session.user)
    console.log('req.cookies.session_id: ', req.cookies.session_id)

    if (req.session.user && req.cookies.session_id ) {
        console.log('Massage User is loggedin');
        next();
    } else {
        console.log('Error massage User not is  loggedin');
    }   
 }

  