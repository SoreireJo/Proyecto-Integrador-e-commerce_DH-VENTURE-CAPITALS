const path = require("path");
const express = require("express");
const app = express();
const webRoutes = require('./routes/webRoutes');
const productsRoutes = require('./routes/productsRoutes');
const logMiddleware = require('./middleware/urlMiddleware');

//   Le dice a express dónde están los elementos estáticos
app.use(express.static(path.join(__dirname, '../public')));  
app.use(logMiddleware);

// Importante, ↓ va antes de usar las rutas
// view engine setup
app.set('views', path.join(__dirname, './views/web/'));
app.set('view engine', 'ejs');

app.use('/', webRoutes);
app.use('/products', productsRoutes);

//   Arranca el Servidor
app.listen(3001, () => {
    console.log("Tecnocom e-commerce inició en el puerto 3001");
});
