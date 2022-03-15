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
app.listen(3000, () => {
    console.log("Tecnocom e-commerce inició en el puerto 3000");
});
