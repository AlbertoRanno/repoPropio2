import React from "react";
import PropTypes from "prop-types";

function Row(props) {
  return (
    <div >
      <div className={props.colorDeBorde}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                {props.titulo}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {props.cifra}
              </div>
            </div>
            <div className="col-auto">
              <i className={props.icono}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Row.propTypes = {
  titulo: PropTypes.string.isRequired,
  colorDeBorde: PropTypes.oneOf([
    "card border-left-primary shadow h-100 py-2",
    "card border-left-success shadow h-100 py-2",
    "card border-left-warning shadow h-100 py-2",
  ]).isRequired,
  cifra: PropTypes.number.isRequired,
  icono: PropTypes.oneOf([
    "fas fa-film fa-2x text-gray-300",
    "fas fa-award fa-2x text-gray-300",
    "fas fa-user fa-2x text-gray-300",
  ]).isRequired,
};
Row.defaultProps = {
  titulo: "A completar",
  colorDeBorde: "card border-left-primary shadow h-100 py-2",
  cifra: 0,
  icono: "fas fa-film fa-2x text-gray-300",
};
export default Row;
