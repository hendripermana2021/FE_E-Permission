import axios from "axios";
import { useEffect, useState } from "react";

// for tables library
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import "jquery/dist/jquery.min.js";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";

import FormInputStudent from "./materials/InputFormStudents";
import serverDev from "../Server";
import Swal from "sweetalert2";
import UpdateFormStudents from "./materials/UpdateFormStudents";
import DetailFormStudent from "./materials/DetailFormStudent";

const TableStudents = () => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable("#tableStudents")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#tableStudents").DataTable();
        }, 1000);
      });
    }

    getStudents();
    getRooms();
  }, [students]);

  const getStudents = async () => {
    try {
      const response = await axios.get(`${serverDev}/v1/api/santri`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setStudents(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const getRooms = async () => {
    try {
      const response = await axios.get(`${serverDev}/v1/api/room`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setRooms(response.data.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const deleteHandler = async (s) => {
    Swal.fire({
      title: `Are you sure to delete ${s.name_santri}`,
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${serverDev}/v1/api/santri/delete/${s.id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          });
          Swal.fire("Deleted!", "Your data has been deleted.", "success").then(
            () => {
              getStudents();
            }
          );
        } catch (error) {
          console.error("Error deleting student data:", error);
        }
      }
    });
  };

  return (
    <section className="container-fluid col-lg-12 grid-margin stretch-card mt-4">
      <div className="card">
        <div className="card-body">
          <h4 className="fw-bold my-3 mb-4">TABEL DATA SANTRI/WATI</h4>
          <FormInputStudent rooms={rooms} />

          <div className="table-responsive mt-4">
            <table className="table table-hover" id="tableStudents">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Santri/wati</th>
                  <th>Jenis Kelamin</th>
                  <th>Nama Ruangan</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                ) : (
                  students.map((s, index) => (
                    <tr key={index}>
                      <td>S {index + 1}</td>
                      <td>{s.name_santri}</td>
                      <td>{s.sex ? "Not Published" : "Undefined Gender"}</td>
                      <td>{s.nameroom.nameroom}</td>
                      <td>{s.status ? "Active" : "In Active"}</td>
                      <td>
                        <DropdownButton
                          as={ButtonGroup}
                          key="end"
                          id="dropdown-button-drop-end"
                          drop="end"
                          variant="secondary"
                        >
                          <DetailFormStudent student={s} />
                          <UpdateFormStudents rooms={rooms} student={s} />

                          <button
                            className="dropdown-item"
                            onClick={() => deleteHandler(s)}
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
    </section>
  );
};

export default TableStudents;
