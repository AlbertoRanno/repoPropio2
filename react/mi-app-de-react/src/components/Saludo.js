function Saludo(props) {
  return (
    <div>
      <h1>{props.titulo}</h1>
      <h1>{props.subtitulo}</h1>
      
    </div>
  );
}
Saludo.defaultProps = {
  titulo: "Hola Cornetas!",
  mensaje: "Saludos desde la cdth"
};


export default Saludo;
