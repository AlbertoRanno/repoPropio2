import React from "react";
import image from "../assets/images/logo-DH.png";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <React.Fragment>
      {/*<!-- Sidebar -->*/}
      <ul
        className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/*<!-- Sidebar - Brand -->*/}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <div className="sidebar-brand-icon">
            <img className="w-100" src={image} alt="Digital House" />
          </div>
        </a>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - Dashboard -->*/}
        <li className="nav-item active">
          <Link to="/Chart" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard - DH movies</span>
          </Link>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider" />

        {/*<!-- Heading -->*/}
        <div className="sidebar-heading">Actions</div>

        {/*<!-- Nav Item - Pages -->*/}

        <li className="nav-item">
          <Link
            to="/GenresInDb"
            
            className="nav-link collapsed"
          >
            <i className="fas fa-fw fa-folder"></i>
            <span>Géneros</span>
          </Link>
        </li>

        {/*<!-- Nav Item - Charts -->*/}
        <li className="nav-item">
          <Link
            to="/LastMovieInDb"
            
            className="nav-link"
          >
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Último lanzamiento</span>
          </Link>
        </li>

        {/*<!-- Nav Item - Tables -->*/}
        <li className="nav-item">
          <Link to="/ContentRowMovies" className="nav-link">
            <i className="fas fa-fw fa-table"></i>
            <span>Resumen base de datos</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/SearchMovies" className="nav-link">
            <i className="fas fa-fw fa-table"></i>
            <span>Buscar peliculas</span>
          </Link>
        </li>
        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
      {/*<!-- End of Sidebar -->*/}
    </React.Fragment>
  );
}
export default SideBar;
