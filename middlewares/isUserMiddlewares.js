module.exports.isUserMiddleware = async  function(req, res, next) {

    req.session.loggedin ? next() : res.status(401).json({"Error massage": "User is not loggedin"}); 
}


  