import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../assets/css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faHiking,
  faCampground,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <div className="row">
            <div className="col">
              <NavLink to="/dashboard/home" className="navbar-brand">
                <FontAwesomeIcon icon={faHome} className="me-2" /> Home
              </NavLink>
            </div>
            <div className="col">
              <NavLink to="/dashboard/profile" className="navbar-brand">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Profile
              </NavLink>
            </div>
            <div className="col">
              <NavLink to="/dashboard/trails" className="navbar-brand">
                <FontAwesomeIcon icon={faCampground} className="me-2" />
                Trails
              </NavLink>
            </div>
            <div className="col">
              <NavLink to="/dashboard/backpack" className="navbar-brand">
                <FontAwesomeIcon icon={faHiking} className="me-2" />
                Gear List
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}
