const JsonModel = require("../modelos/jsonModel");
const usersModel = new JsonModel("users"); // lo traigo para buscar el usuario de la cookie

// ************ NavBar - Logout - RememberUser - Middleware a nivel app  ************

function userLoggedMiddleware(req, res, next) {
  //si tengo a alguien en session muestro una parte de la barra de navegación
  //let isLogged = false; // invento esta variable para determinar cuando muestro y cuando no
  res.locals.isLogged = false;
  //IMP! la paso a variable local, para que se puedan compartir entre las vistas, indistintamente del controlador (1)

  // si tengo a alguien en una cookie, quiero buscar a esa persona y loguearlo
  let emailInCookie = req.cookies.userEmail;
  //console.log(emailInCookie);
  let usersFromCookie = usersModel.filtrarPorCampoValor("email", emailInCookie);
  let userFromCookie = usersFromCookie[0];
  //console.log(userFromCookie);
  // Por lo tanto, si encuentro a alguien, lo paso a session! (2)
  if (userFromCookie) {
    req.session.userLogged = userFromCookie
  }

  // (1) Por lo que en el header, puedo hacer un condicional sobre lo que muestro, basado en este booleano
  // y, si tengo alguien en session (2), es porque tengo a alguien logueado, 
  if (req.session.userLogged) {
    // la session se crea una vez que entro al Login, por lo que pregunto si hay alguien logueado
    res.locals.isLogged = true;
    //Por lo que si tengo a alguien logueado se mostrará Mi cuenta y Logout, caso contrario, login y register
    res.locals.userLogged = req.session.userLogged;
    //Arriba estoy pasando lo que tengo en session a las variables locales (de nuevo, para tenerlas disponible en todas las vistas)
  }

  next();
}

module.exports = userLoggedMiddleware;
