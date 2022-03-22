const path = require('path');

module.exports = {   
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
	},

}
