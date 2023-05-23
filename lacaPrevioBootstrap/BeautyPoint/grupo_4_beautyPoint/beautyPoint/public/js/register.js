window.addEventListener("load", function () {
  let form = document.querySelector("form.form-register"); //"la etiqueta form, con clase form-register"
  //console.log(form);
  form.addEventListener("submit", function (e) {    

    let errores = [];

    let first_name = document.querySelector("input.first_name");

    if (first_name.value == "") {
      errores.push("Tienes que escribir tu nombre");
      //is-invalid
      first_name.classList.add("is-invalid");
    } else if (first_name.value.length < 2) {
      errores.push("El nombre debe tener al menos 2 caracteres");
      first_name.classList.add("is-invalid");
    } else {
      first_name.classList.add("is-valid");
      first_name.classList.remove("is-invalid");
    }

    let last_name = document.querySelector("input.last_name");

    if (last_name.value == "") {
      errores.push("Tienes que escribir tu apellido");
    } else if (last_name.value.length < 2) {
      errores.push("El nombre debe tener al menos 2 caracteres");
    }

    let dni = document.querySelector("input.dni");

    if (dni.value == "") {
      errores.push("Tienes que escribir tu DNI");
    }

    if (errores.length > 0) {
      e.preventDefault(); 

      let ulErrores = document.querySelector("div.errores ul")
      for (let i = 0; i < errores.length; i++) {
        
        ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
        
      }
    }
  });
});
