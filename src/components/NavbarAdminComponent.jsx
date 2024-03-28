// NavbarAdminComponent.js

import logobrand from "../assets/img/logoepermission.png";
import "../dist/css/material.css";
import { NavLink } from "react-router-dom";

import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import serverDev from "../Server";

const NavbarAdminComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    const decode = jwt_decode(token);

    setData(decode);
  }, []);

  const logoutHandler = async () => {
    try {
      await axios.delete(`${serverDev}logout`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      sessionStorage.removeItem("accessToken");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar col-lg-12 col-md-12 p-0 d-flex flex-row">
      <div
        className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center"
        style={{ zIndex: "1000" }}
      >
        <a className="navbar-brand brand-logo me-5" href="/dashboard">
          <img
            src={logobrand}
            className="me-2"
            alt="logo"
            style={{ width: "2.2em" }}
          />
        </a>
        <a className="navbar-brand brand-logo-mini" href="/dashboard">
          <img src={logobrand} alt="logo" />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button
          className="navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span className="ti-view-list" />
        </button>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
              id="profileDropdown"
            >
              <i className="ti-user"></i>
              Welcome, {data.name_pegawai}
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="profileDropdown"
            >
              <button className="dropdown-item" onClick={logoutHandler}>
                <i className="ti-power-off text-primary" />
                Logout
              </button>
            </div>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <span className="ti-view-list" />
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasRightLabel">E-PERMISSION</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body sidebar ">
            <ul className="nav " id="sidebar">
              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link">
                  <i className="ti-shield menu-icon" />
                  <span className="menu-title">Dashboard</span>
                </NavLink>
              </li>

              {data.role_id === "1" && (
                <li className="nav-item">
                  <NavLink to="/dashboard/roompage" className="nav-link">
                    <i className="ti-pencil-alt menu-icon" />
                    <span className="menu-title">Student Room&apos;s</span>
                  </NavLink>
                </li>
              )}

              {(data.role_id === "2" || data.role_id === "1") && (
                <li className="nav-item">
                  <NavLink to="/dashboard/students" className="nav-link">
                    <i className="ti-file menu-icon" />
                    <span className="menu-title">Student&apos;s Data</span>
                  </NavLink>
                </li>
              )}

              {data.role_id === "1" && (
                <li className="nav-item">
                  <NavLink to="/dashboard/employes" className="nav-link">
                    <i className="ti-agenda menu-icon" />
                    <span className="menu-title">
                      Employee and Teacher&apos;s
                    </span>
                  </NavLink>
                </li>
              )}

              {data.role_id === "1" && (
                <li className="nav-item">
                  <NavLink to="/dashboard/kriteria" className="nav-link">
                    <i className="ti-agenda menu-icon" />
                    <span className="menu-title">
                      Kriteria dan Sub-Kriteria
                    </span>
                  </NavLink>
                </li>
              )}

              {(data.role_id === "2" || data.role_id === "1") && (
                <li className="nav-item">
                  <NavLink to="/dashboard/permission" className="nav-link">
                    <i className="ti-ruler-pencil menu-icon" />
                    <span className="menu-title">Permission</span>
                  </NavLink>
                </li>
              )}

              {(data.role_id === "2" || data.role_id === "1") && (
                <li className="nav-item">
                  <NavLink to="/dashboard/cpi-calculated" className="nav-link">
                    <i className="ti-star menu-icon" />
                    <span className="menu-title">Calculated</span>
                  </NavLink>
                </li>
              )}

              {(data.role_id === "1" || data.role_id === "3") && (
                <li className="nav-item">
                  <NavLink to="/dashboard/approval" className="nav-link">
                    <i className="ti-check menu-icon" />
                    <span className="menu-title">Approval</span>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdminComponent;
