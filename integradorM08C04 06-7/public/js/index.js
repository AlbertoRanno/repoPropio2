//INICIARLO CON NPM TEST

/*Micro desafío - Paso 1:

Utilizaremos de base el siguiente proyecto creado con Express (recordemos instalar
todas las dependencias del proyecto, ejecutando el comando npm install 😉). Además,
aprovecharemos la base de datos movies_db (no olvidemos activar el servicio de MySQL
en nuestro equipo). De esta manera, todo funcionará correctamente. No debemos
asustarnos si no visualizamos nada cuando ejecutemos npm test para activar el servidor
y, luego, en el browser ejecutemos: http://localhost:3001/. Lo que ocurre es que el
contenedor padre de la página posee una propiedad de CSS llamada: display : none.
Una vez realizado todos los pasos anteriores, debemos hacer lo siguiente:
● Crear un archivo JavaScript: /public/js//index.js, y vincularlo con el archivo:
/views//index.ejs.
● Desde el archivo /public/js/index.js, capturar los siguientes elementos: <main>,
<h2>, <a> y <p>, ubicados en el archivo: /views//index.ejs.
● Haciendo uso del prompt, indicar al usuario que: “Ingrese su nombre”.
● En caso de que el usuario no coloque su nombre, a la etiqueta <h2>, se le debe
agregar la palabra “Invitado”. En caso contrario, se le debe agregar el nombre que el
usuario ingresó.
● Agregar a la etiqueta <h2> el estilo uppercase.
● A la etiqueta <a>, colocarle el estilo correspondiente para que asuma el siguiente
color: #E51B3E.
● Mediante el confirm, preguntar al usuario “¿Desea colocar un fondo de
pantalla?”. Si la respuesta es afirmativa por parte del usuario, agregar al <body> la
clase “fondo”.
● A todos los párrafos que fueron capturados, asignar a los pares la clase:
“descatadoPar”. Y a los impares agregar la clase: “destacadoImpar”.
● Finalmente, establecer como visible a la etiqueta <main> en el browser o
navegador, aplicando el estilo: display : block.*/

//Eventos

window.addEventListener("load", function () {
  let main = document.querySelector("main");
  let h2 = document.querySelector("h2");
  let a = document.querySelector("a");
  let losP = document.querySelectorAll("p");

  var nombre = prompt("ingrese su nombre");
  console.log(nombre);
  if (nombre) {
    h2.innerHTML += nombre;
  } else {
    h2.innerText += " INVITADO";
  }

  h2.style.textTransform = "uppercase";
  a.style.color = "#E51B3E";

  var confirma = confirm("¿Desea colocar un fondo de pantalla?");
  if (confirma) {
    main.classList.add("fondo");
  }

  console.log(losP);
  for (let i = 0; i < losP.length; i++) {
    if (i % 2 == 0) {
      losP[i].classList.add("destacadoPar");
    } else {
      losP[i].classList.add("destacadoImpar");
    }
  }

  main.style.display = "block";

  let logoDH = document.querySelector(".logoDH");
  console.log(logoDH);
  let menu = document.querySelector("#menu");
  console.log(menu);

  logoDH.addEventListener("click", function () {
    menu.classList.toggle("mostrar");
  });

  menu.addEventListener("mouseleave", function () { //IMPORTANTE, porque con mouseour parpadea
    menu.classList.toggle("mostrar"); // deberia ser remove.. pero parece que no está bien delimitada el área
  });
});
