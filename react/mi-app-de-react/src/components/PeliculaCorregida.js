import React from "react";
import PropTypes from "prop-types";

function PeliculaCorregida(props) {
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
    <div>
      <h2> {props.titulo} </h2>
      <p> Rating: {props.rating} </p>
      <nav>{listadoDeGeneros}</nav>
    </div>
  );
}
PeliculaCorregida.defaultProps = {
  rating: "Esta peli aún no fue punteada!",
  generos: null,
};
PeliculaCorregida.propTypes = {
  rating: PropTypes.number, //ojo que lo number se pasan rating={9}, si no fuera así, salta la adevertencia en la consola del nav
  titulo: PropTypes.string
}

export default PeliculaCorregida;


