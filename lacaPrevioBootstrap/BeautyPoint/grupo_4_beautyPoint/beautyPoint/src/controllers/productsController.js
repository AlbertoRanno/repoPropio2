const JsonModel = require("../modelos/jsonModel");
const productsModel = new JsonModel("products");
const { validationResult } = require("express-validator");
const db = require("../database/models");

const productsController = {
  // Create - Render del formulario de creación de un producto
  create: (req, res) => {
    console.log("entrando al método create del productController.js");
    //Hay vs pedidos asincrónicos. Los defino por separado:
    let pedidoPackage = db.Package.findAll({
      include: [{ association: "productosP" }],
    });
    let pedidoCategory = db.Category.findAll({
      include: [{ association: "productosC" }],
    });
    Promise.all([pedidoPackage, pedidoCategory])
      //cuando obtenga todos los pedidos, recién ahí realiza el "then"
      .then(function ([packages, categories]) {
        return res.status(200).render("./products/create", {
          packages: packages,
          categories: categories,
        });
      })
      .catch((err) => res.send(err));
  },

  // Store -  Método que persiste la data del formulario de creación de un producto
  store: (req, res) => {
    let errors = validationResult(req);
    //res.send(errors);
    if (errors.isEmpty()) {
      //hay errores en la validación??
      console.log("Entró al método store del productController.js");
      //console.log(req.file);
      req.body.image = "/images/products/" + req.file.filename;
      db.Product.create({
        //1ro nombre de las columnas BBDD, igual que en el modelo. 2do nombre del campo del formulario
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        //discount: req.body.discount - Falta agregarlo en la vista
        package_id: req.body.package,
        category_id: req.body.category,
        image: req.body.image,
        //stock: req.body.stock - Falta agregarlo en la vista
        status: 1,
      });
      res.redirect("/");
    } else {
      let pedidoPackage = db.Package.findAll({
        include: [{ association: "productosP" }],
      });
      let pedidoCategory = db.Category.findAll({
        include: [{ association: "productosC" }],
      });
      Promise.all([pedidoPackage, pedidoCategory])
        .then(function ([packages, categories]) {
          return res.status(200).render("./products/create", {
            packages: packages,
            categories: categories,
            errors: errors.mapped(), // envío los errores como un obj. lit.
            oldData: req.body, // envío los datos anteriores a la vista, para que no tengan que volver a cargar todo
          });
        })
        .catch((err) => res.send(err));
    }
  },

  // Detail - Detalle de un producto a partir de su id
  detail: (req, res) => {
    console.log("entrando al render detail de productsController.js");
    db.Product.findByPk(req.params.id, {
      include: [{ association: "categories" }, { association: "packages" }],
    }).then(function (product) {
      console.log(product);

      res.render("./products/detail", { product: product });
    })
    .catch((err) => res.send(err));
  },

  // Edit - Render del formulario de edición de un producto
  edit: (req, res) => {
    console.log("Entró al método edit del productController.js");
    //hay que pedir, los datos del producto a editar, pero también los packages y categorias.
    //Por lo que hay vs pedidos asincrónicos. Los defino por separado:
    let pedidoProducto = db.Product.findByPk(req.params.id, {
      include: [{ association: "categories" }, { association: "packages" }],
    });
    let pedidoPackage = db.Package.findAll({
      include: [{ association: "productosP" }],
    });
    let pedidoCategory = db.Category.findAll({
      include: [{ association: "productosC" }],
    });
    Promise.all([pedidoProducto, pedidoPackage, pedidoCategory])
      //cuando obtenga todos los pedidos, recién ahí realiza el "then"
      .then(function ([product, package, category]) {
        return res.status(200).render("./products/edit", {
          product: product,
          package: package,
          category: category,
        });
      })
      .catch((err) => res.send(err));
  },

  //Update -  Método que persiste la data del formulario de edición de un producto
  update: (req, res) => {
    let errors = validationResult(req);
    //res.send(errors);
    if (errors.isEmpty()) {
      //hay errores en la validación??
      //console.log(req.file);
    console.log("Entró al método update del productController.js");
    req.body.image = "/images/products/" + req.file.filename;
    db.Product.update(
      {
        //1ro nombre de las columnas BBDD, igual que en el modelo. 2do nombre del campo del formulario
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        //discount: req.body.discount - Falta agregarlo en la vista
        package_id: req.body.package,
        category_id: req.body.category,
        image: req.body.image,
        //stock: req.body.stock - Falta agregarlo en la vista
      },
      {
        where: { id: req.params.id },
      }
    );
    res.redirect("/");
  } else {
    let pedidoProducto = db.Product.findByPk(req.params.id, {
      include: [{ association: "categories" }, { association: "packages" }],
    });
    let pedidoPackage = db.Package.findAll({
      include: [{ association: "productosP" }],
    });
    let pedidoCategory = db.Category.findAll({
      include: [{ association: "productosC" }],
    });
    Promise.all([pedidoProducto, pedidoPackage, pedidoCategory])
      //cuando obtenga todos los pedidos, recién ahí realiza el "then"
      .then(function ([product, package, category]) {
        return res.status(200).render("./products/edit", {
          product: product,
          package: package,
          category: category,
          errors: errors.mapped(),
        });
      })
      .catch((err) => res.send(err));
  }},

  // destroy - Hard Delete - Elimina un producto de la base de datos
  destroy: (req, res) => {
    console.log("Entró al método destroy del productController.js");
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/");
  },

  // Soft Delete - Cambia el status de un producto para que sea o no visible
  delete: (req, res) => {
    db.Product.update(
      {
        status: 0,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.redirect("/");
  },

  cart: (req, res) => {
    console.log("entrando al render cart");
    res.status(200).render("./products/cart");
  },
  addProductCart: (req, res) => {
    const product = productsModel.buscar(req.params.id);
    let cantidad = 1;

    const indexItem = req.session.cart.findIndex(
      (item) => item.id == product.id
    );
    if (indexItem != -1) {
      req.session.cart[indexItem].cantidad =
        req.session.cart[indexItem].cantidad + 1;
    } else {
      req.session.cart.push({ ...product, cantidad });
    }
    res.redirect("/products/cart");
  },
  deleteProductCart: (req, res) => {
    const product = productsModel.buscar(req.params.id);

    const indexItem = req.session.cart.findIndex(
      (item) => item.id == product.id
    );
    if (indexItem != -1) {
      req.session.cart.splice(indexItem, 1);
    }

    res.redirect("/products/cart");
  },
};

// ************ exports  ************
module.exports = productsController;
