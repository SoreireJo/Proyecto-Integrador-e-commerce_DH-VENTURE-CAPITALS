function guestMiddleware(req, res, next){
    if(req.session.usuario != undefined){
        next()
    }else{
        res.redirect('./users/userLogin');
        
    }
}

module.exports = guestMiddleware; 