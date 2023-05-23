import React, { Component } from "react";

/* Teóricamente este componente consumía una api que daba un nuevo gif cada vez que se
actualizaba la página.. no conseguí esa API, y adapté a esta que muestra la cant. de prov.
Luego conseguí una de imágenes random de perros, y adapté*/
class Gif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gif: "",
    };
  }
  // 1 - creo un estado inicial vacio

  //6 - apiCall se encarga de traer un pedido por API mediante fetch
  apiCall(url, consecuencia) {
    //consecuencia = handlers
    fetch(url)
      .then(response => response.json())
      .then(data => consecuencia(data))
      .catch(error => console.log(error));
  }

    //5- traerGifNuevo llama a "apiCall"
  traerGifNuevo() {
    /*lo que quiero es que ni bien se cargue la pagina, me levante la api, y una vez que 
    se levante la Api, me ejecute el método MostrarGif*/
    this.apiCall(
      "https://dog.ceo/api/breeds/image/random",
      //7- luego de levantar la API, se ejecutá mostrarGif
      this.mostrarGif
    )
  }

  //4- se va ejecutar componentDidMount - se monta, y traeGifNuevo
  componentDidMount() {
    console.log("Me monté!");
    this.traerGifNuevo();
  }



  /* como va a usar setState, necesitamos que mostrarGif sea una arrow function */
  mostrarGif = (data) => {
    console.log(data.message);
    //console.log(data.provincias.length);
    this.setState({ gif: data.message });
    //8- mostrarGif, va a cambiar el estado, y al cambiar el estado...
  };

  //12- Siempre por las dudas, acá mando una alerta, que confirma al usuario, que ya tengo la info novedosa
  componentDidUpdate() {
    console.log("Me actualicé!!");
    alert("tengo un gif nuevo")}

  //2- "//1" va a ejecutar render
  //9- se vuelve a ejecutar render
  render() {
    console.log("Estoy renderizando");

    let contenido;

    if (this.state.gif === "") {
      contenido = <p> Los datos se están cargando... </p>;
      /* 3- render va a darse cuenta de que aun no tengo ningún gif, así que va a decir 
      "Cargando". al menos por una milésima de segundo */
    } else {
      //contenido = <p> {this.state.gif} </p>;
      contenido = <img src={this.state.gif} alt="" width={200} ></img>
      //10 - en este caso, se da cuenta, que gif, si tiene un gif, y muestra el gif
    }

    return (
      <div>
        {contenido}
        {/* como uso otros métodos tengo que escribirla tipo arrow function */}
        <button onClick={ () => this.traerGifNuevo()}> Random Gif!</button>´
        {/* //11- si hago click en el botón, se vuelve a ejecutar, traerGifNuevo, que vuelve a hacer
         un pedido a la API, que vuelve a actualizar el estado, y vuelve a mostrar un gif Nuevo */}
      </div>
    );
  }
}

export default Gif;
