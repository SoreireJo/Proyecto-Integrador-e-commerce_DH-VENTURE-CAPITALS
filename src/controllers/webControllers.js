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
				
				result.sort(() => { return (Math.random() - 0.5) });
			
			res.render('./web/index', {	result,	toThousand});
		})
	
		
			
	}
};

module.exports = controller;
