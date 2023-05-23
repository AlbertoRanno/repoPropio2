import { Route, Link, Routes } from "react-router-dom";
import Home from "./Home"
import RickMortyClass from "./RickMortyClass"
import RickMortyFn from "./RickMortyFn";
import FrutasClass from "./FrutasClass";
import FrutasFunction from "./FrutasFunction";
import NotFound from "./NotFound";

function App() {
  return (
    <div>
      <Link to="/">Home</Link>
      <br></br>
      <Link to="/rick-morty">Rick and Morty CLASS</Link>
      <br></br>
      <Link to="/rick-morty-Fn">Rick and Morty FUNCTION</Link>
      <br></br>
      <Link to="/frutas">Frutas CLASS</Link>
      <br></br>
      <Link to="/frutas-Fn">Frutas FUNCTION</Link>
      <br></br>

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/rick-morty" exact element={<RickMortyClass />} />
        <Route path="/rick-morty-Fn" exact element={<RickMortyFn />} />
        <Route path="/frutas" exact element={<FrutasClass />} />
        <Route path="/frutas-Fn" exact element={<FrutasFunction />} />
        <Route path="*" exact element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App