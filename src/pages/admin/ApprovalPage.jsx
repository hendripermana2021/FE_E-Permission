import Layout from "../Layout";
import axios from "axios";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import "jquery/dist/jquery.min.js";

import Swal from "sweetalert2";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import DetailFormPermission from "../../components/materials/DetailFormPermission";

const ApprovalPage = () => {
  const [permission, setPermission] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable("#tablePermission")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#tablePermission").DataTable();
        }, 1000);
      });
    }

    getPermission();
  }, []);

  const getPermission = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/v1/api/permission/notRejected",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setPermission(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  const approveHandler = async (p) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `http://localhost:8000/v1/api/validation-go/${p.id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "accessToken"
                )}`,
              },
            }
          );
          Swal.fire(
            "Approved!",
            "Permission has been approved.",
            "success"
          ).then(() => {
            getPermission();
          });
        } catch (error) {
          console.error("Error approving permission:", error);
          Swal.fire("Error!", "Error approving permission.", "error");
        }
      }
    });
  };

  const rejectHandler = async (p) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(
            `http://localhost:8000/v1/api/validation-back/${p.id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "accessToken"
                )}`,
              },
            }
          );
          Swal.fire(
            "Confirm Santri/wati Back!",
            "Permission has been Non Activated.",
            "success"
          ).then(() => {
            getPermission();
          });
        } catch (error) {
          console.error("Error rejecting permission:", error);
          Swal.fire("Error!", "Error rejecting permission.", "error");
        }
      }
    });
  };

  return (
    <Layout>
      <div className="container-fluid col-lg-12 grid-margin stretch-card mt-4">
        <div className="card">
          <div className="card-body">
            <h3 className="fw-bold my-3 mb-4">
              Tabel Validasi Izin dan Kembali Santri/Wati
            </h3>

            <div className="table-responsive mt-4">
              <table className="table table-hover" id="tableRooms">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Santri</th>
                    <th>Pemberi Izin</th>
                    <th>Sampai</th>
                    <th>Status Permission</th>
                    <th>Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" align="center">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    permission.map((p, index) => (
                      <tr key={index}>
                        <td>P {index + 1}</td>
                        <td>{p.namasantri.name_santri}</td>
                        <td>{p.created_permission.name_pegawai}</td>
                        <td>{new Date(p.end_permission).toLocaleString()}</td>
                        <td>
                          {p.permission_status === 1 ? (
                            <span className="badge bg-success">Aktif</span>
                          ) : p.permission_status === 2 ? (
                            <span className="badge bg-warning">Progress</span>
                          ) : p.permission_status === 0 ? (
                            <span className="badge bg-danger">Tidak Aktif</span>
                          ) : (
                            <span className="badge bg-danger">Rejected</span>
                          )}
                        </td>
                        <td>{(p.cpi_result * 100).toFixed(2)}%</td>
                        <td>
                          <DropdownButton
                            as={ButtonGroup}
                            key="end"
                            id="dropdown-button-drop-end"
                            drop="end"
                            variant="secondary"
                          >
                            <DetailFormPermission permission={p} />

                            <button
                              className="dropdown-item"
                              onClick={() => approveHandler(p)}
                            >
                              <i className="ti-check menu-icon me-2" />
                              Confirm
                            </button>

                            <button
                              className="dropdown-item"
                              onClick={() => rejectHandler(p)}
                            >
                              <i className="ti-close menu-icon me-2" />
                              Back
                            </button>
                          </DropdownButton>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApprovalPage;
