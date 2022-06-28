const { send } = require('process');
const db = require('../database/models');
const { Op } = require("sequelize");
const Producto = db.Productos;
const Categoria = db.Categorias;
const Promo = db.Promos;
const Usuario = db.Usuarios;
const { validationResult } = require('express-validator');



const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {

	// Root - Show all products
	List: (req, res) => {
		Producto.findAll().then((result) => {
			result.sort(() => { return (Math.random() - 0.5) });
			res.render('./products/list', { result, toThousand })
		}).catch(error => res.send(error))
	},
		
	// Search product/s
	Search: (req, res) => {
		let search = req.query.search;
		Producto.findAll({
			where: {
				[Op.or]: [
					{ nombre: { [Op.like]: '%' + search + '%' } },
					{ descripcion: { [Op.like]: '%' + search + '%' } }
				]
			}
		}).then((product) => {
			
			product.reverse();
			res.render('./products/search', { search, product, toThousand })
		})
	},

	// Category - Show products x category
	Category: (req, res) => {
		let id = req.params.id;
		Categoria.findAll({
			include: ["productos"],
			where: { id: { [Op.eq]: id }, },
			categoriaId: { [Op.ne]: id }
		}).then((result) => {
			let products = result[0].productos;
			let categories = result;
			
			res.render('./products/category', { categories, products, toThousand })
		})
	},
	// Detail - Detail from one product
	Detail: (req, res) => {
		Producto.findByPk(req.params.id, { include: ["categorias", "promos"] })
			.then((product) => {
				res.render('./products/detail.ejs/', { product, toThousand })
			})
	},
	// Create one product
	Create: (req, res) => {
		Categoria.findAll().then((result) => {
     			let categorias = result.filter(e => e.nombre);
				Promo.findAll().then((result) => {
				let promos = result.filter(e => e.nombre);
				res.render('./products/create', { categorias, promos, toThousand })
			})
	
		})

	},
	// Create -  Method to store
	Store: (req, res) => {
		let errores =  validationResult(req);
		let image = req.file ? req.file.filename : (req.params.id != '-1') ? req.params.id : "default.png";
		

		if (!errores.isEmpty()) {
				Categoria.findAll().then((result) => {
					let categorias = result.filter(e => e.nombre);
				Promo.findAll().then((result) => {
					let promos = result.filter(e => e.nombre);
					res.render('./products/create', { categorias, promos, toThousand, errores: errores.mapped(),old: req.body,image })
				})
				
			})
		}else{
			Producto.create({
				categoriaId: req.body.category,
				promoId: req.body.promo,
				usuarioId: req.body.user,
				nombre: req.body.name,
				descripcion: req.body.description,
				precio: req.body.price,
				stock: req.body.stock,
				imagen: req.file ? req.file.filename : req.body.image,
				descuento: req.body.discount,
			}).then((product) => {
				res.redirect('/products/List/');
			}).catch(error => res.send(error))
		}
	},
	// Edit - Form to edit
	Edit: (req, res) => {
 		Producto.findByPk(req.params.id, { include: ["categorias", "promos", "usuarios"] })
			.then((product) => {
			
				Categoria.findAll().then((result) => {
					let categorias = result.filter(e => e.nombre);
					Promo.findAll().then((result) => {
						let promos = result.filter(e => e.nombre);
						Usuario.findAll().then((result) => {
						let usuario = result.filter(e =>e.nombreUsuario);
						res.render('./products/edit', { product, categorias, promos,usuario, toThousand })
					})
					})
				}) 
			}).catch(error => res.send(error))
	},
	// Update - Method to update
	Update: (req, res) => {
		let errores =  validationResult(req);
		if (!errores.isEmpty()) {
			Producto.findByPk(req.params.id, { include: ["categorias", "promos", "usuarios"] })
			.then((product) => {
				Categoria.findAll().then((result) => {
					let categorias = result.filter(e => e.nombre);
					Promo.findAll().then((result) => {
						let promos = result.filter(e => e.nombre);
						res.render('./products/edit', { product, categorias, promos, toThousand, old:req.body, errores:errores.mapped()})
					})
				})
			}).catch(error => res.send(error))
		}else{
			let ld = req.params.id
			Producto.update({
				categoriaId: req.body.category,
				promoId: req.body.promo,
				usuarioId: req.body.user,
				nombre: req.body.name,
				descripcion: req.body.description,
				precio: req.body.price,
				stock: req.body.stock,
				imagen: req.file ? req.file.filename : req.body.imagen,
				descuento: req.body.discount
			}, {
				where: { id: req.params.id }
			}).then((product) => {
				res.redirect('/products/detail/' + ld);
			}).catch(error => res.send(error));
		}
	},
	// Delete - Delete one product from DB
	Delete: (req, res) => {
		Producto.destroy({
			where: {
				id: req.params.id
			}
		})
			.then((product) => {
				let id = req.params.id;
				console.log(id);
				res.redirect('/products/list/')
			})
	},

//Anotacion: Menu para el perfil usuarios y administrador
	// Root - Show all 
    Index: (req, res) => {
		Producto.findAll( {include: ["usuarios"]}).then((result) => {
		res.render('./products/index', { result, toThousand })
		}).catch(error => res.send(error))
	},
	// Category - Show all
    Categories: (req, res) => {
	Categoria.findAll().then((result) => {
		res.render('./products/categories/list', { result})
	})
    },
   // Edit - one category
    Catedit: (req, res) => {
	Categoria.findByPk(req.params.id, { include: ["productos"] }).then((result) => { 
		let category = result
		res.render('./products/categories/edit', { category, toThousand })})
    },
	// Update - Method to update
	Catupdate: (req, res) => {
		Categoria.update({nombre: req.body.name,			
			}, {where: { id: req.params.id }})
			.then((result) => {res.redirect('/products/categories/list');})
			.catch(error => res.send(error));
		},
	// Create one category
	Catcreate: (req, res) => {
			res.render('./products/categories/create')
		},
	// Create -  Method to save
	Catsave: (req, res) => {
		Categoria.create({	
			nombre: req.body.name
		}).then((product) => {
			res.redirect('/products/categories/list');
		}).catch(error => res.send(error))
	},
	// Delete - Delete one category
	Catdelet: (req, res) => {
		Categoria.destroy({
			where: {id: req.params.id}})
			.then((product) => {
				res.redirect('/products/categories/list');
			})	
	},
	// Promos - Show all
	Promos: (req, res) => {
		Promo.findAll().then((result) => {
			res.render('./products/promos/list', { result})
		})
	},
	// Edit - one Promos
	Proedit: (req, res) => {
		Promo.findByPk(req.params.id, { include: ["productos"] })
		.then((result) => { 
		let promo = result
		res.render('./products/promos/edit', { promo, toThousand })})
	},
	// Update - Method to update
	Proupdate: (req, res) => {
		Promo.update({nombre: req.body.name,}, {
				where: { id: req.params.id }})
				.then((result) => {	res.redirect('/products/promos/list');})
				.catch(error => res.send(error));
	},
	// Create one Promos
	Procreate: (req, res) => {
		res.render('./products/promos/create')
	},
	// Create -  Method to save
	Prosave: (req, res) => {
		Promo.create({nombre: req.body.name})
		.then((product) => {
		res.redirect('/products/promos/list');})
		.catch(error => res.send(error))
	},

	// Delete - Delete one Promo
	Prodelet: (req, res) => {
		Promo.destroy({
			where: {id: req.params.id}
		})
		.then((product) => {	
			res.redirect('/products/promos/list');
			})	
	},
};

module.exports = controller;