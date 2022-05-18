const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    userLogin: (req, res) => {

        res.render('./users/userLogin', {user:req.session.usuarioLogueado});
		
    },    
	proccessLogin: (req, res) =>{
		let usuarioLogueado = '';
		let resultValidation = validationResult(req);
		if (resultValidation.isEmpty()) {
			for(let i=0; i<users.length; i++){
				if(users[i].user == req.body.user){
					if(users[i].password == req.body.password){
						usuarioLogueado = users[i].user;
						if(req.body.recordame){
							res.cookie('user', req.body.user,{maxAge: (1000*60)*2})
						}
						break
					}
				}
			}
			if(usuarioLogueado == undefined){
				return res.render('./users/userLogin', {errors: [{
					msg: 'Credenciales Invalidas'
				}]});
			} else{
				req.session.usuario = usuarioLogueado;
				res.redirect('../');
	
			}
			
		} else {
			res.render('./users/userLogin', {errors: resultValidation.array()});
		}

	},
    userRegister: (req, res) => {
        res.render('./users/userRegister', {users});
    },

	store: (req, res) => {
		let newUser = {
			id: users[users.length - 1].id + 1,
			...req.body,
			image: req.file.filename
		};
		users.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		res.redirect('/');
	},
	logout:(req,res) => {
			res.clearCookie('user')
			res.locals.isLogged = false;
			req.session.destroy();
			res.redirect('/');
		
	}
}

module.exports = controller;