const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "../logs/logDB.text");

// Para llevar un registro en txt de las creaciones en la base de datos
// Como se ejecuta solo en ciertas rutas, en ellas se requiere, y ejecuta
function logDBMiddleware(req, res, next) {
  fs.appendFileSync(folder, "se creó un registro al ingresar en la página" + req.url);
  next();
}

module.exports = logDBMiddleware;