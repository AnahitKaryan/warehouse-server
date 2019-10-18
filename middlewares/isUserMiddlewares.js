module.exports.isUserMiddleware = async  function(req, res, next) {
    if(req.session.cookie.email) {
        console.log('Error massage User is loggedin');
        next();
    } else {
        console.log('Error massage User is not loggedin');
        res.status(401).json({'Error massage': 'User is not loggedin'}); 
        //res.redirect('/')
    }
}


  