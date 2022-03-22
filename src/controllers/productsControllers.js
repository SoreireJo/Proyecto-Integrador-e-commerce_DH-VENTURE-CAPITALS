const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {   
    productDetail: (req, res) => {
        res.render(path.join(__dirname, '../views/products/productDetail'));
    },
    productCreateForm: (req, res) => {
        res.render('productCreateForm');
        res.render(path.join(__dirname, '../views/products/productCreateForm'));
    },
    store: (req, res) => {
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
            image: req.file.filename
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.render(path.join(__dirname, '../views/products/productsList'));
	},
}
