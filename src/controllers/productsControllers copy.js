const fs = require('fs');
const path = require('path');
const { send } = require('process');
const reMix = require('../modules/reSort');
const db = require('../database/models');
const { Op } = require("sequelize");
const Producto = db.Productos;
const Categoria = db.Categorias;
const Promo = db.Promos;

// NO LA ESTAMOS USANDO POR EL MOMENTO
const sequelize = db.sequelize;

// const moment = require('moment');
// const { load } = require('nodemon/lib/config');
// const Logger = require('nodemon/lib/utils/log');
// ********************************************* //

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
		Producto.create({
			categoriaId: req.body.category,
			promoId: req.body.promo,
			usuarioId: req.body.user, // aqui tenemos que colocar una comprobacion del usuario
			nombre: req.body.name,
			descripcion: req.body.description,
			precio: req.body.price,
			stock: req.body.stock,
			imagen: req.file ? req.file.filename : req.body.Imagen,
			descuento: req.body.discount,
		}).then((product) => {
			console.log(product);
			// console.alert("Creaste el usuario");
			
			res.redirect('/products/List/');

		}).catch(error => res.send(error))
	},


	// Edit - Form to edit
	Edit: (req, res) => {

		Producto.findByPk(req.params.id, { include: ["categorias", "promos", "usuarios"] })

			.then((product) => {
				
				Categoria.findAll().then((result) => {
					let categorias = result.filter(e => e.nombre);

					Promo.findAll().then((result) => {
						let promos = result.filter(e => e.nombre);
						res.render('./products/edit.ejs', { product, categorias, promos, toThousand })
					})
				})
			}).catch(error => res.send(error))
	},

	// Update - Method to update
	Update: (req, res) => {
		let ld = req.params.id
		Producto.update({
			categoriaId: req.body.category,
			promoId: req.body.promo,
			usuarioId: req.body.user,
			nombre: req.body.name,
			descripcion: req.body.description,
			precio: req.body.price,
			stock: req.body.stock,
			imagen: req.file.filename,
			descuento: req.body.discount
		}, {
			where: { id: req.params.id }

		}).then((product) => {
			res.redirect('/products/detail/' + ld);

		}).catch(error => res.send(error));
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

	}
};

module.exports = controller;