import React from "react";

function ElPoderDeLasLLaves() {
  let nombre = "Diana"
  let frutas = ["Banana", "Mazorca", "Berenjena"]
  return (
    <div>
      <div>
        Hola{" "}
        {nombre === "Diana" ? nombre + " sacudime la " + frutas[0] : "Bienvenida"}
      </div>
      <ul>{
        frutas.map(fruta => <li>La {fruta} es deliciosa </li>)
        }</ul>
    </div>
  );
}

export default ElPoderDeLasLLaves;
