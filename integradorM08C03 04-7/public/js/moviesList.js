/*Micro desafío - Paso 2:
● Crear un archivo JavaScript: /public/js//moviesList.js, y vincularlo con el archivo:
/views//moviesList.ejs.
● Desde el archivo /public/js/moviesList.js, capturar los siguientes elementos: <body>
y <h1>, ubicados en el archivo /views//moviesList.ejs.
● Haciendo uso del prompt, preguntar al usuario: “¿Desea modo oscuro?”. Si la
respuesta es afirmativa, agregar a la etiqueta <body> un color de fondo: #7f7f7f​, y
la clase: fondoMoviesList.
● Agregar a la etiqueta <h1> el mensaje: “LISTADO DE PELÍCULAS”.
● Agregar a la etiqueta <h1> los siguientes estilos:
○ Color de la fuente: white.
○ Color de fondo: teal.
○ Relleno: 20px.*/

//Eventos

window.addEventListener("load", function () {
let body = document.querySelector("body");
let h1 = document.querySelector("h1");

/*let confirmo = confirm("¿Desea modo oscuro?");
if (confirmo) {
  body.style.backgroundColor = "#7f7f7f";
  body.classList.add("fondoMoviesList");
}*/

console.log(body);
h1.innerText += "LISTADO DE PELÍCULAS";
h1.style.color = "white";
h1.style.backgroundColor = "teal";
h1.style.padding = "20px";

h1.addEventListener("mouseover", function () {
  body.style.backgroundColor = "#7f7f7f";
  body.classList.add("fondoMoviesList");
});


})
