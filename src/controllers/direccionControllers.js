const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const  Pais = db.Paises;

const direccionController = {
    'pais': (req, res)=>{
        Pais.findAll()
        .then((resultados)=>{
            res.send(resultados)
        })
    }
}

module.exports = direccionController; 