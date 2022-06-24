function authMiddleware(req, res, next){
    if(req.session.usuario != []){

        next()
    }else{

      
        next()
        
    }
}

module.exports = authMiddleware; 

authMiddleware = (req, res, next) => {
    if (!req.session.usuario) {
        return res.redirect("/users/login");
    }

    next();
    }

    module.exports = authMiddleware;
