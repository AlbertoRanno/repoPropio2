// ************ Validaciones para el Formulario de Registro - Middleware a nivel ruta ************
const path = require("path");
const { body } = require("express-validator"); // body() === check()

const registerValidations = [
  body("first_name").notEmpty().withMessage("Tienes que escribir tu nombre"),
  body("last_name").notEmpty().withMessage("Tienes que escribir tu apellido"),
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
    .withMessage("Debes escribir un formato de correo válido"),
  body("phone")
    .notEmpty()
    .withMessage("Tienes que escribir tu número de celular")
    .bail()
    .isNumeric()
    .withMessage("Completar solamente con números"),
  body("genero").notEmpty().withMessage("Debes seleccionar un género"),
  body("birthDate")
    .notEmpty()
    .withMessage("Debes seleccionar tu fecha de nacimiento"),
  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif"];

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
    .isLength({ min: 5, max: 15 })
    .withMessage("La contraseña debe tener entre 5 y 15 caracteres"),
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
];

module.exports = registerValidations;
