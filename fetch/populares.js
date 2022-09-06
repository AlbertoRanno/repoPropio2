window.addEventListener("load", function () {
  fetch(
    "https://api.giphy.com/v1/gifs/trending?api_key=Ip7wQ6914aPRmDI6HePRPpQeZXyxLFkU&limit=25&rating=g"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (info) {
      console.log(info.data); /*si no hago un console.log, no sabré como operar esa info
      .data, porque si tuviera la API KEY, veería que lo que me interesa está dentro de esa prop., 
      y dentro de ella, tendré tmb title... e images, dentro de ella, original, dentro url. 
      Entonces, lo importante es: conectar a la API, hacer un console.log para ver como viene dada la info, y 
      luego la configuro para mostrar como yo quiera*/
      for (let i = 0; i < info.data.length; i++) {
        let gif = "<p>" + info.data[i].title + "</p>";
        gif += "<img src=" + info.data[i].images.original.url + ">";

        document.querySelector("ul").innerHTML += "<li>" + gif + "</li>";
      }
    }).catch(function (error) {
      alert("Error! intente más tarde")
    })
});
