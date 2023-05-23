import { useState } from "react";

function FrutasFunction() {
  const [listadoDeFrutas, setListadoDeFrutas] = useState([
    "Manzana",
    "Pera",
    "Banana",
  ]);

  const agregarFruta = (e) => {
    e.preventDefault(); //a
    let nuevaFruta = e.target.nuevaFruta.value;
    setListadoDeFrutas([...listadoDeFrutas, nuevaFruta]);
    e.target.nuevaFruta.value = "";
  };
  return (
    <div>
      <h2>Soy el componente Frutas FUNCION</h2>
      {listadoDeFrutas.map((fruta, i) => {
        return <li key={i}>{fruta}</li>;
      })}

      <form onSubmit={agregarFruta}>
        <input name="nuevaFruta" type="text" /> <br></br>
        <button>Añadir más frutas</button>
      </form>
    </div>
  );
}

export default FrutasFunction;

/* La lógica es la misma, pero cambia la sintaxis:
Importo useState. Cargo el valor del estado inicial en listadoDeFrutas mediante: 
const [listadoDeFrutas, setListadoDeFrutas] = useState(["Manzana","Pera","Banana",]);
El componente, al ser una función, ya no puedo usar métodos (ni "this"), por lo que le agrego el
const delante para guardar agregarFruta como una función.
Luego, lo que cumple el rol del setState, será setListadoDeFrutas, definiendo direcmante como será
este nuevo array. Y por último, notar que en el evento no puedo usar this */
