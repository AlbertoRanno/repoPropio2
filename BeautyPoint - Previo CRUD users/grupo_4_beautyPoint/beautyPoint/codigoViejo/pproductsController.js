store: (req, res) => {
    let errors = validationResult(req);
    //res.send(errors);
    if (errors.isEmpty()) {
      //hay errores en la validación??
      console.log("Entró al método store del productController.js");
      console.log(req.file);
      req.body.image = "/images/products/" + req.file.filename;
      let productId = productsModel.save(req.body);
      res.redirect("/products/detail/" + productId);
    } else {
      res.render("./products/create", {
        errors: errors.mapped(), // envío los errores como un obj. lit. para que sea + facil trabajarlo
        oldData: req.body, // envío los datos anteriores a la vista, para que no tengan que volver a cargar todo
      });
    }}


      edit: (req, res) => {
    console.log("Entró al método edit del productController.js");
    let product = productsModel.buscar(req.params.id);
    if (product) {
      res.render("./products/edit", { products: product });
      console.log(product);
    } else {
      res.render("./not-found");
    }
  }


  update: (req, res) => {
    console.log("Entró al método update del productController.js");
    let productoAeditar = productsModel.buscar(req.params.id);
    req.body.id = productoAeditar.id;

    if (!req.file) {
      console.log(
        "No se editó la imagen. Traigo la que tenía en base de datos"
      );
      req.body.image = productoAeditar.image;
    } else {
      console.log("Se editó la imagen. Subo la nueva.");
      req.body.image = "/images/products/" + req.file.filename;
    }

    console.log(req.body);

    productsModel.update(req.body);
    res.redirect("/products/detail/" + req.params.id);
  }

