import React from "react";
import GenresInDb from "./GenresInDb";
import LastMovieInDb from "./LastMovieInDb";
import ContentRowMovies from "./ContentRowMovies";

const movies = {
  titulo: "Movies in Data Base",
  cifra: 21,
  colorDeBorde: "card border-left-primary shadow h-100 py-2",
  icono: "fas fa-film fa-2x text-gray-300",
};
const awards = {
  titulo: "Total awards",
  cifra: 79,
  colorDeBorde: "card border-left-success shadow h-100 py-2",
  icono: "fas fa-award fa-2x text-gray-300",
};
const actors = {
  titulo: "Actors quantity",
  cifra: 49,
  colorDeBorde: "card border-left-warning shadow h-100 py-2",
  icono: "fas fa-user fa-2x text-gray-300",
};
const rows = [movies, awards, actors];

function RowTop() {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
      </div>
      <div className="row">
        <ContentRowMovies rows={rows} />
      </div>
      <div className="row">
        <LastMovieInDb />
        <GenresInDb />
      </div>
    </div>
  );
}

export default RowTop;
