const path = require("path");
const express = require("express");
const app = express();
const webRoutes = require('./routes/webRoutes');

//   Le dice a express dónde están los elementos estáticos
app.use(express.static("public"));

// Importante, ↓ va antes de usar las rutas
// view engine setup
app.set('views', path.join(__dirname, './views/web/'));
app.set('view engine', 'ejs')

app.use('/', webRoutes);

//   Arranca el Servidor
app.listen(3001, () => {
    console.log("Tecnocom e-commerce inició en el puerto 3001");
});

/* 

app.get("/", (req, res) => {
    // Va a la Home
    res.sendFile(path.join(__dirname, "./views/web/index.html"));
});

app.get("/login", (req, res) => {
    // Login
    res.sendFile(path.join(__dirname, "./views/web/login.html"));
});

app.get("/register", (req, res) => {
    // Registro
    res.sendFile(path.join(__dirname, "./views/web/register.html"));
});

app.get("/product", (req, res) => {
    // Detalle de Producto
    res.sendFile(path.join(__dirname, "./views/web/productDetail.html"));
});

app.get("/product_cart", (req, res) => {
    // Carrito de Compras
    res.sendFile(path.join(__dirname, "./views/web/productCart.html"));
});

*/

app.get("/product-detail", (req, res) => {
    // Va a la Home
    res.sendFile(path.join(__dirname, "./views/product/product_detail.html"));
});

app.get("/product-create-form", (req, res) => {
    // Va a la Home
    res.sendFile(path.join(__dirname, "./views/product/product-create-form.html"));
});

