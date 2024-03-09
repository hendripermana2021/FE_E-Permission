import axios from "axios";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import "jquery/dist/jquery.min.js";

import InputFormEmployee from "./materials/InputFormEmployee";
import UpdateFormEmployee from "./materials/UpdateFormEmployee";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Swal from "sweetalert2";
import DetailFormEmployee from "./materials/DetailFormEmployee";

const TableEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable("#tableEmployees")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#tableEmployees").DataTable();
        }, 1000);
      });
    }

    getEmployee();
    getRoles();
  }, []);

  const getEmployee = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/api/pegawai", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setEmployee(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  const getRoles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/api/role", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setRoles(response.data.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const deleteHandler = (employes) => {
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
            .delete(
              `http://localhost:8000/v1/api/pegawai/delete/${employes.id}`
            )
            .then(() => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              getEmployee();
            });
        } catch (error) {
          console.error("Error deleting room data:", error);
          Swal.fire("Error!", "Your file has not been deleted.", "error");
        }
      }
    });
  };

  return (
    <div className="col-lg-12 grid-margin stretch-card mt-4">
      <div className="card">
        <div className="card-body">
          <h4 className="fw-bold my-3 mb-4">Table Pegawai dan Ustadz</h4>
          <InputFormEmployee roles={roles} />
          <div className="table-responsive mt-4">
            <table className="table table-hover" id="tableEmployees">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Sex</th>
                  <th>Email</th>
                  <th>Bagian</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5">Loading...</td>
                  </tr>
                ) : employee.length === 0 ? (
                  <tr>
                    <td colSpan="5">No rooms available</td>
                  </tr>
                ) : (
                  employee.map((employes, index) => (
                    <tr key={index}>
                      <td>U {index + 1}</td>
                      <td>{employes.name_pegawai}</td>
                      {employes.sex ? <td>Laki-laki</td> : <td>Perempuan</td>}
                      <td>{employes.email}</td>
                      <td>{employes.role.role_name}</td>
                      <td>
                        <DropdownButton
                          as={ButtonGroup}
                          key="end"
                          id="dropdown-button-drop-end"
                          drop="end"
                          variant="secondary"
                        >
                          <DetailFormEmployee emp={employes} />
                          <UpdateFormEmployee roles={roles} emp={employes} />

                          <button
                            className="dropdown-item"
                            onClick={() => deleteHandler(employes)}
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

export default TableEmployee;
