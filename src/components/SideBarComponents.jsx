import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

const SideBarComponents = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    const decode = jwt_decode(token);

    setData(decode);
  }, []);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="/dashboard">
            <i className="ti-shield menu-icon" />
            <span className="menu-title">Dashboard</span>
          </a>
        </li>

        {data.role_id == "1" ? (
          <li className="nav-item">
            <a className="nav-link" href="/dashboard/roompage">
              <i className="ti-pencil-alt menu-icon" />
              <span className="menu-title">Student Room&apos;s</span>
            </a>
          </li>
        ) : (
          ""
        )}
        {data.role_id == "2" || data.role_id == "1" ? (
          <li className="nav-item">
            <a className="nav-link" href="/dashboard/students">
              <i className="ti-file menu-icon" />
              <span className="menu-title">Student&apos;s Data</span>
            </a>
          </li>
        ) : (
          ""
        )}

        {data.role_id == "1" ? (
          <li className="nav-item">
            <a className="nav-link" href="/dashboard/employes">
              <i className="ti-agenda menu-icon" />
              <span className="menu-title">Employee and Teacher&apos;s</span>
            </a>
          </li>
        ) : (
          ""
        )}

        {data.role_id == "1" ? (
          <li className="nav-item">
            <a className="nav-link" href="/dashboard/kriteria">
              <i className="ti-agenda menu-icon" />
              <span className="menu-title">Kriteria dan Sub-Kriteria</span>
            </a>
          </li>
        ) : (
          ""
        )}

        {data.role_id == "2" || data.role_id == "1" ? (
          <li className="nav-item">
            <a className="nav-link" href="/dashboard/permission">
              <i className="ti-ruler-pencil menu-icon" />
              <span className="menu-title">Permission</span>
            </a>
          </li>
        ) : (
          ""
        )}
        {data.role_id == "2" || data.role_id == "1" ? (
          <li className="nav-item">
            <a className="nav-link" href="/dashboard/cpi-calculated">
              <i className="ti-star menu-icon" />
              <span className="menu-title">Calculated</span>
            </a>
          </li>
        ) : (
          ""
        )}
        {data.role_id == "1" || data.role_id == "3" ? (
          <li className="nav-item">
            <a className="nav-link" href="/dashboard/approval">
              <i className="ti-check menu-icon" />
              <span className="menu-title">Approval</span>
            </a>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};

export default SideBarComponents;
