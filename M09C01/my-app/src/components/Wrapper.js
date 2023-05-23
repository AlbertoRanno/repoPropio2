import React from "react";
import RowTop from "./RowTop";
import Topbar from "./Topbar";
import Footer from "./Footer";

function Wrapper() {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Topbar />
        <RowTop />
      </div>
      <Footer />
    </div>
  );
}

export default Wrapper;
