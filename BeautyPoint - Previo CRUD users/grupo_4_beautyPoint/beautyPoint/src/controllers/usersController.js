const JsonModel = require("../modelos/jsonModel");
const usersModel = new JsonModel("users");
const { validationResult } = require("express-validator"); // trae el resultados de las validaciones que hicimos
const bcrypt = require("bcryptjs");
const db = require("../database/models");

const usersController = {
  register: (req, res) => {
    console.log("entrando al método register del userController.js");
    return res.status(200).render("users/register");
  },     
  processRegister: (req, res) => {
    const resultValidation = validationResult(req); // esta variable es un objeto con varias propiedades, una de ellas es is Empty
    //res.send(resultValidation);
    //res.send(resultValidation.mapped());
    //res.send(resultValidation.errors.length > 0)
    //Antes de hacer la creación, verificar que el usuario no haya sido cargado previamente:
    db.User.findAll({
    }) //{include: [{ association: "productosU" }] para no hacerlo pesada}
      .then(function (usuarios) {
        for (let i = 0; i < usuarios.length; i++) {
          if (usuarios[i].email === req.body.email) {
            return res.status(200).render("users/register", {
              errors: {
                email: { msg: "Un usuario ya se registró con este mail" },
              },
              oldData: req.body,
            });
      
        
        } else if (resultValidation.isEmpty()) {
          console.log("Entró al método processRegister del usersController.js");
          console.log(req.file);
          //Ahora piso las propiedades password e image:
          (req.body.password = bcrypt.hashSync(req.body.password, 10)), // encripto password con la librería bcryptjs
            //el ", 10" es la cantidad de "sal", un dato añadido que hace que los hash sean mucho más difíciles de romper. Para contraseñas se suele usar 10 o 12
            (req.body.image = "/images/avatars/" + req.file.filename);

          db.User.create({
            //1ro nombre de las columnas BBDD, igual que en el modelo. 2do nombre del campo del formulario
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            dni: req.body.dni,
            email: req.body.email,
            phone: req.body.phone,
            categoria: 1, // 0-Admin / 1-Comprador
            avatar: req.body.image,
            password: req.body.password,
            status: 1,
          });
           res.send("ok");
        } else {
          //resultValidation es un objeto lit. con la prop. errors, hay elementos en errors?
          res.render("users/register", {
            errors: resultValidation.mapped(), // envío los errores como un obj. lit. para que sea + facil trabajarlo
            oldData: req.body, // envío los datos anteriores a la vista, para que no tengan que volver a cargar todo
          });
        }}
       });

    //return res.send("Ok, las validaciones se pasaron, no hay errores");
  },
  login: (req, res) => {
    console.log(req.cookies); //obj. lit. "cookies" - trae todas las cookies del navegador
    return res.status(200).render("users/login");
  },
  processLogin: (req, res) => {
    let usersToLogin = usersModel.filtrarPorCampoValor("email", req.body.email);
    //devuelve el objeto usuario a loguearse, dentro de un array
    let userToLogin = usersToLogin[0];
    //devuelve el objeto usuario en sí

    if (userToLogin) {
      // si el mail existe en mi base de datos, compara las contraseñas
      let isOkThePassword = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );

      if (isOkThePassword) {
        // si el password tmb está ok, permite el ingreso
        //quiero guardar al usuario en session. Pero no me interesa, y es más seguro, eliminar antes el password.
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        //ahora el obj session, tiene otra propiedad: userLogged (además de cookie), que guarda toda la info de userToLogin

        //cuando ya tengo los datos de la persona a loguear, pregunto si tmb viajó el rememberUser:
        if (req.body.rememberUser) {
          // si viajó, quiero que la cookie se llame userEmail y guarde el email, * 1 seg * 60 * 60 = 1 hora
          res.cookie("userEmail", req.body.email, {
            maxAge: 1000 * 60 * 60,
          });
        }

        return res.redirect("/users/profile/" + userToLogin.id);
      }
      return res.render("users/login", {
        // si el password no está ok
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
    }

    return res.render("users/login", {
      // si el mail no está ok
      errors: {
        email: {
          msg: "No se encuentra este email en nuestra base de datos",
        },
      },
    });
  },
  profile: (req, res) => {
    console.log("Entrando a Profile");
    console.log(req.session);
    console.log(req.cookies.userEmail); // si, No tildé recordar, saldrá undefined, porque no se grabó niguna cookie
    //si tildó recordar, veré el mail con el que se logueó, el cual usaré para loguear a la persona automáticamente
    res.render("users/profile", {
      user: req.session.userLogged, // le comparto la info a la vista
    });
  },
  logout: (req, res) => {
    res.clearCookie("userEmail"); // borra la cookie, sino, mientras dure esta, estoy en un bucle, y no puedo desloguearme
    req.session.destroy(); // directamente borra todo lo que está en session
    console.log(req.session);
    return res.redirect("/");
  },
};

module.exports = usersController;
