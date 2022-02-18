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
    res.sendFile(path.join(__dirname, "./views/web/home.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/web/register.html"));
  });