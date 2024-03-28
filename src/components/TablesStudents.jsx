import axios from "axios";
import { useEffect, useState } from "react";

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
import Spinner from "react-bootstrap/Spinner";

const TableStudents = () => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable("#tableSantris")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#tableSantris").DataTable();
        }, 1000);
      });
    }

    getStudents();
    getRooms();
  }, []);

  const getStudents = async () => {
    try {
      const response = await axios.get(`${serverDev}santri`, {
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
      const response = await axios.get(`${serverDev}room`, {
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
          await axios.delete(`${serverDev}/santri/delete/${s.id}`, {
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
    <section className="container-fluid col-lg-12 col-sm-12 col-md-12 mt-4 ms-2">
      <div className="card ">
        <div className="card-body">
          <h4 className="fw-bold my-3 mb-4">TABEL DATA SANTRI/WATI</h4>
          <FormInputStudent rooms={rooms} />
          <div className="table-responsive  overflow-x-auto mt-4">
            <table className="table table-hover " id="tableSantris">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Santri/wati</th>
                  <th>Nama Ayah</th>
                  <th>Nama Ibu</th>
                  <th>Jenis Kelamin</th>
                  <th>Nama Ruangan</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  students.map((s, index) => (
                    <tr key={index}>
                      <td>A {index + 1}</td>
                      <td>{s.name_santri}</td>
                      <td>{s.fathername}</td>
                      <td>{s.mothername}</td>
                      <td>{s.sex ? "Laki - Laki" : "Perempuan"}</td>
                      <td>
                        {s.nameroom == null
                          ? "Room Not Found"
                          : s.nameroom.nameroom}
                      </td>
                      <td>
                        {s.status === true ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-danger">Non-Active</span>
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
