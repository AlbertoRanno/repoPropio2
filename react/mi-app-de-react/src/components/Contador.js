import React, { Component } from "react";

/* Simil Botones, pero con props para definir el estado inicial */

class Contador extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numero: props.inicial,
    };
  }

  aumentarValor() {
    this.setState({
      numero: this.state.numero + 1,
    });
  }

  disminuirValor() {
    this.setState({
      numero: this.state.numero - 1,
    });
  }

  componentDidMount(){
    console.log("Me monté!");

  }

  componentDidUpdate(){
    console.log("Me actualicé!!");

  }
  
  render() {
    console.log("Estoy renderizando");
    /* React entiende que en el momento que modifico un estado, el render se tiene que ejecutar */
    return (
      <div>
        <p>Soy el número {this.state.numero}</p>
        {/* Obs! al trabajar con estados, estamos obligados a escribir la sintaxis 
        de definir la función y ejecutarla */}
        <button onClick={() => this.aumentarValor()}>Aumentar</button>
        <button onClick={() => this.disminuirValor()}>Decrementar</button>
      </div>
    );
  }
}

export default Contador;
