const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {
    index: (req, res) => {
        res.render('index');
    },
    login: (req, res) => {
        res.render('login');
    },    
    register: (req, res) => {
        res.render('register');
    },
    productDetail: (req, res) => {
        res.render('productDetail');
    },
    productCreateForm: (req, res) => {
        res.render('productCreateForm');
    },
    store: (req, res) => {
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
            image: req.file.filename
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
	}
}
