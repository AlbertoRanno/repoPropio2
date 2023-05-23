// import "./App.css"; //import logo from "./logo.svg";
// 2- ese componente que creé lo voy a importar de un archivo que crearé en la carpeta component
import TiraDePeliculas from "./components/TiraDePeliculas";
import ElPoderDeLasLLaves from "./components/ElPoderDeLasLLaves";
import MiComponente from "./components/MiComponente";
import Botones from "./components/Botones";
import Contador from "./components/Contador";
import EventoA from "./components/EventoA";
import TiraDePelisStateFull from "./components/TiraDePelisStateFull";
import Gif from "./components/Gif";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!!!
        </a> */}
      </header>
      <main>
        {/* 1- creo la etiqueta de un componente que voy a retutilizar en varios lados */}
        <Gif />
        {/* <TiraDePelisStateFull />
        <EventoA />
        <Contador inicial={0} />
        <Botones />
        <MiComponente />
        <TiraDePeliculas />
        <ElPoderDeLasLLaves /> */}
      </main>
    </div>
  );
}

export default App;
