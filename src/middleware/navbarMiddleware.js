const db = require('../database/models');
const Categoria = db.Categorias;

async function navbarMiddleware(req, res, next){		 	
		await Categoria.findAll().then((result) => {
			let nombre = result.filter(e=>e.nombre)
			// console.log(nombre);
			res.locals.categorias = nombre
		})
		res.locals.categorias
        next();
};

module.exports = navbarMiddleware;