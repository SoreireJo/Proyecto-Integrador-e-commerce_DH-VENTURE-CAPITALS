const path = require("path");
const express = require("express");
const app = express();

//   Le dice a express dónde están los elementos estáticos
app.use(express.static("public"));

//   Arranca el Servidor
app.listen(3001, () => {
    console.log("Tecnocom e-commerce inició en el puerto 3001");
});

app.get("/", (req, res) => {
    // Va a la Home
    res.sendFile(path.join(__dirname, "./views/web/home.html"));
});

app.get("/product-detail", (req, res) => {
    // Va a la Home
    res.sendFile(path.join(__dirname, "./views/product/product_detail.html"));
});

app.get("/product-create-form", (req, res) => {
    // Va a la Home
    res.sendFile(path.join(__dirname, "./views/product/product-create-form.html"));
});