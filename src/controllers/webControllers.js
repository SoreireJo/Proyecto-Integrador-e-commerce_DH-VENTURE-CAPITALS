const { send } = require('process');
const db = require('../database/models');
const { Op } = require("sequelize");
const Producto = db.Productos;
const Categoria = db.Categorias;
const Promo = db.Promos;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    index: (req, res) => {

		Producto.findAll({include: ["promos"]}).then((result) => {
			// for (const product of promos)
			
			
			// console.log(promo)
			// for(let i = 0;i< promos.length ;i++)
			
			

                // let product = result.filter(e=> e.promoId == 2)
				
				result.sort(() => { return (Math.random() - 0.5) });
					
				
			
			// res.send(product)
			// let filaOffer = 1;
			// let filaLast = 1;
			
			// for(let i = 0;(i< (4*1))&&(i< product.length) ;i++)
			// product = product[i]
			// console.log(product[i]);
			res.render('./web/index', {	result,	toThousand});
		})
	
		
			
	},

	cFooterMediosDePago: (req, res) => {
		res.render('./web/mediosDePago');
	},

	cFooterBotonArrepentimiento: (req, res) => {
		res.render('./web/botonArrepentimiento');
	}
	
};

module.exports = controller;
