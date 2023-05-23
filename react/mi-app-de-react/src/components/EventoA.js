import React, { Component } from "react";

  /* Primero de Eventos */

class EventoA extends Component {
  lanzarAlerta() {
    alert("Encontraste la imagen!!");
  }

  render() {
    return <img src="/logo192.png" width={200} alt="react.logo" onMouseOver={this.lanzarAlerta}/>;
  }
}

export default EventoA;
