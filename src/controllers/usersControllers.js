const { validationResult } = require('express-validator');
const db = require('../database/models');
const Rol = db.Roles;
const Provincia = db.Provincia;
const Localidad = db.Localidad;
const User = db.Usuarios;
const Producto = db.Productos;
const Estado = db.Estados;
const bcrypt = require('bcryptjs');
// NO LA ESTAMOS USANDO POR EL MOMENTO

const { Op } = require("sequelize");
const res = require('express/lib/response');
const moment = require('moment');
const { restart } = require('nodemon');
const { load } = require('nodemon/lib/config');
const Logger = require('nodemon/lib/utils/log');


// ********************************************* //
//Aqui tienen otra forma de llamar a cada uno de los modelos



const controller = {
	login: (req, res) => {

		// res.render('./users/login', { users: " " });

		res.render('./users/login', { user: req.session.usuarioLogueado });

	},
	proccessLogin: (req, res) => {

		let resultValidation = validationResult(req);

		if (resultValidation.isEmpty()) {
			User.findOne({
				include: ["roles", "estados", "compras"],
				where: {
					nombreUsuario: req.body.user,
					claveIngreso: req.body.password
				    }
			})
				.then((resultado) => {
					if (resultado != null) {
						if (req.body.recordame) {
						    res.cookie('user', req.body.user, { maxAge: (1000 * 60) * 15 })
						}
					req.session.usuario = resultado;
					res.redirect('../');
					} else {
						res.render('./users/login', { error: "Las credenciales no son validas" })
						}
				});
		} else {
			res.render('./users/login', { errors: resultValidation.mapped(), old: req.body });
		}
	},
	register: (req, res) => {
		Provincia.findAll().then((resultadoProv) => {
			Localidad.findAll().then((resultadoLoc) => {
				res.render('./users/register', { provincias: resultadoProv, localidades: resultadoLoc })
			})
		}).catch(error => res.send(error))
	},

	store: (req, res) => {
		let errores = validationResult(req);
		let image = req.file ? req.file.filename : (req.params.id != '-1') ? req.params.id : "user.png";
		if (!errores.isEmpty()) {
			Provincia.findAll().then((resultadoProv) => {
				Localidad.findAll().then((resultadoLoc) => {
					res.render('./users/register', { errores: errores.mapped(), image, old: req.body, provincias: resultadoProv, localidades: resultadoLoc });
				})
			})
		} else {
			User.create({
				nombres: req.body.nombre,
				apellidos: req.body.apellido,
				imagen: req.file ? req.file.filename : "user.png",
				email: req.body.email,
				nombreUsuario: req.body.usuario,
				claveIngreso: req.body.contrasenia,
				telefono: req.body.telefono,
				codigoPostal: req.body.cp,
				direccion: req.body.direccion,
				dni: req.body.dni,
				fechaCreacion: Date.now(),
				localidadId: req.body.localidad,
			}).then((storedUser) => {
				console.log(storedUser);
				return res.redirect('./login');
			}).catch(error => console.log(error));
		}

	},
	logout: (req, res) => {
		res.clearCookie('user')
		res.locals.isLogged = false;
		req.session.destroy();
		res.redirect('./login');

	},
	// Edit - Form to edit
	Edit: (req, res) => {
		// res.render('./users/edit')
		User.findByPk(req.params.id, { include: ["roles", "localidad", "estados"] }).then((result) => {
			// res.send(result);
			let userRoles = result
			Rol.findAll().then((result) => {
				let rolesUser = result.filter(e => e.descripcion);
				Provincia.findAll().then((result) => {
					// res.send(result);
					let provincias = result.filter(e => e.provincia);

					Localidad.findAll({ include: ["provincia"] }).then((result) => {
						let localidades = result.filter(e => e.localidad)
						let provi = result.filter(e => e.provincia.id) // las 24 provincias
						Estado.findAll().then((result) => {
							// res.send(result);
							let estados = result.filter(e => e.descripcion);



							res.render('./users/edit', { userRoles, provi, provincias, rolesUser, localidades, estados })
						})
					})
				})
			})
		}).catch(error => res.send(error))
	},
	// Update - Method to update
	Update: (req, res) => {

		User.update({
			apellidos: req.body.surname,
			nombres: req.body.name,
			nombreUsuario: req.body.user,
			email: req.body.email,
			dni: req.body.document,
			direccion: req.body.address,
			localidadId: req.body.localidad,
			codigoPostal: req.body.cp,
			telefono: req.body.phone,
			imagen: req.file ? req.file.filename : req.body.avatar,
			estadosId: req.body.state,
			claveIngreso: (req.body.resetPassword) != '' ? req.body.resetPassword : req.body.password,
			fechaCreacion: Date.now(),
			rolesId: req.body.roles
		}, {
			where: { id: req.params.id }

		}).then((product) => {

			console.log(product);
			let id = req.params.id;
			console.log(id);

			res.redirect('/users/list');

		})
	},

	Index: (req, res) => {
		res.render('./users/index')

	},
	
	List: (req, res) => {
		User.findAll().then((result) => {
			res.render('./users/list', { result })
		})
	},
	Save: (req, res) => {
		let errores = validationResult(req);
		let image = req.file ? req.file.filename : (req.params.id != '-1') ? req.params.id : "user.png";
		if (!errores.isEmpty()) {
			Provincia.findAll().then((resultadoProv) => {
				Localidad.findAll().then((resultadoLoc) => {
					res.render('./users/register', { errores: errores.mapped(), image, old: req.body, provincias: resultadoProv, localidades: resultadoLoc });
				})
			})
		} else {
			User.create({
				nombres: req.body.nombre,
				apellidos: req.body.apellido,
				imagen: req.file ? req.file.filename : "user.png",
				email: req.body.email,
				nombreUsuario: req.body.usuario,
				claveIngreso: req.body.contrasenia,
				telefono: req.body.telefono,
				codigoPostal: req.body.cp,
				direccion: req.body.direccion,
				dni: req.body.dni,
				fechaCreacion: Date.now(),
				localidadId: req.body.localidad,
			}).then((storedUser) => {
				console.log(storedUser);
				return res.redirect('/users/list');
			}).catch(error => console.log(error));
		}

	},
	Delete: (req, res) => {
		User.destroy({
			where: { id: req.params.id }
		})
			.then((result) => {
				res.redirect('/users/list');
			})
	},

	Roles: (req, res) => {

		Rol.findAll().then((result) => {
			res.render('./users/roles/list', { result })
		}).catch(error => res.send(error))
	},
	// Edit - one Rol
	Roledit: (req, res) => {

		Rol.findByPk(req.params.id, { include: ["usuarios"] }).then((result) => {
			// res.send(result)
			console.log(result);
			let roles = result
			res.render('./users/roles/edit', { roles })


		})
	},
	// Update - Method to update
	Rolupdate: (req, res) => {

		Rol.update({
			descripcion: req.body.name,

		}, {
			where: { id: req.params.id }

		}).then((result) => {

			res.redirect('/users/roles/list');

		}).catch(error => res.send(error));


	},
	// Create one category
	Rolcreate: (req, res) => {

		res.render('./users/roles/create')

	},
	// Create -  Method to save
	Rolsave: (req, res) => {

		Rol.create({
			descripcion: req.body.name
		}).then((resul) => {

			res.redirect('/users/roles/list');

		}).catch(error => res.send(error))
	},
	// Delete - Delete one Rol
	Roldelet: (req, res) => {
		Rol.destroy({
			where: { id: req.params.id }
		})
			.then((result) => {
				res.redirect('/users/roles/list');
			})
	},

}

module.exports = controller;