const fs = require('fs');
const path = require('path');
const { send } = require('process');
const reMix = require('../modules/reSort');
const db = require('../database/models');
const Producto = db.Productos;
const Categoria = db.Categorias;
const Promo = db.Promos;

// NO LA ESTAMOS USANDO POR EL MOMENTO
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const { load } = require('nodemon/lib/config');
const Logger = require('nodemon/lib/utils/log');
// ********************************************* //

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/// esto sale ///
const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
////Listo/////

const controller = {

	// Root - Show all products
	List: (req, res) => {
		Producto.findAll({ include: ["categorias", "promos", "usuarios","compras"] }).then((product) => {
			// res.send(product);

			let productsRemix = [...product];
			productsRemix = reMix(productsRemix);
			let tik = (typeof (req.params.tik) != undefined) ? req.params.tik : '0';
			res.render('./products/list', {
				productsRemix,
				tik,
				toThousand

			})
		}).catch(error => res.send(error))


	},
	// Category - Show products x category
	Category: (req, res) => {
		
		Producto.findAll({ include: ["categorias"] })
		.then((categoria) => {
				// res.send(product);
				// console.log(categoria[0].categorias.id);
				let id = req.params.id;
				let product = categoria.filter(product =>product.categorias.id == id );
				

				// console.log(product.id);
				res.render('./products/category.ejs/', { product, toThousand })
			})
	},

	// Search product/s
	Search: (req, res) => {
		let search = req.query.search;
		let productsRemix = products.filter(product => product.name.toLowerCase().includes(search));
		productsRemix.reverse();
		res.render('./products/productsSearch', {
			productsRemix,
			search,
			toThousand,
		});
	},

	// Detail - Detail from one product
	Detail: (req, res) => {
		
		Producto.findByPk(req.params.id, { include: ["categorias", "promos"] })
		
			.then((product) => {
				// console.log(product);
				
				// res.send(product);
				// res.render(path.join(__dirname, "../views/products/detail"), {producto, toThousand})
				res.render('./products/detail.ejs/', {product,toThousand})
			})
	},






	// Create one product
	Create: (req, res) => {
		res.render('./products/create');
	},

	// Create -  Method to store
	store: (req, res) => {
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			stock: parseInt(req.body.stock),
			discount: parseInt(req.body.discount),
			price: parseInt(req.body.price),
			image: req.file ? req.file.filename : "default-image.png",
		};

		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		products.reverse();
		res.redirect('/products/detail/' + newProduct.id);
	},

	// Edit - Form to edit
	Edit: (req, res) => {

		Producto.findByPk(req.params.id, { include: ["categorias", "promos"] })

			.then((product) => {
				// res.send(product);
			
				Categoria.findAll().then((categoria) => {					
					let categorias = categoria.filter(e => e.nombre); // aqui debe hacerse el if para que solo printee las 4 categorias distintas al valor por defecto que mostramos por findByPk
                 
					Promo.findAll().then((promo) => {						
						let promos = promo.filter(e => e.nombre);// aqui debe hacerse el if para que solo printee las 4 categorias distintas al valor por defecto que mostramos por findByPk
						res.render('./products/edit.ejs', {
							 product, 
							 categorias, 
							 promos, 
							
							 toThousand })
					})
				})
			}).catch(error => res.send(error))
	},

	// Update - Method to update
	update: (req, res) => {
		let ld=req.params.id
		console.log(req.body);
		Producto.update({
			
			categoriaId:req.body.category,
			promoId:req.body.promo,
			nombre:req.body.name,
			descripcion: req.body.description,
			precio: req.body.price,
			stock: req.body.stock,
			imagen: req.file ? req.file.filename: req.body.Imagen,
			descuento: req.body.discount,
			

	},{where:{id: req.params.id}
	
	}).then((product)=>{
		res.redirect('/products/detail/'+ld);

	}).catch(error => res.send(error));
	},
		
	

	// Delete - Delete one product from DB
	delete: (req, res) => {
		let id = req.params.id;
		let nowProducts = products.filter(product => product.id != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(nowProducts, null, ' '));
		res.redirect('/products/list/reList');
	}
};

module.exports = controller;