const db = require('../database/models');
const Categoria = db.Categorias;

async function navbarMiddleware(req, res, next){		 	
		await Categoria.findAll().then((result) => {
			let nombre = result.filter(e=>e.nombre)
			res.locals.categorias = nombre
			// console.log(res.locals.categorias[1].nombre);
		})
		res.locals.categorias
        next();
};

module.exports = navbarMiddleware;