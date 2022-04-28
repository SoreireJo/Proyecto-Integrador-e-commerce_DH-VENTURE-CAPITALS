// ********* Require's ***********
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE
// ***** Yo Cargando Middlewares ******
const logMiddleware = require('./middleware/userLogs');


// ******** express() ***********
const app = express();

// ******** Elementos estáticos ***********
app.use(express.static(path.join(__dirname, '../public')));  

// ******** Usando Middlewares ***********
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE
// ***** Yo Usando Middlewares ******
app.use(logMiddleware);

// ********* Template Engine *********
// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs')


// ******* Route System require and use() *******

const webRouter = require('./routes/webRoutes'); // Rutas web
const usersRouter = require('./routes/usersRoutes'); // Rutas users
const productsRouter = require('./routes/productsRoutes'); // Rutas products */

app.use('/', webRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);


// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.path = req.path;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;



// ************ Método viejo ****************
/*
//   Arranca el Servidor
app.listen(3000, () => {
    console.log("Tecnocom e-commerce inició en el puerto 3000");
});
*/

/* 
app.get("/", (req, res) => {
    // Va a la Home
    res.sendFile(path.join(__dirname, "./views/web/index.html"));
});
*/
