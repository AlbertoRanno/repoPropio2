import React, { Component } from "react";
import Pelicula from "./Pelicula";
import Peliculon from "./Peliculon";
import Saludo from "./Saludo";
import Navbar from "./Navbar";
import ElPoderDeLasLLaves from "./ElPoderDeLasLLaves";
import PeliculaCorregida from "./PeliculaCorregida";
import ContenedorPublicidad from "./ContenedorPublicidad";

class TiraDePelisStateFull extends Component {
  lanzarAlerta() {
    alert("Me clickeaste!");
  }

  cambiarAmarillo() {
    document.querySelector("body").style.backgroundColor = "yellow";
  }

  cambiarRojo() {
    document.querySelector("body").style.backgroundColor = "red";
  }

  render() {
    return (
      <div
        className="App"
        onClick={()=> this.lanzarAlerta()}
        onMouseOver={this.cambiarAmarillo}
        onMouseOut={this.cambiarRojo}
      >
        <header className="App-header"></header>
        <main>
          {/* 1- creo la etiqueta de un componente que voy a retutilizar en varios lados */}
          <Peliculon titulo="Título Dinámico" rating="8.4" />
          <Saludo titulo="Hola mundo" subtitulo="¡Nunca paremos de aprender!" />
          <Navbar enlaces={["Home", "Productos", "Servicios"]} />
          <PeliculaCorregida
            generos={["Acción", "Terror"]}
            titulo="Título Dinámico"
            rating="8.4"
          />
          <ContenedorPublicidad>
            {/* aca dentro diré que va en los children */}
            <h2> PUBLICIDAD</h2>
          </ContenedorPublicidad>
          <Pelicula />
          <ElPoderDeLasLLaves />
          <ContenedorPublicidad>
            <ul>
              <li>Publicidad 1</li>
              <li>Publicidad 2</li>
              <li>Publicidad 3</li>
            </ul>
          </ContenedorPublicidad>
        </main>
      </div>
    );
  }
}

export default TiraDePelisStateFull;
 
   /* los eventos los podría escribir ()=> this.lanzarAlerta(), o
   simplente: this.lanzarAlerta -SIN EJECUTAR LA FUNCIÓN
    */
 