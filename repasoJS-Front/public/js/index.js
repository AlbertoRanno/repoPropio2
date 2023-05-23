window.addEventListener("load", function () {
  //Una vez que se haya cargado por completo el objeto Document dentro del obj. Window, se ejecutará lo siguiente:
  // let elH1 = document.querySelector("h1"); // en caso de haber varios, solo capturo el primero
  // console.log(elH1);
  // elH1.innerHTML += " <i> Agrego </i>";
  // elH1.innerText += " <i> Agrego </i>";
  // elH1.style.textAlign = "center"; //OJO CamelCase
  // let confirmaCambios = confirm("Querés cambiar el color del título?");
  // if (confirmaCambios) {
  //   elH1.style.color = "cyan";
  // }
  // console.log(elH1.classList); // veo todas las clases que tiene aplicada
  // elH1.classList.add("prueba");
  // elH1.classList.remove("title")
  // elH1.classList.toggle("prueba"); // si no la tiene, la agrega, y viceversa
  // if (elH1.classList.contains("title")) {
  //   elH1.style.color = "cyan";
  // } // devuelve booleano, se usa para operaciones lógicas

  /*************** Eventos ***************/
  // elH1.addEventListener("click", function () {
  //   alert("Tocaste el título!")
  // })
  // elH1.addEventListener("click", function (event) {
  //   console.log(event);// para ver info sobre el parámetro "evento - event - e"
  // })
  /* una de las propiedades de este objeto es preventDefault(): que cancela el comportamiento por defecto q tenía la etiqueta */
  // let anchor = document.querySelector("a");
  // anchor.addEventListener("click", function (event) {
  //   event.preventDefault();
  //   console.log(this); // THIS dice donde sucedió el evento
  //   anchor.classList.toggle("title");
  // });
  /* Si hay muchos botones, y quiero una consecuencia para cada botón, NO puedo usar la variable botonesLink, porque a priori NO SÉ en qué botón se hizo click! Para estos casos es fundamental THIS. Dado que this, hace referencia al lugar exacto donde se ejecutó el evento:*/
  // let botonesLink = document.querySelectorAll("a");
  // for (let i = 0; botonesLink.length; i++) {
  //   botonesLink[i].addEventListener("click", function (e) {
  //     e.preventDefault();
  //     this.classList.toggle("title");
  //   });
  // }

  /*************** Eventos teclado: ***************/
  // window.addEventListener("keypress", function (e) { // Para ver qué tecla se presionó
  //   console.log(e.key);
  // });
  // let nombre = document.querySelector("#nombre") // # = ALT + 35
  // nombre.addEventListener("keydown", function (event) {
  //   alert("Se presionó la tecla: " + event.key)
  // })

  /*************** Validaciones formularios "on-time": ***************
   feedback + rápido = mejor User Exp. y menos sobrecarga al servidor 
  Eventos:
  Focus: ingresa cursor al input
  Blur: abandona el campo
  Change: identifica si cambió el valor de un campo. Se puede aplicar sobre el form completo
  Submit: identifica el evento cuando se clickea sobre un input o botón, ambos del tipo submit.
  
  Pasos:
-evento load
-capturo el form, con form.nombreDeLaClase
let formulario = document.querySelector("form.reservation")
ó let formulario = document.forms["reservation"]
-evento submit en form
formulario.addEventListener("submit", function(event){}); 
ó formulario.onsubmit = (event) => {} 
-parámetro e
-e.preventDefault primero, para trabajar tranquilo
-dentro de evento form:
-let errores = [ ];
-capturo todos los campos, y por cada campo haré un if preguntando: si el campo no obtiene lo que espero… errores.push(“el texto que envio a la vista”), y si tiene varios casos, los else if
-luego de completar todos los campos: if(errores.length > 0){
//y corto y pego el preventDefault dentro… cosa de que no se envíe el form, solo si hay errores. Y para enviarlos a la vista:
if (errores.length > 0) {
      e.preventDefault(); 

      let ulErrores = document.querySelector("div.errores ul")
      for (let i = 0; i < errores.length; i++) {
        
        ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
        
      }
    }

ó bien hacer:

if(errores.length > 0){
 event.preventDefault();
 let ulErrores = document.querySelector(".errores ul");
 errores.forEach(error => {
 ulErrores.innerHTML += `<li>${error}</li>`
 });
}

//en la vista creo un :
<div class="errores">
    <ul>
            
    </ul>
 </div>
*/

  /*************** Fetch del lado del FRONT: ***************/
  fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then((response) => response.json())
    .then((data) => {
      // OJO a las llaves si son varias consecuencias
      console.log(data.provincias);
      for (let i = 0; i < data.provincias.length; i++) {
        let nombres = "<li>" + data.provincias[i].nombre + "</li>"; //OJO a las comillas en los "<li>", sino no concatena
        //let nombres = `<li>${data.provincias[i].nombre}</li>`; // Con interpolación
        let elUl = document.querySelector("ul#provincias");
        elUl.innerHTML += nombres;
      }
    })
    .catch((error) => console.log(error))
    .finally(() => {
      console.log("fin de cargamento");
    });
});

/*************** Object Location ***************/
// console.log(location);
// console.log(location.href); // devuelve la URL
// console.log(location.reload); // recarga la página

