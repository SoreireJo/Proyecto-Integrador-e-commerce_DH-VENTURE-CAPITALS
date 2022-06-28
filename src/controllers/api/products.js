const { send } = require('process');
const db = require('../../database/models');
const { Op } = require("sequelize");
const Producto = db.Productos;
const Categoria = db.Categorias;
const Localidad = db.Localidad
const Provincia = db.Provincia
const Promo = db.Promos;
const Usuario = db.Usuarios;
const { validationResult } = require('express-validator');



const controller = {

    List: (req, res) => {
        let totalPorCategoria = [], productosAll, categoriasAll, categoria, total, u, datos = [];
        let detailPath = "/api/products/";
        let imgPath = "/images/products/";
      
        Producto
            .findAll()
            .then((result) => {
                productosAll = result;
      
                Categoria
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
                        let {id, nombre,precio,imagen, descripcion} = productosAll[u], categoria, detalles;
                        categoria = categoriasAll.filter(categoriasAll => categoriasAll.id == productosAll[u].categoriaId);
                        detalles = detailPath + id;
                        imagen = imgPath + imagen;
                        datos.push({id, nombre, precio, descripcion, imagen, categoria, detalles});
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
 Detail: (req, res) => {
        let productosAll, categoriasAll, promosAll;
        let imgPath = "/images/products/";

        Producto
            .findByPk(req.params.id)
            .then((result) => {
                productosAll = result;

                Categoria
                    .findByPk(productosAll.categoriaId)
                    .then((result) => {
                        categoriasAll = result;
                    })
                    .then(() => {

                        Promo
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
            }).catch(error => res.send(error))
    }



    }
    
    module.exports = controller;