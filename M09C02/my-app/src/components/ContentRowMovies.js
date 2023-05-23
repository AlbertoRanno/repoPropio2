import React from "react";
import Row from "./Row";
import PropTypes from "prop-types";

function ContentRowMovies(props) {
  return (
    <>
      {props.rows.map((row, i) => (
        <div className="col-md-4 mb-4" key={row + i}>
          <Row {...row} />
        </div>
      ))}
    </>
  );
}
ContentRowMovies.propTypes = { rows: PropTypes.array };

export default ContentRowMovies;
