function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;
  
    if(req.session && req.session.usuario){
        res.locals.isLogged = true;
        res.locals.user = req.session.usuario;

    }

    next();
}

module.exports = userLoggedMiddleware; 