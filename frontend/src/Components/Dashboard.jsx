import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../assets/css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faHiking,
  faCampground,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
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
                <FontAwesomeIcon icon={faHome} className="me-1" />
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
                to="/dashboard/trails"
                className="nav-link animate menu-item"
              >
                <FontAwesomeIcon icon={faCampground} className="me-1" />
                Trails
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/dashboard/backpack"
                className="nav-link animate menu-item"
              >
                <FontAwesomeIcon icon={faHiking} className="me-1" />
                Gear List
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav navbar-brand">
            <li className="nav-item ms-auto">
              <NavLink to="/" className="nav-link animate menu-item">
                <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                Logout
              </NavLink>
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
