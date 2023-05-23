const express = require("express");
const router = express.Router();
const guestMiddleware = require("../middlewares/guestMiddleware");

//Para las validaciones de la edición de datos personales
const registerValidations = require("../middlewares/registerValidations"); // Para el registro, no pude levantar los usuarios directamente en el middleware

//Para las validaciones del registro
const db = require("../database/models");
const path = require("path");
const { body } = require("express-validator");

//Para las validaciones del login
const loginValidations = require("../middlewares/loginValidations"); // - validaciones desde el controlador

//registro de creaciones
const logDBMiddleware = require("../middlewares/logDBMiddleware");

//carga de archivos
const uploadFile = require("../middlewares/multerUsers");

//controlador
const usersController = require("../controllers/usersController.js");

// ************ methods() ************

// Envía el formulario de registro
router.get("/register", guestMiddleware, usersController.register);
//guestMiddleware intercepta a los ya logueados y redirige a Profile

// Procesa el registro
db.User.findAll()
  .then((users) => {
    router.post(
      "/register",
      uploadFile.single("image"),
      logDBMiddleware,
      [
        body("first_name")
          .notEmpty()
          .withMessage("Tienes que escribir tu nombre")
          .bail() // si no se corta la validación el usuario recibirá todos los errores juntos
          .isLength({ min: 2 })
          .withMessage("El nombre debe tener al menos 2 caracteres"),
        body("last_name")
          .notEmpty()
          .withMessage("Tienes que escribir tu apellido")
          .bail()
          .isLength({ min: 2 })
          .withMessage("El apellido debe tener al menos 2 caracteres"),
        body("dni")
          .notEmpty()
          .withMessage("Tienes que escribir tu DNI")
          .bail()
          .isNumeric()
          .withMessage("Completar solamente con números"),
        body("email")
          .notEmpty()
          .withMessage("Tienes que escribir tu correo electrónico")
          .bail()
          .isEmail()
          .withMessage("Debes escribir un formato de correo válido")
          //Aquí valido si el usuario existe o no en la tabla de usuarios Por el campo email)
          .custom(function (value) {
            let contador = 0;
            for (let i = 0; i < users.length; i++) {
              if (users[i].email == value) {
                contador++;
              }
            }
            if (contador > 0) {
              return false; // Si retorno falso no aparece el mensaje de error
            } else {
              return true; //Si retorno true, aparece el mensaje de error
            }
          })
          .withMessage("Usuario ya se encuentra registrado"),
        body("phone")
          .notEmpty()
          .withMessage("Tienes que escribir tu número de celular")
          .bail()
          .isNumeric()
          .withMessage("Completar solamente con números"),
        body("image").custom((value, { req }) => {
          let file = req.file;
          let acceptedExtensions = [".jpg", "jpeg", ".png", ".gif"];

          if (!file) {
            throw new Error("Tienes que subir una imagen");
          } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
              throw new Error(
                "Las extensiones de archivos permitidas son " +
                  acceptedExtensions.join(", ")
              );
            }
          }
          return true;
        }),
        body("password")
          .notEmpty()
          .withMessage("Tienes que escribir una contraseña")
          .bail() // si no se corta la validación el usuario recibirá todos los errores juntos
          .isLength({ min: 8, max: 15 })
          .withMessage("La contraseña debe tener entre 8 y 15 caracteres"),
        body("repeatPassword")
          .notEmpty()
          .withMessage("Tienes que repetir la contraseña elegida")
          .bail()
          .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error("Las contraseñas no coinciden");
            }
            return true;
          }),
      ],
      usersController.processRegister
    );
  })
  .catch((error) => console.log(error)); //, registerValidations

// Envía el formulario de login
router.get("/login", guestMiddleware, usersController.login);

// Procesa el login
router.post("/login", loginValidations, usersController.processLogin); //, loginValidations

// Perfil de usuario
router.get("/profile/:id", usersController.profile); //, authMiddleware

/*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", usersController.uEdit);
router.put("/edit/:id", uploadFile.single("image"),registerValidations, usersController.uUpdate);

// Logout
router.get("/logout/", usersController.logout);

module.exports = router;
