const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    userLogin: (req, res) => {
        res.render('./users/userLogin', {users});
    },    

    userRegister: (req, res) => {
        res.render('./users/userRegister', {users});
    },

	store: (req, res) => {
		let errores =  validationResult(req);
		let image = req.file ? req.file.filename : 
			(req.params.tac != '-1') ? req.params.tac : "default-image.png";
		if (!errores.isEmpty()) {
			return res.render ('./users/userRegister', {
				errores: errores.array(),
				old: req.body,
				image
			});
		}
		let newUser = {
			id: users[users.length - 1].id + 1,
			...req.body,
			image: image,
		};
		users.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		res.redirect('/');
	}
}

module.exports = controller;