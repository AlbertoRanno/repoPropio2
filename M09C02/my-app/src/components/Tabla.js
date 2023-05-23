import React from "react";
import Fila from "./Fila";

function Tabla() {
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">All the movies in the Database</h1>

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <td>
                    <span>Titulo </span>
                  </td>
                  <td>
                    <span>Duración</span>
                  </td>
                  <td>
                    <span>Rating</span>
                  </td>
                  <td>
                    <span>Género</span>
                  </td>
                  <td>
                    <span>Premios</span>
                  </td>
                </tr>
              </thead>
              <tbody>
                <Fila
                  titulo="Billy Ellior"
                  duracion={123}
                  rating={5}
                  generos={["Drama", "Comedia"]}
                  premios={2}
                />
                <Fila
                  titulo="Alicia en el país de las maravillas"
                  duracion={142}
                  rating={4.8}
                  generos={["Drama", "Acción", "Comedia"]}
                  premios={3}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tabla;
