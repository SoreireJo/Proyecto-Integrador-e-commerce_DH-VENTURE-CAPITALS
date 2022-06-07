function authMiddleware(req, res, next){
    if(req.session.usuario != []){

        next()
    }else{

      
        next()
        
    }
}

module.exports = authMiddleware; 