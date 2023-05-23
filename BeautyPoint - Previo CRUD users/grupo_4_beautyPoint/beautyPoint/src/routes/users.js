const express = require("express");
const router = express.Router();
const guestMiddleware = require("../middlewares/guestMiddleware")
//registro de creaciones
const logDBMiddleware = require("../middlewares/logDBMiddleware");

//validaciones
const registerValidations = require("../middlewares/validationsRegister");

//carga de archivos
const uploadFile = require("../middlewares/multerUsers")

//controlador
const usersController = require("../controllers/usersController.js");

// ************ methods() ************

// Envía el formulario de registro
router.get("/register", guestMiddleware, usersController.register);
//guestMiddleware intercepta a los ya logueados y redirige a Profile

// Procesa el registro
router.post(
  "/register",
  uploadFile.single("image"), logDBMiddleware,
  registerValidations,
  usersController.processRegister
);

// Envía el formulario de login
router.get("/login", guestMiddleware, usersController.login);

// Procesa el login
router.post("/login", usersController.processLogin);

// Perfil de usuario
router.get("/profile/:id", usersController.profile); //, authMiddleware

// Logout
router.get("/logout/", usersController.logout);

module.exports = router;
