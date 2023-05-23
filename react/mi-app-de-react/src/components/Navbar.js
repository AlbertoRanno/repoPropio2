import React from "react";
import propTypes from "prop-types";

function Navbar(props) {
  return (
    <nav>
      <ul>
        {
          props.enlaces.map((unEnlace, i) => <li key={unEnlace + i}> {unEnlace} </li>)
        }
      </ul>
    </nav>
  );
}
Navbar.propTypes = { enlaces: propTypes.array}


export default Navbar;
