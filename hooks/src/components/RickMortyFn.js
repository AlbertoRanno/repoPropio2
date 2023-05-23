import { useState, useEffect, useRef } from "react";
//1- importo useState, para el estado del componente.Y useEffect para los ciclos de vida
//11- importo useRef y guardo en una variable su ejecución. Si quisiera capturar al H2:

function RickMortyFn() {
  const [personajes, setPersonajes] = useState([]);
  //2- Defino el estado inicial, en este caso, un array vacío
  const [pagina, setPagina] = useState(1);
  /*9- IMP! para definir otro estado, necesito definirlo mediante otro useState, lo cual
  es lógico, porque viene con su propia función para actualizarce */
  const [elegido, setElegidos] = useState([]);
  //14- Defino otro estado, que va guardar cual es el personaje elegido

  //12-
  const subtitle = useRef();
  console.log(subtitle);

  /*4- (No lleva constructor) En el useEffect, que reemplaza al DidMount, paso el
   mismo fetch. Pero this.setState, pasa a setPersonajes, y como setPersonajes es una
   funcion exclusiva para actualizar ese estado, solo tengo que pasarle los valores.
   Por último, recordar el array vacío que le indica que se cargue solo 1 vez */
  useEffect(() => {
    console.log("%cse montó el componente", "color: green");
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        setPersonajes(data.results);
      })
      .catch((error) => console.error(error));
  }, []);

  //5- Quiero que esté pendiente del estado "personajes"
  useEffect(() => {
    console.log("%cse actualizó el componente", "color:yellow");
  }, [personajes]);

  //6-Ojo que este return, tiene que retornar UNA función
  useEffect(() => {
    return () => {
      console.log("%cse desmontó el componente", "color:red");
    };
  }, []);

  //8- cargarMas ahora pasa a ser una funcion (le antecedo el const)
  const cargarMas = async () => {
    /* 10- cambiar: this.setState a setPagina / y los this.state.pagina a  pagina*/
    await setPagina(pagina + 1);
    console.log(pagina);
    console.log(`https://rickandmortyapi.com/api/character?page=${pagina}`);
    fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`)
      .then((response) => response.json())
      .then((data) => {
        setPersonajes(data.results);
      })
      .catch((error) => console.error(error));
  };

  const cambiarH2 = () => {
    subtitle.current.style.color = "red";
    console.log(subtitle.current.innerText);
    subtitle.current.innerText = "lo cambié con useRef"
  };

  //16- la función que ejecuta el evento, cambiará el estado de "elegido", por el del input que estoy capturando
  const clickOnPersonaje = (e) => {
    e.preventDefault()
    setElegidos(e.target.personaje.value)
  }
  return (
    /* 3- Ya puedo mostrar el mismo return, con la salvedad del button (xq no definí
         aún cargarMas). y teniendo en cuenta que this.state.personajes pasa a, 
         simplemente, personajes. El array que definí de entrada */
    <div>
      {/* acá, eso de que "los botones se auto-clickean, se aprovecha para imprimir por pantalla el console.log" */}
      <button onClick={console.log(elegido)}></button>
      {/* 13- capturo el elemento. Creo el button y la funcion*/}
      <h2 ref={subtitle}> Soy el componente Rick and Morty Function</h2>
      <button onClick={cambiarH2}>Cambiar el H2</button>
      <ul>
        {personajes.length === 0 && <p>Cargando</p>}
        {personajes.map((personaje, i) => {
          return (
            <li key={i}>
              <h3>{personaje.name}</h3>
              <img src={personaje.image} alt="avatar" width={150} />
              {/* 15- La idea es la de un botón que seleccione el personaje, y eso, mediante un evento, se 
              imprima en consola. Pero con el botón solo, se renderizaba continuamente, cosas que suele
              pasar en React. Por eso siempre aconsejan hacer un form, con el evento submit. Este será una
              función, con el evento preventDefault, para evitar que se actualice la página.
              En este caso, se usa un truco de un input type hidden (que no se vea), para capturar el value
              de ese personaje en particular*/}
              <form onSubmit={clickOnPersonaje}>
                <input name="personaje" type="hidden" value={personaje.name}></input>
                <button type="submit">Clickeame</button>
              </form>
            </li>
          );
        })}
        {/* 7- ya no lleva más el "this." */}
        <button onClick={cargarMas}>Siguiente Página</button>
      </ul>
    </div>
  );
}

export default RickMortyFn;
