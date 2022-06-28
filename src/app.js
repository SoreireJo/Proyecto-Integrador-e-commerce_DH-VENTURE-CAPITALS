// ********* Require's ***********
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE
const session = require('express-session');
// ***** Yo Cargando Middlewares ******
const logMiddleware = require('./middleware/userLogs');
const userLoggedMiddleware = require('./middleware/userLoggedMiddleware');
const navbarMiddleware = require('./middleware/navbarMiddleware');


// ******** express() ***********
const app = express();

// ******** Elementos estáticos ***********
app.use(express.static(path.join(__dirname, '../public')));  
// ********* Template Engine *********
// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// ******** Usando Middlewares ***********
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE


// ***** Yo Usando Middlewares ******
app.use(navbarMiddleware)
app.use(session({
    secret: "session secret",
    resave: false,
    saveUninitialized: false
}));

app.use(userLoggedMiddleware)



// ******* Route System require and use() *******
const webRouter = require('./routes/webRoutes'); // Rutas web
const usersRouter = require('./routes/usersRoutes'); // Rutas users
const productsRouter = require('./routes/productsRoutes'); // Rutas products */
// const carritoRoutes = require("./routes/carritoRoutes"); // Rutas para el carrito
const apRouter = require('./routes/api/products'); // Rutas Apis */
const auRouter = require('./routes/api/users')
app.use('/', webRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
// app.use("/carrito", carritoRoutes);
app.use('/api',apRouter);
app.use('/api',auRouter);

// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.path = req.path;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500 || 404);
    res.render('error');
   
});

// ************ exports app - dont'touch ************
module.exports = app;