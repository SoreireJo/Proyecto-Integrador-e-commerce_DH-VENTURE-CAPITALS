const path = require('path');

module.exports = {
    index: (req, res) => {
        //return res.send('como vamos hasta aqui');
        //res.sendFile(path.resolve(__dirname,'../views/web/home.html'));
        //res.render(path.resolve(__dirname,'../views/web/home'),{familia: miFamilia});
        //  res.render(path.resolve(__dirname,'../views/web/index'));
        res.render('index');
    },
    login: (req, res) => {
        res.render('login');
    },    
    register: (req, res) => {
        res.render('register');
    },
    product_detail: (req, res) => {
        res.render('product_detail');
    }  
}
