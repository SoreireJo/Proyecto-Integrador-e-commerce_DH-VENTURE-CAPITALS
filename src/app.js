// ********* Require's ***********
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override');
const logMiddleware = require('./middleware/urlMiddleware');

// ******** express() ***********
const app = express();

// ******** Elementos estáticos ***********
app.use(express.static(path.join(__dirname, '../public')));  


// ******** Usando Middlewares ***********
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(logMiddleware);

// ********* Template Engine *********
// view engine setup
app.set('views', path.join(__dirname, './views/web'));
app.set('view engine', 'ejs')


// ******* Route System require and use() *******
const webRoutes = require('./routes/webRoutes');
const productsRoutes = require('./routes/productsRoutes');

app.use('/', webRoutes);
app.use('/products', productsRoutes);


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

// ********** exports app ************
module.exports = app;

