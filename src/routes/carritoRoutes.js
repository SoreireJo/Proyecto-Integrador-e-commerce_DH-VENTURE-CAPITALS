var express = require('express');
var router = express.Router();
//Aquí llamo al middleware de autenticación. De esta forma aseguro que sólo el usuario logueado pueda ingresar productos al carrito de compras
const authMiddleware = require('../middleware/authMiddleware');

//Aqui incorporo el middleware que se encarga de validar que la cantidad de productos a incluir al carrito no sea cero
const validador = require('../middleware/validador');


// ************ Controller Require ************
const carritoController = require('../controllers/carritoController');

router.get('/addItem/:id', authMiddleware, /*validador.addCart,*/ carritoController.addCart);
 router.get('/', authMiddleware, carritoController.cart);
router.post('/deleteItem', authMiddleware, carritoController.deleteCart);
router.post('/compra', authMiddleware, carritoController.shop);
/*router.get('/carrito/historialCompra', authMiddleware, carritoController.history);
router.get('/carrito/detalleCompra/:id', authMiddleware, carritoController.buyDetail); */

module.exports = router;

