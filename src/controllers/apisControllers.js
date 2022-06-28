const { send } = require('process');
const reMix = require('../modules/reSort');
const db = require('../database/models');

const controller = {

    // Api Users - Expose all users
    Users: (req, res) => {
        let usuariosAll, datos = [];
        let detailPath = "http://localhost:3000/api/users/";

        db.Usuarios
            .findAll()
            .then((result) => {
                usuariosAll = result;
                // res.send(result);
            })
            .then(() => {
                for (let u = 0; u <  usuariosAll.length; u++) {
                    let {id, nombres, apellidos, email} = usuariosAll[u], nombre, detalles;
                    nombre = apellidos + ", "+ nombres;
                    detalles = detailPath + id;
                    datos.push({id, nombre, email, detalles});
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

    // Api Users - Expose all users
    UserDetail: (req, res) => {
        let usuariosAll, localidadAll, provinciaAll;
        let imgPath = "http://localhost:3000/images/users/";

        db.Usuarios
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

    // Api Products - Expose all products
    Products: (req, res) => {
        let totalPorCategoria = [], productosAll, categoriasAll, categoria, total, u, datos = [];
        let detailPath = "http://localhost:3000/api/products/";

        db.Productos
            .findAll()
            .then((result) => {
                productosAll = result;

                db.Categorias
                .findAll()
                .then((result) => {
                    categoriasAll = result;
                })
                .then(() => {
                    for (u = 0; u <  categoriasAll.length; u++) {
                        categoria = categoriasAll[u].nombre;
                        total = (productosAll.filter(productosAll => productosAll.categoriaId == categoriasAll[u].id).length);
                        totalPorCategoria.push({categoria, total});
                    }
                })
                .then(() => {
                    for (u = 0; u <  productosAll.length; u++) {
                        let {id, nombre, descripcion} = productosAll[u], categoria, detalles;
                        categoria = categoriasAll.filter(categoriasAll => categoriasAll.id == productosAll[u].categoriaId);
                        detalles = detailPath + id;
                        datos.push({id, nombre, descripcion, categoria, detalles});
                    }
                })
                .then(() => {
                    return res.json({
                        total: productosAll.length, totalPorCategoria, datos,
                        status: 200
                    })
                })
            })
            .catch(error => res.send(error))
    },

    // Api Product Detail - Show one product
    ProductDetail: (req, res) => {
        let productosAll, categoriasAll, promosAll;
        let imgPath = "http://localhost:3000/images/products/";

        db.Productos
            .findByPk(req.params.id)
            .then((result) => {
                productosAll = result;

                db.Categorias
                    .findByPk(productosAll.categoriaId)
                    .then((result) => {
                        categoriasAll = result;
                    })
                    .then(() => {

                        db.Promos
                            .findByPk(productosAll.promoId)
                            .then((result) => {
                                promosAll = result;
                            })

                            .then(() => {
                                let {id, nombre, descripcion, precio, stock, imagen, descuento} = productosAll;
                                imagen = imgPath + imagen;
                                return res.json({
                                    id, nombre, descripcion, precio, stock, descuento, categoria: categoriasAll, promo: promosAll, imagen,
                                    status: 200
                                })
                            })
                    })
            })
            .catch(error => res.send(error))
    }
};

module.exports = controller;