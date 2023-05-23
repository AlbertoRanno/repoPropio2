import React, { Component } from "react";

class Botones extends Component {
  constructor() {
    super();

    this.state = {
      valor: 1,
    };
  }

  aumentarValor() {
    this.setState({
      valor: this.state.valor + 1,
    });
  }

  disminuirValor() {
    this.setState({
      valor: this.state.valor - 1,
    });
  }

  render() {
    return (
      <div>
        <h2> {this.state.valor} </h2>
        <button onClick={() => this.aumentarValor()}>Aumentar</button>
        <button onClick={() => this.disminuirValor()}>Disminuir</button>
      </div>
    );
  }
}

export default Botones;


