const path = require("path");

// ************ Multer (Para carga de archivos) - Middleware a nivel ruta ************
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = path.join(__dirname, "../../public/images/avatars");
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    console.log(file);
    let imageName = `${Date.now()}_img${path.extname(file.originalname)}`;
    cb(null, imageName);
  },
});
const uploadFile = multer({ storage });

module.exports = uploadFile;
