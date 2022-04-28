const fs = require('fs');
const path = require('path');
const { send } = require('process');
const reMix = require('../modules/reSort');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
    index: (req, res) => {
		let filaOffer = 1;
		let filaLast = 1;
			let productsLast = products.filter(product => product.promo == "last");
			let productsOffer = products.filter(product => product.promo == "offer");
			productsLast = reMix(productsLast);
			productsOffer = reMix(productsOffer);
			res.render('./web/index', {
				productsOffer,
				productsLast,
				filaOffer,
				filaLast,
				toThousand
			});
	}
};

module.exports = controller;
