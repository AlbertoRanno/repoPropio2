window.addEventListener("load", function () {
  const h2 = document.querySelector("h2");
  let nombre = prompt("Dinos tu nombre");
  localStorage.setItem("user", nombre);
  //localStorage.clear();

  if (localStorage.getItem("user") != null) {
    h2.innerText = "Hola " + localStorage.getItem("user");
  } else {
    h2.innerText = "Hola visitante";
  }
});

