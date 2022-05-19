function authMiddleware(req, res, next){
    if(req.session.usuario != []){
        
        console.log("usuario encontrado")
        next()
    }else{

        console.log("usuario no encontrado")
        next()
        
    }
}

module.exports = authMiddleware; 