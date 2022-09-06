/*Micro desafío - Paso 3:
● Crear un archivo JavaScript: /public/js//moviesAdd.js, y vincularlo con el archivo;
/views//moviesAdd.ejs.
● Desde el archivo /public/js/moviesAdd.js, capturar los siguientes elementos: <h1>,
<section> y <article>, ubicados en el archivo: /views//moviesAdd.ejs.
● Agregar a la etiqueta <h1> el mensaje: “AGREGAR PELÍCULAS”.
● Agregar a la etiqueta <h1> la clase: “titulo”.
● Agregar al artículo la clase: “fondoTransparente”.
● Agregar a la sección la clase: “fondoCRUD”.*/

//Eventos

window.addEventListener("load", function () {
  let h1 = document.querySelector("h1");
  let section = document.querySelector("section");
  let article = document.querySelector("article");

  h1.innerText += "AGREGAR PELÍCULAS";
  h1.classList.add("titulo");
  section.classList.add("fondoCRUD");
  article.classList.add("fondoTransparente");

  h1.addEventListener("mouseover", function () {
    h1.classList.toggle("moviesAddTitulo");
  });

  //Máquina de Estados:
  /* 
  -Detectar cuando el usuario tipee de corrido la palabra "secreto", en el imput para ingresar el título de la película
  -Problema: solo podemos definir !!!UN EVENTO POR TECLA PRESIONADA!!!
  -Entonces, para comenzar:  */
  //let estadoSecreto = 0; //el usuario no escribió nada
  /* 1 significa que escribió "s"
  2 significa que escribió "se" ...
  Qué debe hacer el código?
  -Si el estado es 0 y se presiona la tecla S, la variable estadoSecreto pasa a 1
  -Si el estado es 1 y se presiona la tecla E, la variable estadoSecreto pasa a 2
  ...
  -Si el estado es 6 y se presiona la tecla O, la variable estadoSecreto pasa a 0 Y SE DISPARA una alerta qur diga "SECRETO MÁGICO"
  -Si no se cumple ninguna de las condiciones, el estado vuelve a 0  
  */

  let estadoSecreto = 0;
  /*
  let secreto = document.querySelector("#secreto");
  secreto.addEventListener("keypress", function (e) {
    switch (e.key) {
      case "s":
        if (estadoSecreto == 0) {
          estadoSecreto++;
        } else {
          estadoSecreto = 0;
        }
        break;
      case "e":
        if (estadoSecreto == 1 || estadoSecreto == 4) {
          estadoSecreto++;
        } else {
          estadoSecreto = 0;
        }
        break;
      case "c":
        if (estadoSecreto == 2) {
          estadoSecreto++;
        } else {
          estadoSecreto = 0;
        }
        break;
      case "r":
        if (estadoSecreto == 3) {
          estadoSecreto++;
        } else {
          estadoSecreto = 0;
        }
        break;
      case "t":
        if (estadoSecreto == 5) {
          estadoSecreto++;
        } else {
          estadoSecreto = 0;
        }
        break;
      case "o":
        if (estadoSecreto == 6) {
          alert("SECRETO MÁGICO");
          estadoSecreto = 0;
        } else {
          estadoSecreto = 0;
        }
        break;

      default:
        break;
    }
  }); */

    secreto.addEventListener("keypress", function (e) {
    if (estadoSecreto == 0 && e.key == "s") {
      estadoSecreto = 1;
    }
  });
  secreto.addEventListener("keypress", function (e) {
    if (estadoSecreto == 1 && e.key == "e") {
      estadoSecreto = 2;
    }
  });
  secreto.addEventListener("keypress", function (e) {
    if (estadoSecreto == 2 && e.key == "c") {
      estadoSecreto = 3;
    }
  });
  secreto.addEventListener("keypress", function (e) {
    if (estadoSecreto == 3 && e.key == "r") {
      estadoSecreto = 4;
    }
  });
  secreto.addEventListener("keypress", function (e) {
    if (estadoSecreto == 4 && e.key == "e") {
      estadoSecreto = 5;
    }
  });
  secreto.addEventListener("keypress", function (e) {
    if (estadoSecreto == 5 && e.key == "t") {
      estadoSecreto = 6;
    }
  });
  secreto.addEventListener("keypress", function (e) {
    if (estadoSecreto == 6 && e.key == "o") {
      alert("SECRETO MÁGICO");
      estadoSecreto = 0;
    }
  });
  secreto.addEventListener("keypress", function (e) {
    if (estadoSecreto == 6 && e.key == "o") {
      estadoSecreto = 0;
    }
  });
  secreto.addEventListener("keypress", function (e) {
    if (
      !(
        e.key == "s" ||
        e.key == "e" ||
        e.key == "c" ||
        e.key == "r" ||
        e.key == "t" ||
        e.key == "o"
      )
    ) {
      estadoSecreto = 0;
    }
  });
}); 



  
