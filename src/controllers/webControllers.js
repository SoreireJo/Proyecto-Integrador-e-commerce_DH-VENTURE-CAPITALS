const fs = require('fs');
const path = require('path');
const { send } = require('process');
const reMix = require('../modules/reSort');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const visited = products.filter(function(product){
	return product.visited;
})

const inSale = products.filter(function(product){
	return !product.visited;
})


const controller = {
	index: (req, res) => {
        let productsRemix = [...products];
        // let productsRemix = reMix(products);
        productsRemix = reMix(productsRemix);
		res.render('web/index', {
            productsRemix,
			visited,
			inSale,
			toThousand
		});
	},
	testPruebas: (req, res) => {
			let productsRemix = [...products];
			// let productsRemix = reMix(products);
			productsRemix = reMix(productsRemix);
			res.render('./web/testPruebas', {
				productsRemix,
				visited,
				inSale,
				toThousand
			});
	}
};

module.exports = controller;