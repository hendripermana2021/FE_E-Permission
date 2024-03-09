import logobrand from "../assets/img/logoepermission.png";
import "../dist/css/material.css";

import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const NavbarAdminComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    const decode = jwt_decode(token);

    setData(decode);
  }, []);

  const logoutHandler = async () => {
    try {
      await axios.delete("http://localhost:8000/v1/api/logout", {
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
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo me-5" href="/admin">
          <img
            src={logobrand}
            className="me-2"
            alt="logo"
            style={{ width: "2.2em" }}
          />
        </a>
        <a className="navbar-brand brand-logo-mini" href="/admin">
          <img src={logobrand} alt="logo" />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
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
              <a className="dropdown-item">
                <i className="ti-settings text-primary" />
                Settings
              </a>
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
          data-toggle="offcanvas"
        >
          <span className="ti-view-list" />
        </button>
      </div>
    </nav>
  );
};

export default NavbarAdminComponent;
