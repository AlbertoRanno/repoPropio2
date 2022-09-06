
import Banner from "./Banner";
import Encabezado from "./Encabezado";
import Footer from "./Footer";
import Producto from "./Producto";

function Web() {
  return (
    <div className="container">
      <Encabezado />
      <Banner />
      <Producto />
      <Footer />
    </div>
  );
}
export default Web;
