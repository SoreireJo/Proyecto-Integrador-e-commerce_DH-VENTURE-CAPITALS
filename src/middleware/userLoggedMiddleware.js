function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;
    
    if(req.session && req.session.usuario != undefined){
        if(req.cookies.user != undefined){
            req.session.usuario = req.cookies.user;      
        }
        res.locals.isLogged = true;
        res.locals.user = req.session.usuario;
        return next();
    }
    next();
}

module.exports = userLoggedMiddleware; 