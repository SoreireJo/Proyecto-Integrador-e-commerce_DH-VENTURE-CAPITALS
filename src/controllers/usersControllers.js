const { validationResult } = require('express-validator');
const db = require('../database/models');
const Pais = db.Pais;
const Provincia = db.Provincia;
const Localidad = db.Localidad;
const User = db.Usuarios;

// NO LA ESTAMOS USANDO POR EL MOMENTO

const { Op } = require("sequelize");
const moment = require('moment');
const { load } = require('nodemon/lib/config');
const Logger = require('nodemon/lib/utils/log');
const res = require('express/lib/response');
// ********************************************* //
//Aqui tienen otra forma de llamar a cada uno de los modelos



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
		Provincia.findAll().then((resultadoProv)=>{
			Localidad.findAll({
				were:{
					provinciaId:resultadoProv.id
				}
			}).then((resultadoLoc)=>{
				res.render('./users/register',{provincias:resultadoProv, localidades:resultadoLoc})	
			})
		}).catch(error => res.send(error)) 
	},
	store: (req, res) => {
		let errores =  validationResult(req);
		let image = req.file ? req.file.filename : 
			(req.params.id != '-1') ? req.params.id : "default-image.png";
		
			let user = {
				nombres: req.body.nombre,
				apellidos: req.body.apellido,
				imagen: req.file ? req.file.filename : req.body.avatar,
				email:req.body.mail,
				activo: 1,
				nombreUsuario: req.body.usuario,
				claveIngreso: req.body.contrasenia,
				telefono: req.body.telefono,
				codigoPostal: req.body.cp,
				direccion:req.body.direccion,
				dni:req.body.dni,
				fechaCreacion: Date.now(),
				localidadId: req.body.localidad,
				rolesid:req.body.provincia,
			};
			User
			.create(user)
			.then((storedUser) => {
				return  res.redirect('./login');
			}).catch(error => console.log(error));
			/* if (!errores.isEmpty()) {
				return res.redirect('./users/register', {
					errores: errores.array(),
					old: req.body,
					image
				});
			}else{} */
	},
	logout:(req,res) => {
			res.clearCookie('user')
			res.locals.isLogged = false;
			req.session.destroy();
			res.redirect('/');
		
	}
}

module.exports = controller;