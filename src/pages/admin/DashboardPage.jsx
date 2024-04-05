import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "../../dist/css/dashboard.css";
import $ from "jquery";
import "jquery/dist/jquery.min.js";
import Layout from "../Layout";
import serverDev from "../../Server";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable("#dashboard")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#dashboard").DataTable();
        }, 1000);
      });
    }
    const token = sessionStorage.getItem("accessToken");
    const decode = jwtDecode(token);
    setUser(decode);

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${serverDev}dashboard`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h4 className="fw-bold my-3 mb-4 pt-4">E - Permission Dashboard</h4>

        <div className="row dasboard-card mt-4">
          <div className="col-md-3 col-sm-6 col-sm-2 mb-3">
            <Link
              to="/dashboard/students"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card shadow">
                <div className="card-body">
                  <h4 className="card-title">Total Santri/ wati</h4>
                  <p className="card-text" style={{ fontSize: "40px" }}>
                    {data.santri}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {user.role_id === "1" ? (
            <div className="col-md-3 col-sm-6 mb-3">
              <Link
                to="/dashboard/employes"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card shadow">
                  <div className="card-body">
                    <h4 className="card-title">Total Pegawai</h4>
                    <p className="card-text" style={{ fontSize: "40px" }}>
                      {data.pegawai}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            <div className="col-md-3 col-sm-6 mb-3">
              <div className="card shadow">
                <div className="card-body">
                  <h4 className="card-title">Total Pegawai</h4>
                  <p className="card-text" style={{ fontSize: "40px" }}>
                    {data.pegawai}
                  </p>
                </div>
              </div>
            </div>
          )}

          {user.role_id === "1" && (
            <>
              <div className="col-md-3 col-sm-6 mb-3">
                <Link
                  to="/dashboard/kriteria"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card shadow">
                    <div className="card-body">
                      <h4 className="card-title">Total Kriteria</h4>
                      <p className="card-text" style={{ fontSize: "40px" }}>
                        {data.kriteria ? data.kriteria : "0"}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-3 col-sm-6 mb-3">
                <Link
                  to="/dashboard/roompage"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card shadow">
                    <div className="card-body">
                      <h4 className="card-title">Total Ruangan</h4>
                      <p className="card-text" style={{ fontSize: "40px" }}>
                        {data.room ? data.room : "0"}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>

        <h4 className="fw-bold my-3 mb-4">Details Activity Santri</h4>
        <div className="card shadow">
          <div className="card-body">
            <div className="row mt-3">
              <div className="col-md-3 col-sm-6 mb-3">
                <div className="card shadow">
                  <div className="card-body">
                    <h4 className="card-title">Santri Aktif</h4>
                    <p className="card-text" style={{ fontSize: "40px" }}>
                      {data.santriActive}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 mb-3">
                <div className="card shadow">
                  <div className="card-body">
                    <h4 className="card-title">Santri Non Aktif</h4>
                    <p className="card-text" style={{ fontSize: "40px" }}>
                      {data.santriNonActive}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {user.role_id === "1" && (
              <>
                <h4 className="fw-bold">Activity Details</h4>
                <div className="table-responsive mt-4">
                  <table className="table table-hover" id="dashboard">
                    <thead>
                      <tr align="center">
                        <th>#</th>
                        <th>Deskripsi</th>
                        <th>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan="5">Loading...</td>
                        </tr>
                      ) : (
                        data.sortfill_notif.map((n, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{n.message}</td>
                            <td>{new Date(n.updatedAt).toLocaleString()}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
