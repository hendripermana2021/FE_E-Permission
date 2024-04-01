import axios from "axios";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import "jquery/dist/jquery.min.js";
import serverDev from "../Server";

import InputFormPermission from "./materials/InputFormPermission";

import Swal from "sweetalert2";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import DetailFormPermission from "./materials/DetailFormPermission";
import UpdateFormPermission from "./materials/UpdateFormPermission";

const TablePermission = () => {
  const [permission, setPermission] = useState([]);
  const [users, setUsers] = useState([]);
  const [kriteria, setKriteria] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSantri();
    getKriteria();
  }, []);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable("#tablePermission")) {
      $(document).ready(function () {
        const tableInterval = setInterval(() => {
          if ($("#tablePermission").is(":visible")) {
            clearInterval(tableInterval);
            $("#tablePermission").DataTable();
          }
        }, 1000);
      });
    }

    getPermission();
  }, []);

  const getPermission = async () => {
    try {
      const response = await axios.get(`${serverDev}permission/all`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setPermission(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  const getSantri = async () => {
    try {
      const response = await axios.get(`${serverDev}santri`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  const getKriteria = async () => {
    try {
      const res = await axios.get(`${serverDev}kriteria`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      setKriteria(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  const deleteHandler = async (p) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios
            .delete(`${serverDev}permission/delete/${p.id}`, {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "accessToken"
                )}`,
              },
            })
            .then(() => {
              Swal.fire(
                "Deleted!",
                "Your data has been deleted.",
                "success"
              ).then(() => {
                getPermission();
              });
            });
        } catch (error) {
          console.error("Error deleting data:", error);
        }
      }
    });
  };

  return (
    <div className="container-fluid col-lg-12 col-sm-12 col-md-12 grid-margin stretch-card mt-4 ms-2">
      <div className="card">
        <div className="card-body">
          <h4 className="fw-bold my-3 mb-4">Table Permission</h4>
          <InputFormPermission users={users} kriterias={kriteria} />
          <div className="table-responsive mt-4">
            <table className="table table-hover" id="tablePermission">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Santri/wati</th>
                  <th>Date From</th>
                  <th>Until Date</th>
                  <th className="text-center">Permission Status</th>
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
                      <td>{new Date(p.start_permission).toLocaleString()}</td>
                      <td>{new Date(p.end_permission).toLocaleString()}</td>
                      <td className="text-center">
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
                      <td>
                        <DropdownButton
                          as={ButtonGroup}
                          key="end"
                          id="dropdown-button-drop-end"
                          drop="end"
                          variant="secondary"
                        >
                          <DetailFormPermission permission={p} />

                          <UpdateFormPermission
                            permission={p}
                            users={users}
                            kriterias={kriteria}
                          />

                          <button
                            className="dropdown-item"
                            onClick={() => deleteHandler(p)}
                          >
                            <i className="ti-trash menu-icon me-2" />
                            Delete
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
  );
};

export default TablePermission;
