const db = require("../database/models");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {

  // index - Render del listado de productos
  index: (req, res) => {
    console.log("entrando al render de index");
    db.Category.findAll({
      include: [
        {
          association: "productosC",
        },
      ],
    }).then(function (categories) {
      res.status(200).render("index", { categories: categories, toThousand });
    });
  },

  // search - buscador de la barra del header
  search: (req, res) => {
    let loQueBuscoElUsuario = req.query.keywords.toLowerCase();
    //console.log(loQueBuscoElUsuario);
    let productsResults = [];
    db.Product.findAll({
      include: [{ association: "categories" }, { association: "packages" }],
    }).then(function (products) {
      for (let i = 0; i < products.length; i++) {
        //console.log("entró al FOR");
        if (products[i].name.toLowerCase().includes(loQueBuscoElUsuario)) {
          productsResults.push(products[i]);
        }
      }
      return res.status(200).render("results", {
        productsResults,
        toThousand,
      });
    });
  },
};

module.exports = mainController;
