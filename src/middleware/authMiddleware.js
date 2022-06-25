function authMiddleware(req, res, next){
    if (!req.session.usuario) {
        return res.redirect("/users/login");
    
    }else{

      
        next()
        
    }
}

module.exports = authMiddleware; 


