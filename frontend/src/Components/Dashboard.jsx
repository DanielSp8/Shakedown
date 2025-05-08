import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHiking,
  faSignOutAlt,
  faSearch,
  faCampground,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const navigate = useNavigate();

  function executeLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <ul className="navbar-nav navbar-brand">
            <li className="nav-item">
              <NavLink
                to="/dashboard/home"
                className="nav-link animate menu-item"
              >
                <FontAwesomeIcon icon={faCampground} className="me-1" />
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/dashboard/profile"
                className="nav-link animate menu-item"
              >
                <FontAwesomeIcon icon={faUser} className="me-1" />
                Profile
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/dashboard/backpacks"
                className="nav-link animate menu-item"
              >
                <FontAwesomeIcon icon={faHiking} className="me-1" />
                Backpacks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/dashboard/search"
                className="nav-link animate menu-item"
              >
                <FontAwesomeIcon icon={faSearch} className="me-1" />
                Search for Gear
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav navbar-brand">
            <li className="nav-item ms-auto">
              <div className="nav-link animate menu-item">
                <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                <span className="pointer" onClick={executeLogout}>
                  Logout
                </span>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}
