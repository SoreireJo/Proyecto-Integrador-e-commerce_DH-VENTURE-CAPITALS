const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {
    index: (req, res) => {
        res.render('index');
    },
    login: (req, res) => {
        res.render('login');
    },    
    register: (req, res) => {
        res.render('register');
    }
}
