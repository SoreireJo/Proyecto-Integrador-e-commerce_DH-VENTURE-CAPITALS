const path = require('path');

module.exports = {
    index: (req, res) => {
     
    },
    detail: (req, res) => {
        res.render('product_detail');
    },    
    create: (req, res) => {
        res.render('product-create-form');
    }  
}
