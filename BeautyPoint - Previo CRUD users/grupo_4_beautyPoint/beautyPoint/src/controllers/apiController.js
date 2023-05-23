const db = require("../database/models");
const { Sequelize } = require("sequelize");
const { response } = require("express");
const Op = db.Sequelize.Op;
const fetch = require("node-fetch"); //Permite consumir APIs de 3ros

const apiController = {
  /* ************************************* USUARIOS */
  listarUsuarios: (req, res) => {
    // /api/users/
    console.log("entrando al método listarUsuarios del apiController.js");

    db.User.findAll({
      attributes: [
        "id",
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("last_name"),
            " , ",
            Sequelize.col("first_name")
          ),
          "name",
        ],
        "email",
        [
          Sequelize.fn("CONCAT", "/api/users/", Sequelize.col("User.id")),
          "detail",
        ],
      ],
    })
      .then((users) => {
        console.log(users);
        res.status(200).json({
          //envío info en formato JSON
          count: users.length,
          data: users,
          status: 200,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  mostrarDetalleDeUsuario: (req, res) => {
    // /api/users/:id
    console.log(
      "entrando al método mostrarDetalleDeUsuario del apiController.js"
    );
    db.User.findByPk(req.params.id, {
      attributes: [
        "id",
        [
          Sequelize.fn(
            "CONCAT",
            Sequelize.col("last_name"),
            " , ",
            Sequelize.col("first_name")
          ),
          "name",
        ],
        "dni",
        "email",
        "avatar",
      ],
    })
      .then((usuario) => {
        res.status(200).json({ data: usuario, status: 200 });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  /* ************************************* PRODUCTOS */
  listarProductos: (req, res) => {
    // api/products/
    console.log("entrando al método listarProductos del apiController.js");

    let promesaCategorias = db.Category.findAll({
      include: [{ association: "productosC", attributes: [] }],
      attributes: [
        "description",
        [
          Sequelize.fn("COUNT", Sequelize.col("category.id")),
          "totalDeProductos",
        ],
      ],
      group: "category.id",
    });

    let promesaProductos = db.Product.findAll({
      include: [
        { association: "categories", attributes: ["id", "description"] },
      ],
      attributes: [
        "id",
        "name",
        "description",
        [
          Sequelize.fn("CONCAT", "/api/products/", Sequelize.col("product.id")),
          "detail",
        ],
      ],
    });

    Promise.all([promesaCategorias, promesaProductos])
      .then(function ([categorias, productos]) {
        res.status(200).json({
          count: productos.length,
          countByCategory: categorias,
          data: productos,
          status: 200,
        });
      })
      .catch((err) => {
        res.send(err);
      });

    // Versión tranqui... sin la magia para resolver el countByCategory
    // db.Product.findAll({
    //   include: [
    //     { association: 'categories', attributes: ['id', 'description'] },
    //   ],
    //   attributes: [
    //     'id',
    //     'name',
    //     'description',
    //     [
    //       Sequelize.fn('CONCAT', '/api/products/', Sequelize.col('product.id')),
    //       'detail',
    //     ],
    //   ],
    // })
    //   .then((productos) => {
    //     res.status(200).json({
    //       count: productos.length,
    //       // countByCategory: ,
    //       data: productos,
    //       status: 200,
    //     });
    //   })
    //   .catch((err) => {
    //     res.send(err);
    //   });
  },
  mostrarDetalleDeProducto: (req, res) => {
    // /api/products/:id
    console.log(
      "entrando al método mostrarDetalleDeProducto del apiController.js"
    );
    db.Product.findByPk(req.params.id, {
      include: [
        { association: "categories", attributes: ["description"] },
        { association: "packages", attributes: ["description"] },
      ],
      attributes: [
        "id",
        "name",
        "price",
        "description",
        "discount",
        "image",
        "stock",
      ],
    })
      .then((producto) => {
        res.status(200).json({ data: producto, status: 200 });
      })
      .catch((err) => {
        res.send(err);
      });
  },

  //Pruebas
  store: (req, res) => {
    db.Product.create(req.body).then((producto) => {
      return res.status(200).json({
        data: producto,
        status: 200,
        created: "ok",
      });
    });
  },

  delete: (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
    });
  },

  search: (req, res) => {
    db.Product.findAll({
      where: {
        name: { [Op.like]: "%" + req.query.keyword + "%" },
      },
    }).then((productos) => {
      if (productos.length > 0) {
        return res.status(200).json(productos);
      }
      return res.status(200).json("No existen productos con ese nombre");
    });
  },
  consumirAPI: async (req, res) => {
    //realizo un pedido asincrónico, y fetch es un método que tiene 2 promesas:
    //la 1era, es la consulta al endpoint - entre los ( ), paso la URL de la API que quiero cosumir
    fetch("http://www.omdbapi.com/?apikey=d4e35e92&t=Doctor+Strange")
      //la 2da, es la promesa que devuelve ese endpoint, que aún se tiene que resolver - y pido que la entregue en formato JSON
      .then((response) => response.json())
      //una vez se resuelva esta promesa, voy a obtener la info
      .then((pelicula) => {
        //a partir de aquí es donde puedo trabajar con lo que me llega de la API
        //return res.json(pelicula) - si quisiera enviar a un endpoint la info de la API
        //si quiero enviarla a una vista:
        return res.render("api.ejs", { pelicula: pelicula });
      });
  },
  consumirDosAPIs: async (req, res) => {
    //cuando consumo más de una API, defino las promesas por separado 
    //En cada caso, le estoy diciendo: de manera asincrónica, quiero que leas estas líneas de código y que esperes,
    //a que el .then se resuelva, y que guardes, lo que devuelva, en cada variable correspondiente
    let pelicula = await fetch("http://www.omdbapi.com/?apikey=d4e35e92&t=Doctor+Strange")
      .then((response) => response.json())
    let provinces = await fetch("https://apis.datos.gob.ar/georef/api/provincias")
      .then((response) => response.json())

   // return res.json({pelicula, provincias})
   return res.render("apiDos.ejs", {
     pelicula: pelicula,
     provinces: provinces,
   });
  },
    
};

module.exports = apiController;
