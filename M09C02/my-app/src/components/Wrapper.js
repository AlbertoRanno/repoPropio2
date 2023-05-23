import React from "react";
import RowTop from "./RowTop";
import Topbar from "./Topbar";
import Footer from "./Footer";
import Tabla from "./Tabla";

function Wrapper() {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Topbar />
        <RowTop />
      </div>
      <Tabla />
      <Footer />
    </div>
  );
}

export default Wrapper;
