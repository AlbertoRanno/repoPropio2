// ************ Require's ************
const express = require('express');
//const path = require("path");
const methodOverride = require('method-override'); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
const logMiddleware = require('./middlewares/logMiddleware');
const session = require('express-session'); // Obj. Lit. que vive en el req (req.sesion), que cruza toda la app. Desde él puedo
// acceder a todo lo que tenga en el request. Muere al cerrar el navegador
const cookies = require('cookie-parser'); // Para guardar del lado del cliente - por navegador (lo que guarda en chrome, no lo tendrá Firefox)
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
// ************ Sequelize ************
const { Sequelize } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// ************ express() ************
const app = express();

// ************ Middlewares a Nivel Aplicación (sin importar la ruta a la que ingresen) ************
//la petición tiene que cumplir con estos, antes de que el servidor la derive a la ruta correspondiente
//IMP! El orden de ponerlos es el orden en que se ejecutarán!
//app.use() hace referencia a que toda la app usará ese middleware
app.use(express.static('public')); // Configuración de carpeta de archivos estáticos
app.use(express.urlencoded({ extended: false })); // Para capturar datos desde un formulario como un obj literal (req.body)
app.use(express.json()); // Para que en el body puedan viajar datos en formato JSON
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(logMiddleware); // Para llevar un registro en txt de las URL visitadas - Reemplaza a los console.log
app.use(
  session({
    secret:
      'texto único aleatorio para identificar nuestro sitio web y evitar que otras páginas usen lo que guardamos en session',
    //tendría que ir cifrada (googlear)
    resave: false, //ambos en false según google e integrador clase 26
    saveUninitialized: false, //https://github.com/expressjs/session#options
  })
); // Para evitar que otras páginas web utilicen la información que guardamos en la PC del usuario
app.use(cookies()); //va a permitir trabajar en req y res con otro objeto literal
app.use(userLoggedMiddleware); // no se ejecutan, porque al no recibir parámetros, se ejecutan cuando lo necesiten
app.use(function (req, res, next) {
  req.session.cart = req.session.cart || [];
  res.locals.cart = req.session.cart;
  next();
});
//************ Mantenimiento ************
let enMantenimiento = false; // Pasar a true para poner en modo "Página en Mantenimiento"
if (enMantenimiento == true) {
  app.use((req, res, next) => {
    res.send('Momentáneamente esta página está en Mantenimiento'); // Se podría crear una vista para esto
    next();
  });
}

// ************ Template Engine ************
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Define la ubicación de la carpeta de las Vistas

// ************ Route System ************
//ruteos
const rutasMain = require('./routes/main.js');
const rutasProducts = require('./routes/products.js');
const rutasUsers = require('./routes/users.js');
const rutasApi = require('./routes/api.js');

//configuración de ruteo
app.use('/products', rutasProducts);
app.use('/users', rutasUsers);
app.use('/api', rutasApi);
app.use('/', rutasMain);

// ************ Middleware Error 404 - Siempre último! ************
//Se ejecuta en caso de que una ruta no exista
app.use((req, res, next) => {
  res.status(404).render('not-found');
  next();
});

// Server escuchando
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
