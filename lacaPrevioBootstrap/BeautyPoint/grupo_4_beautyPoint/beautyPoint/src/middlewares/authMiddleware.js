function authMiddleware(req, res, next) {
  if (!req.session.userLogged) {
    //si NO hay nadie logueado, que vaya al login
    return res.redirect("users/login");
  }
  next(); // si hay alguien logueado, sigue al controlador 
}

module.exports = authMiddleware;
