const path = require("path");
const express = require("express");
const app = express();

//   Le dice a express dónde están los elementos estáticos
app.use(express.static("public"));

//   Arranca el Servidor
app.listen(3000, () => {
    console.log("Tecnocom e-commerce inició en el puerto 3000");
});

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