/*************** URLSearchParams ***************
URLSearchParams es una interfaz de JavaScript que se utiliza para trabajar con los parámetros de una URL. Esta interfaz proporciona métodos para manipular y acceder a los diferentes parámetros presentes en la cadena de consulta (query string) de una URL.

La cadena de consulta de una URL es la parte que sigue al signo de interrogación "?" y contiene una serie de pares clave-valor separados por el signo "&". Por ejemplo, en la URL "https://www.ejemplo.com/busqueda?query=javascript&page=1", la cadena de consulta es "query=javascript&page=1".

URLSearchParams ofrece una forma sencilla de interactuar con estos parámetros. Al crear una nueva instancia de URLSearchParams y pasarle la cadena de consulta como argumento, se puede acceder a los diferentes parámetros y realizar diversas operaciones con ellos.

Algunos ejemplos de cómo se puede utilizar URLSearchParams:*/

// // Crear una instancia de URLSearchParams
// const urlParams = new URLSearchParams("query=javascript&page=1");

// // Obtener el valor de un parámetro
// console.log(urlParams.get("query")); // Resultado: "javascript"

// // Establecer el valor de un parámetro existente
// urlParams.set("page", "2");
// console.log(urlParams.toString()); // Resultado: "query=javascript&page=2"

// // Añadir un nuevo parámetro
// urlParams.append("sort", "asc");
// console.log(urlParams.toString()); // Resultado: "query=javascript&page=2&sort=asc"

// // Eliminar un parámetro
// urlParams.delete("query");
// console.log(urlParams.toString()); // Resultado: "page=2&sort=asc"

// // Recorrer todos los parámetros
// for (const [key, value] of urlParams) {
//   console.log(key, value);
// }
/* URLSearchParams proporciona métodos para obtener valores individuales de parámetros, establecer valores, añadir nuevos parámetros, eliminar parámetros existentes y recorrer todos los pares clave-valor presentes en la cadena de consulta.

Esto resulta útil cuando se trabaja con URLs en JavaScript, ya que permite manipular fácilmente los parámetros y realizar modificaciones en la URL sin tener que analizar y manipular manualmente la cadena de consulta.*/

/*************** Session storage y local storage ***************
La función de ambos es guardar datos en el navegador

localStorage nos permitirá almacenar información por tiempo indeterminado.
sessionStorage nos permitirá guardar información en sesión. Eso quiere decir que si usamos esta opción y cerramos el navegador, la información aquí almacenada se perderá.

Un ejemplo, carrito de compras. Seguramente, muchas veces hemos agregado productos a un carrito y repentinamente salimos de la página, para simplemente volver instantes después y darnos cuenta que las cosas que agregamos al carrito siguen ahí, intactas. Eso es posible gracias al almacenamiento local del navegador. Esta funcionalidad mejora la experiencia de usuario, sin tener que saturar el servidor de peticiones que nos sabemos si se van a concretar del lado del cliente.Además, esa info la podemos levantar desde cualquier página, y tener la certeza de que será de ese usuario. (Salvo lo pruebe de Incógnito, que cuenta como otra navegación… ahí la info no está..Porque localStorage, es por usuario, es decir, por navegador)
Funcionan muy similar a las cookies

***************Session storage
Nos permitirá guardar información en sesión. Es decir que si usamos esta opción y cerramos el navegador, la información aquí almacenada se perderá.*/
//sessionStorage.setItem("key", "value"); // para guardar un valor en storage. Este método crea nuevos atributos a nuestro storage, y asigna valores para ellos. Para eso recibe dos valores, el 1ro, el nombre de la clave que querramos guardar, y el 2do, el valor que esta lleve. Ej.:
//sessionStorage.setItem("nombre", "Tobias");
//sessionStorage.getItem("nombre"); //este método, va a devolver el valor de la clave que le pasemos. Ej. sessionStorage.getItem('nombre'); //  Tobias
//sessionStorage.removeItem("key"); //busca la clave correspondiente dentro de storage y la elimina
//sessionStorage.clear(); //elimina todo el contenido almacenado en storage

/***************Local storage
ÍDEM, pero, los datos almacenados en localStorage no tienen fecha de expiración.

Obs! Solo podemos almacenar datos en formato STRING.! Entonces, para poder guardar arrays, u objetos, tenemos que pasar la info por la función JSON.stringify*/
//localStorage.setItem("nombreUsuario", JSON.stringify(objetoUarray));

//Ejemplo:
window.addEventListener("load", function () {
  //Podría preguntar si ya hay algo guardado en storage:
  if (localStorage.getItem("nombreUsuario") == null) {
    //si no hay ningún usuario guardado, que proceda a guardarlo:
    let nombre = prompt("Dinos tu nombre");
    document.querySelector(".bienvenida").innerHTML = "Hola " + nombre;
    //si recargo la página me vuelve a pedir el nombre... para evitarlo, lo guardo en local Storage
    //localStorage.clear(); //para borrar lo previo almacenado
    //console.log(localStorage);  //veo la variable que ya viene definida
    localStorage.setItem("nombreUsuario", nombre);
    //una vez que lo guardo en storage, podría eliminar la línea anterior, y veería que lo guardado sigue en storage
  } else {
    nombre = localStorage.getItem("nombreUsuario");
    document.querySelector(".bienvenida").innerHTML = "Hola " + nombre;

    console.log(localStorage);
  }
});
