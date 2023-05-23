function guestMiddleware(req, res, next) {
  if (req.session.userLogged) {
    //si hay alguien logueado, que no vaya a register, o login
    return res.redirect("users/profile");
  }
  next(); // si no hay nadie logueado, sigue al controlador de register o login
}

module.exports = guestMiddleware;
