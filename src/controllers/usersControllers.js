const fs = require('fs');
const path = require('path');

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
		let newUser = {
			id: users[users.length - 1].id + 1,
			...req.body,
			image: req.file.filename
		};
		users.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		res.redirect('/');
	}
}

module.exports = controller;