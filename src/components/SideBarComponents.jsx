import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const SideBarComponents = () => {
  const token = sessionStorage.getItem("accessToken");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="/dashboard">
            <i className="ti-shield menu-icon" />
            <span className="menu-title">Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/roompage">
            <i className="ti-pencil-alt menu-icon" />
            <span className="menu-title">Student Room&apos;s</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/students">
            <i className="ti-file menu-icon" />
            <span className="menu-title">Student&apos;s Data</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/employes">
            <i className="ti-agenda menu-icon" />
            <span className="menu-title">Employee and Teacher&apos;s</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/kriteria">
            <i className="ti-agenda menu-icon" />
            <span className="menu-title">Kriteria dan Sub-Kriteria</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/permission">
            <i className="ti-ruler-pencil menu-icon" />
            <span className="menu-title">Permission</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/cpi-calculated">
            <i className="ti-star menu-icon" />
            <span className="menu-title">Calculated</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard/approval">
            <i className="ti-check menu-icon" />
            <span className="menu-title">Approval</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideBarComponents;
