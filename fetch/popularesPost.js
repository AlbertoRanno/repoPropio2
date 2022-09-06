window.addEventListener("load", function () {
  fetch("url")
    .then(function (response) {
      return response.json();
    })
    .then(function (info) {
      console.log(info);
    })
    .catch(function (error) {
      alert("Error! intente más tarde");
    });
});

/* Al trabajar por POST, debemos detallar nuestra configuración en un objeto literal, para que la API, entienda
la petición.
Primero definimos el método POST (method: POST)
Y el 2do atributo, es el más importante, se lo llama body. Este tendrá el contenido del envío. Y como siempre deberá
estar en formato json, uso la función stringify para que la pase (body: json.stringify(data)).
El 3er atriburo es el header, donde se define el tipo de contenido enviado, de modo que pueda ser interpretado por el
servidor que reciba la data (headers: { "Content-type": "application/json"}) */
window.addEventListener("load", function () {
  //primero armo la info que voy a enviar. El esquema de estos datos dependerá de cada API
  let data = { image_id: "asf2", sub_id: "my-user-1234", value: 1 };
  //segundo armo la variable de configuración. Siempre con el método, y el body. No así el header, que es opcional, salvo la API pida por algo en ellos
  let settings = {
    method: "POST",
    headers: {
      "contente-type": "application/json",
      //lo que suele pedir poner es la api-key, que es un código que nos da la misma api para permitirnos interactuar
      "x-api-key": "898adsa-adfasf8-asdasd-sdfsdfsdff",
    },
    body: JSON.stringify(data),
  };

  //tercero, armo fetch, la novedad es que aparte de la url, le tengo que pasar como 2do parámetro, la configuración
  fetch("url", settings)
    .then(function (response) {
      return response.json();
    })
    .then(function (info) {
      console.log(info);
    })
    .catch(function (error) {
      alert("Error! " + error);
    });
});
