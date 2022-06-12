const fs = require('fs');
const { validationResult } = require('express-validator');
const path = require('path');
const db = require('../database/models');
const Pais = db.Pais;
const Provincia = db.Provincia;
const Localidad = db.Localidad;
const User = db.Usuarios;

// NO LA ESTAMOS USANDO POR EL MOMENTO
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const { load } = require('nodemon/lib/config');
const Logger = require('nodemon/lib/utils/log');
const res = require('express/lib/response');
// ********************************************* //
//Aqui tienen otra forma de llamar a cada uno de los modelos

//ESTO SE VA PRONTO
const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    login: (req, res) => {

        res.render('./users/login', {user:req.session.usuarioLogueado});
		
    },    
	proccessLogin: (req, res) =>{
		let resultValidation = validationResult(req);

		if (resultValidation.isEmpty()) {
			User.findOne({
				where:{
					nombreUsuario: req.body.user,
					claveIngreso: req.body.password
				}
			})
			.then((resultado)=>{
					if(req.body.recordame){
						res.cookie('user', req.body.user,{maxAge: (1000*60)*15})
					}
					req.session.usuario = resultado.nombreUsuario;
					res.redirect('../');
			});	

		} else {
			res.render('./users/login', {errors: resultValidation.array()});
		} 
	

	},
    register: (req, res) => {	
		/* const pais=  Pais.findAll();


		const provincia = Provincia.findAll({
			where:{
				paisId: req.query.pais
			},
			include:['pais']
		})Promise.all([pais, provincia]).then([pais, provincia]=>{res.send(provincia)});
			
		 */
			//return res.send(req.query.categoria);
			const paises = Pais.findAll();
			const provincia = Provincia
			.findAll({
				where: {paisId : 1},
				include: ['pais']
			})
			Promise.all([provincia,paises])
			.then(([provincia,paises]) =>
				//return res.send(platoComida);
				res.send({provincia,paises})
			)
	 },
 
			/* Provincia.findAll().then((provincia)=>{
				let provincias = provincia.filter(e => pais.id = e.paisId);
				res.send(paises);
				Localidad.findAll().then(localidad=>{
					let localidades = localidad.filter(e => e.provinciaId== provincia.id);
					res.render('./user/register', {paises, provincias, localidades});
				})
			}) */
		//}).catch(error => res.send(error)) 	

	store: (req, res) => {
		let errores =  validationResult(req);
		let image = req.file ? req.file.filename : 
			(req.params.id != '-1') ? req.params.id : "default-image.png";
		if (!errores.isEmpty()) {
			return res.render ('./register', {
				errores: errores.array(),
				old: req.body,
				image
			});
		}else{
			let user = {
				firstName:req.body.first_name,
				lastName: req.body.last_name,
				email:req.body.email,
				password: bcrypt.hashSync(req.body.password, 10),
				provincia: Number(req.body.provincia),
				avatar: req.file ? req.file.filename : '',
				role: 1
			};
			User
			.create(user)
			.then((storedUser) => {
				return  res.redirect('/login');
			}).catch(error => console.log(error));
		}
	},
	logout:(req,res) => {
			res.clearCookie('user')
			res.locals.isLogged = false;
			req.session.destroy();
			res.redirect('/');
		
	}
}

module.exports = controller;