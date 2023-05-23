import imagen from "../assets/images/404.png";
function NotFound() {
  return (
    <div>
      <h2>404 Not Found</h2>
      <div className="card-body">
        <div className="text-center">
          <img
            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
            style={{ width: 40 + "rem" }}
            src={imagen}
            alt="Not found"
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
