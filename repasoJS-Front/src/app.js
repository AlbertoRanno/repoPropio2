/*****************  requires  *****************/
const express = require("express");
const app = express();

/*****************  view engine setup  *****************/
app.set("view engine", "ejs");
app.set("views", "./src/views");

/*****************  middlewares  ***************/
app.use(express.static("./public"));

/*****************  Routers  ***************/
const routerMain = require("./routes/main.js");

app.use("/", routerMain);

/*****************  listen  ***************/
const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`El servidor se esta escuchando en el puerto ${PUERTO}...`);
});
