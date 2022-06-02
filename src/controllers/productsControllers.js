const fs = require('fs');
const path = require('path');
const { send } = require('process');
const reMix = require('../modules/reSort');
const db = require('../database/models');
const  Producto = db.Productos;
const  Categoria = db.Categorias;
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/// esto sale ///
const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
////Listo/////

const controller = {
    // Root - Show all products
	productsList: (req, res) => {
		let productsRemix = [...products];
        // productsRemix = reMix(productsRemix);
		// let tik = (typeof(req.params.tik) != undefined) ? req.params.tik : '0';
		// res.render('./products/productsList', {
		// productsRemix,
		// tik,
		// toThousand
		// });
		
			Producto.findAll()			
			.then((resultados)=>{
				res.send(resultados)
			}).catch(error => res.send(error))
		
	
	},

	// Category - Show products x category
	productsCategory: (req, res) => {
		let cat = req.params.cat;
		if (cat == "PC") { cat = "PC Componentes"; }
		if (cat == "Perifericos") { cat = "Periféricos"; }
		let productsRemix = products.filter(product => product.category == cat);
		let productsNotMatch = products.filter(product => product.category != cat);
		productsRemix.reverse();
		res.render('./products/productsCategory', {
			productsRemix,
			productsNotMatch,
			cat,
			toThousand
		});
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
		let id = req.params.id;
		let product = products.find(product => product.id == id);
		let tok;
		if (typeof(req.params.tok) != undefined) { tok = req.params.tok };
		res.render('./products/productDetail', {
			product,
			tok,
			toThousand
		});
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
		res.redirect('/products/productDetail/'+ newProduct.id);
	},

	// Edit - Form to edit
	productEditForm: (req, res) => {
		let id = req.params.id
		let productDatos = products.find(product => product.id == id);
		res.render('./products/productEditForm', {productDatos})
	},

	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let productToChange = products.find(product => product.id == id);
		
		productToChange = {
			id: productToChange.id,
			...req.body,
			stock: parseInt(req.body.stock),
			discount: parseInt(req.body.discount),
			price: parseInt(req.body.price),
			description: req.body.description,
			image: req.file ? req.file.filename : productToChange.image,
		};
		
		let newProducts = products.map(product => {
			if (product.id == productToChange.id) {
				return product = {...productToChange,
					image: productToChange.image};
			}
			return product;
		});
		
		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/products/productDetail/'+ productToChange.id + '/1');
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