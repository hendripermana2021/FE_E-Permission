import axios from "axios";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import "jquery/dist/jquery.min.js";
import Layout from "../Layout";

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
      const response = await axios.get(
        "http://localhost:8000/v1/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h3 className="fw-bold my-3 mb-4">E - Permission Dashboard</h3>

        <div className="row mt-4">
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Total Santri / Alternatif</h4>
                <p style={{ fontSize: "40px", marginTop: "20px" }}>
                  {data.santri}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Total Ustadz/ah</h4>
                <p style={{ fontSize: "40px", marginTop: "20px" }}>
                  {data.pegawai}
                </p>
              </div>
            </div>
          </div>

          {user.role_id == "1" ? (
            <div className="col-md-3 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Total Kriteria</h4>
                  <p style={{ fontSize: "40px", marginTop: "20px" }}>
                    {data.kriteria}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {user.role_id == "1" ? (
            <div className="col-md-3 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Total Ruangan</h4>
                  <p style={{ fontSize: "40px", marginTop: "20px" }}>
                    {data.room ? data.room : "0"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <h3 className="fw-bold my-3 mb-4">Details Activity Santri</h3>
        <div className="card">
          <div className="card-body">
            <div className="row mt-3">
              <div className="col-md-3 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Santri Aktif</h4>
                    <p style={{ fontSize: "40px", marginTop: "20px" }}>
                      {data.santriActive}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-3 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Santri Non Aktif</h4>
                    <p style={{ fontSize: "40px", marginTop: "20px" }}>
                      {data.santriNonActive}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {user.role_id == "1" ? (
              <div>
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
                        data.notif.map((n, index) => (
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
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
