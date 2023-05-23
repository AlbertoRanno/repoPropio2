import React, { Component } from "react";

class FrutasClass extends Component {
  constructor() {
    super();
    this.state = {
      listadoDeFrutas: ["Manzana", "Pera", "Banana"],
    };
  }

  agregarFruta = (e) => {
    e.preventDefault();
    let nuevaFruta = e.target.nuevaFruta.value;
    this.setState({
      listadoDeFrutas: [...this.state.listadoDeFrutas, nuevaFruta],
    });
    e.target.nuevaFruta.value = "";
  };
  render() {
    return (
      <div>
        <h2>Soy el componente Frutas CLASS</h2>
        <ul>
          {this.state.listadoDeFrutas.map((fruta, i) => {
            return <li key={i}>{fruta}</li>;
          })}
        </ul>
        <form onSubmit={this.agregarFruta}>
          <input name="nuevaFruta" type="text" /> <br></br>
          <button>Añadir más frutas</button>
        </form>
      </div>
    );
  }
}

export default FrutasClass;

/* Componente Class - mediante Constructor creo el estado inicial. Renderizo, mediante un map, los
elementos de ese array. Renderizo tmb un form con un input, y un evento submit. El evento acciona
el método agregarFruta (con class son métodos, por eso el "this."). Agregar Fruta, lo primero que
hace, es prevenir la función default del submit, que haría que se recargue toda la página (cosa que 
React justamente evita). Luego captura el valor alojado en el input llamado nuevaFruta. Y, luego de
esto, mediante setState, actualiza el estado. Definiendo el nuevo array como el formado por el
array inicial, (el cual paso destructurado, osea solo los valores sin los corchetes) más el valor 
capturado del input. Luego de esto, con e.target.nuevaFruta.value = "", al asignarle un string vacio
al input, lo limpio. Y se renderiza instantaneamente, el nuevo array con su nuevo elemento  */
