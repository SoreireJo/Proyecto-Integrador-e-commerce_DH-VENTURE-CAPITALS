const { send } = require('process');
const db = require('../../database/models');
const { Op } = require("sequelize");
const Producto = db.Productos;
const Categoria = db.Categorias;
const Promo = db.Promos;
const Usuario = db.Usuarios;
const { validationResult } = require('express-validator');



const controller = {
    // test api
    Users: (req, res) => {
        let usuariosAll, datos = [];
        let detailPath = "/api/users/";
        let imgPath = "/images/users/";
        Usuario
            .findAll()
            .then((result) => {
                usuariosAll = result;
                // res.send(result);
            })
            .then(() => {
                for (let u = 0; u <  usuariosAll.length; u++) {
                    let {id, nombres, apellidos, email,imagen} = usuariosAll[u], nombre, detalles;
                    nombre = apellidos + ", "+ nombres;
                    detalles = detailPath + id;
                    imagen = imgPath + imagen;
                    datos.push({id, nombre, email,imagen, detalles});
                }
            })
            .then(() => {
                return res.json({
                    total: usuariosAll.length, datos,
                    status: 200
                })
            })
            .catch(error => res.send(error))
    },


   Detail: (req, res) => {
        let usuariosAll, localidadAll, provinciaAll;
        let imgPath = "/images/users/";

        Usuario
            .findByPk(req.params.id)
            .then((result) => {
                usuariosAll = result;
                // res.send(usuariosAll);
            })

            .then(() => {
                let {id, nombres, apellidos, imagen, email, nombreUsuario, telefono, codigoPostal, direccion, dni, localidadId} = usuariosAll, nombre;
                nombre = apellidos + ", "+ nombres;
                imagen = imgPath + imagen;
                
                db.Localidad
                .findByPk(localidadId)
                .then((result) => {
                    localidadAll = result;
                    // res.send(localidadAll);

                    db.Provincia
                    .findByPk(localidadAll.provinciaId)
                    .then((result) => {
                        provinciaAll = result;
                        // res.send(localidadAll);
                    })
                    .then(() => {
                            direccion = direccion + " - " + localidadAll.localidad + " - " + provinciaAll.provincia + " - CP(" + codigoPostal + ")";
    
                            return res.json({
                                id, nombre, nombreUsuario, email, direccion, telefono, dni, imagen,
                                status: 200
                            })
                    })
                })
                .catch(error => res.send(error))
            })
    },
  

}
    
    module.exports = controller;