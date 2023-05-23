const controller = {
  main: (req, res) => {
    const fetch = require("node-fetch");
    /* Consumo API desde el back, y envío a una vista: */
     fetch("https://apis.datos.gob.ar/georef/api/provincias")
      .then((response) => response.json())
      .then((data) =>  res.render("index", { listado: data.provincias }))
      .catch((error) => console.log(error))
      .finally(() => {
        console.log("fin de cargamento");
      });    
    
  },
};

module.exports = controller;