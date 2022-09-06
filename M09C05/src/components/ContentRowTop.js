import React from "react";
import ContentRowMovies from "./ContentRowMovies";
import Chart from "./Chart";
import NotFound from "./NotFound";
import LastMovieInDb from "./LastMovieInDb";
import GenresInDb from "./GenresInDb";
import SearchMovies from "./SearchMovies";
import { Route, Switch } from "react-router-dom";

function ContentRowTop() {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
        </div>
        <Switch>
          <Route
            path="/ContentRowMovies"
            component={ContentRowMovies}
            
          ></Route>
          <Route path="/Chart" component={Chart} ></Route>
          <Route
            path="/LastMovieInDb"
            component={LastMovieInDb}
            
          ></Route>
          <Route
            path="/GenresInDb"
            component={GenresInDb}
            
          ></Route>
          <Route
            path="/SearchMovies"
            component={SearchMovies}
            
          ></Route>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}
export default ContentRowTop;

/* http://www.omdbapi.com/?i=tt3896198&apikey=f7077612 */