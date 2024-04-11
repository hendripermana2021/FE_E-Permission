// NavbarAdminComponent.js

import logobrand from "../assets/img/logoepermission.png";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import serverDev from "../Server";

const OffCanvasExample = ({ name, ...props }) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <i className="ti-user"></i>
                Welcome, {data.name_pegawai}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#" onClick={logoutHandler}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <Button
          variant="outline-secondary d-lg-none align-self-center"
          onClick={handleShow}
          style={{ BorderColor: "none" }}
        >
          <span className="ti-view-list" />
        </Button>

        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <h5 id="offcanvasRightLabel">E-PERMISSION</h5>
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvas-body sidebar">
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
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </nav>
  );
};

const NavbarAdminComponent = () => {
  return (
    <>
      {["end"].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
};

export default NavbarAdminComponent;
