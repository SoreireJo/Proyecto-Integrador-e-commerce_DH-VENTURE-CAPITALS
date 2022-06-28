const path = require('path');
const {validationResult} = require('express-validator');

const db = require('../database/models');
const User = db.Usuarios;
const Producto = db.Productos;
const Item = db.Items;
const Compras = db.Compras;


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    addCart: (req,res) =>{
        const errores = validationResult(req);
        
        if(errores.isEmpty()){
            //Debemos buscar el producto por el id
            Producto.findByPk(req.params.id, { include: ["categorias", "promos"] })
			.then((product) => {
                let price = product.descuento >0 ?
                Number(product.precio) * ((100 - product.descuento)/100) : Number(product.precio)

                  //Crear mi items
                 return Item.create({
                    precio : price,
                    cantidad : 1,
                    subtotal : 1 * price,
                    estado: 1,
                    userId: req.session.usuario.id,
                    productId: Number(product.id),
                    cartId: null
                     
                }) 
                .then(item  =>
                    res.redirect('/carrito'))
                .catch(error => console.log(error)) 
                
                //return res.send(product)
				//res.render('./products/detail.ejs/', { product, toThousand })
			})           
        }else{
            Producto.findByPk(req.params.id,{
                include: ["categorias", "promos"]
            })
            .then(producto =>{
                res.render(path.resolve(__dirname, '..','views','productos','detail'), {producto, errores: errores.mapped()});
            })
        }
    },
    cart : (req,res) =>{
        Item.findAll({
            where : {
                estado: 1,
                userId : req.session.usuario.id
            }, 
            include: {
                all: true
            }
        })        
        .then((items)=>{
            //return res.send(items)
            let total = items.reduce((total,item)=> (total = total + Number(item.subtotal)),0)
            res.render('./carrito/carrito', {cartProducto:items, total  } );
           
         })

    },
   deleteCart: (req,res) =>{
        Item.destroy({
            where: {
                productId : req.body.id,
                userId : req.session.usuario.id
            }
        })
        .then(()=> res.redirect('/carrito'))
        .catch(error => console.log(error))
    },
    shop : (req,res)=>{
        let totalPrecio = 0;
        Item.findAll({
            where:{
                userId: req.session.usuario.id,
                estado: 1
            }
        })
        .then((items)=>{
            totalPrecio = items.reduce((total,item)=> (total = total + Number(item.subtotal)),0)
        })
        Compras.findOne({
            order: [['fechaCreacion','DESC']]
        })
        .then((compra)=>{
            return Compras.create({
                nroCompra: compra ? compra.nroCompra + 1 : 1,
                total: totalPrecio,
                usuarioId: req.session.usuario.id
            })
        })
        .then(compra =>{
            Item.update({
                estado: 0,
                compraId: compra.id
            },{
                where: {
                    userId: req.session.usuario.id,
                    estado: 1,
                }
            }
            )
        })
        .then(()=> res.render('./carrito/compraExitosa' ))
        .catch(error => console.log(error))
    },
     /* history : (req,res) =>{
        Cart.findAll({
            where: {
                userId : req.session.usuario.id
            },
            include: {
                all: true,
                nested: true
            }
        })
        .then(carts =>{
            res.render(path.resolve(__dirname, '..','views','carrito','historialCompra'), {carts } );           
        })
    },
    buyDetail : (req,res) =>{
        Cart.findByPk(req.params.id, {
            include : {
                all: true,
                nested: true
            }
        })
        .then((cart) =>{
            res.render(path.resolve(__dirname, '..','views','carrito','detalleCompra'), {cart } );
        })
    }*/

 
}