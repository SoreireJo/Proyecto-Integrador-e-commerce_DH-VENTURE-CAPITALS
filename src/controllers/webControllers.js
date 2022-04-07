const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {
    index: (req, res) => {
        let precioConDescuento = 0; 
        products.forEach(element => { 
            let descuento =  (products.price*products.discount)/100;   
            precioConDescuento = products.price - descuento; 
        });

        res.render('web/index', {products, precioConDescuento});
        
    },
    login: (req, res) => {
        res.render('web/login');
    },    
    register: (req, res) => {
        res.render('web/register');
    }
}
