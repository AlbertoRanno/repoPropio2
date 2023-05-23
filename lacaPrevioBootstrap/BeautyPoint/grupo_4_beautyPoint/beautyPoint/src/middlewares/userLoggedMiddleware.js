/*Este middleware, a nivel app, determinará, a lo que tenga acceso cada usuario que se loguee correctamente(Que parte 
  de la NavBar - Logout - RememberUser). Recordar que, en dicho caso, del processLogin, viajará req.session.userLogged.*/

const db = require("../database/models");

function userLoggedMiddleware(req, res, next) {
  /* let isLogged = false; - invento esta variable para determinar cuando muestro los distintos sectores y cuando no.
  IMP! la paso a la variable "local" (variable super global en la que puedo almacenar datos), para que se puedan 
  compartir entre las vistas. Dado que las vistas no entienden req.session.usserLogged */

  res.locals.isLogged = false;

  /*si el usuario pasó las validaciones del processLogin, lo logueo, es decir, viajó req.session.userLogged, 
  y paso estos datos a locals */
  if (req.session.userLogged) {
  /* si tengo a alguien en session, isLogged se vuelve true, y se mostrará el Perfil,el logout.. sino el register, login.. */
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
    return next();
  /* pero tmb, si tengo a alguien en una cookie, debería loguearlo, entonces busco a esa persona a partir del mail 
  guardado la cookie */
  } else if (req.cookies.email) {
    db.User.findOne({
      where: {
        email: req.cookies.email,
      },
    }).then((user) => {
  /* una vez lo encuentre, será guardado en session -logueado-. y también paso sus datos a locals */
      res.locals.isLogged = true;
      req.session.userLogged = user;
      res.locals.userLogged = user;
      return next();
    });
  } else {
    return next();
  }
}

module.exports = userLoggedMiddleware;
