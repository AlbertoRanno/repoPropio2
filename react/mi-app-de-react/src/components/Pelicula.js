import React from "react";
import "./Pelicula.css"

function Pelicula() {
  let rating = 5.8;
  // más adelante veremos como hacer que rating y generos puedan tener un valor distinto para cada caso
  let generos = ["Acción", "Terror", "Comedia", "Suspenso"]
  return (
    // siempre tengo que exportar todo dentro de UNA SOLA ETIQUETA, por eso el DIV

    <div>
      <h2 className="sarasa"> ESTE Título de la Pelicula </h2>
      <p>Rating: {rating > 6 ? "La Peli es Buena" : "No te gastes"}</p>
      <ul>
        {/* siempre que quiero imprimir muchas cosas iguales, en React, en vez de usar el for, tengo
        que usar el map(), reduce(), o filter() */}
        { generos.map( genero => <li> {genero} </li>)}
        {/* para mostrar generos, uso map. Map, va a mostrar cada individual, como "genero", y por cada
        uno de estos "genero", voy a imprimir un <li></li>, que diga ese genero en cuestión.
        Osea, qué es lo que queremos repetir? que es generos.
        A cada uno lo voy a llamar genero.
        Decimos cómo se va a imprimir ese geneno particular
        Este último genero, es una variable, entonces recordar ponerlo con la variable que corresponde  */}
      </ul>
    </div>
  );
}

export default Pelicula;
