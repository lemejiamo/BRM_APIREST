const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

//instancias
const app = express();


//configurando la app
app.set('port', process.env.PORT ||3000); // configuracion del puerto
app.set('views', path.join(__dirname, 'views')); // configuracion de la carpeta de vistas

//configuracion del motor de vistas
app.engine('.hbs', exphbs.create({
    defaultLayout: 'main', //layout por defecto
    layuotsDir: path.join(__dirname, 'views/layouts'), //directorio donde se almacenan los layouts
    partialsDir: path.join(__dirname, 'views/partials'), // directorio de fragmentos
    extname: '.hbs' // especifica la extencion de los layouts
}).engine);
app.set('view engine', '.hbs'); // configuracion del motor de vistas

//middlewares
app.use(express.urlencoded({extends: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


//api routes
app.use(require('./api/routes/index'));
app.use(require('./api/routes/users'));
app.use(require('./api/routes/products'));

//static FIles
app.use(express.static(path.join(__dirname, 'public')));

//Server listener
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
} );