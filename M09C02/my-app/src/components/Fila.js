import React from "react";

function Fila(props) {
    let listadoDeGeneros;
    if (props.generos != null) {
      listadoDeGeneros = (
        <ul>
          {props.generos.map((unGenero, i) => (
            <li key={unGenero + i}> {unGenero} </li>
          ))}
        </ul>
      );
    } else {
      listadoDeGeneros = "";
    }
  return (
    <tr>
      <td>
        <h6>{props.titulo}</h6>
      </td>
      <td>
        <h6>{props.duracion}</h6>
      </td>
      <td>
        <h6>{props.rating}</h6>
      </td>
      <td>
        <h6>{listadoDeGeneros}</h6>
      </td>
      <td>
        <h6>{props.premios}</h6>
      </td>
    </tr>
  );
}

export default Fila;
