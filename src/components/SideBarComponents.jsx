import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SideBarComponents = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const decode = jwt_decode(token);
    setData(decode);
  }, []);

  return (
    <div className="sidebar sidebar-offcanvas navbar-expand-lg navbar-light ">
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
              <span className="menu-title">Employee and Teacher&apos;s</span>
            </NavLink>
          </li>
        )}

        {data.role_id === "1" && (
          <li className="nav-item">
            <NavLink to="/dashboard/kriteria" className="nav-link">
              <i className="ti-agenda menu-icon" />
              <span className="menu-title">Kriteria dan Sub-Kriteria</span>
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
  );
};

export default SideBarComponents;
