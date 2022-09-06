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

//localStorage.setItem("nombreUsuario", JSON.stringify(objetoUarray));
