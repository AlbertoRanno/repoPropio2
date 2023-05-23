const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "../logs/log.text");

// Para llevar un registro en txt de las URL visitadas - Reemplaza a los console.log
// Como es global, se requiere, y ejecuta en app.js
function logMiddleware(req, res, next) {
  fs.appendFileSync(folder, "se ingresó en la página" + req.url);
  next();
}

module.exports = logMiddleware;
