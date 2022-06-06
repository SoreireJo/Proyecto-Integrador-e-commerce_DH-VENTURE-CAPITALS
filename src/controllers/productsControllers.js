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
	productsList: (req, res) => {
		Producto.findAll({
			include: [
				{ association: "categorias" },
				{ association: "promo" }
			],
		}).then((product) => {

			let productsRemix = [...product];
			productsRemix = reMix(productsRemix);
			let tik = (typeof (req.params.tik) != undefined) ? req.params.tik : '0';
			res.render('./products/productsList', {
				productsRemix,
				tik,
				toThousand
			})
		}).catch(error => res.send(error))


	},
	// Category - Show products x category
	productsCategory: (req, res) => {
		
		Producto.findAll({ include: ["categorias"], })
			.then((product) => {
				let id = req.params.id;
				let products = product.filter(product =>product.categorias[0].categoriaId == id );				
				res.render('./products/productsCategory', { product, products, id, toThousand })
			})
			.catch(error => res.send(error))
	},
	// Search product/s
	productSearch: (req, res) => {
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
	productDetail: (req, res) => {
		Producto.findByPk(req.params.id, { include: ["categorias", "promo"] })

			.then((product) => {
				
				let categoria = product.categorias.filter(item => item.nombre);
				
				res.render('./products/productDetail', {
					product,
					categoria,
					toThousand
				})
			}).catch(error => res.send(error))
	},






	// Create one product
	productCreateForm: (req, res) => {
		res.render('./products/productCreateForm');
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
		res.redirect('/products/productDetail/' + newProduct.id);
	},

	// Edit - Form to edit
	productEditForm: (req, res) => {

		Producto.findByPk(req.params.id, { include: ["categorias", "promo"] })

			.then((product) => {
				
				let categoria = product.categorias.filter(item => item.nombre);

				let promo = product.promo.filter(item => item.nombre);

				Categoria.findAll().then((produc) => {
					let categorias = produc.filter(e => e.nombre);
					Promo.findAll().then((produc) => {
						let promos = produc.filter(e => e.nombre);
						res.render('./products/productEditForm', { product, categoria, promo, categorias, promos, toThousand })
					})
				})
			}).catch(error => res.send(error))
	},

	// Update - Method to update
	update: (req, res) => {
		let ld=req.params.id
		console.log(req.body);
		Producto.update({
			
			nombre:req.body.name,
			descripcion: req.body.description,
			precio: req.body.price,
			stock: req.body.stock,
			imagen: req.file ? req.file.filename: req.body.Imagen,
			descuento: req.body.discount,
			promoId:'5',
			categoriaId:'6'

	},{where:{productoId: req.params.id}
	
	}).then((product)=>{
		res.redirect('/products/productDetail/'+ld);

	}).catch(error => res.send(error));
	},
		
	

	// Delete - Delete one product from DB
	delete: (req, res) => {
		let id = req.params.id;
		let nowProducts = products.filter(product => product.id != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(nowProducts, null, ' '));
		res.redirect('/products/productsList/reList');
	}
};

module.exports = controller;