import React from "react";

function ContenedorPublicidad(props) {
  return (
    <div>
      <p> ---- Inicio de Espacio Publicitario ---- </p>
      {/* no sé que va a venir acá... entonces uso props.children */}
      {props.children}
      <p> ---- Fin de Espacio Publicitario ---- </p>
    </div>
  );
}

export default ContenedorPublicidad;
