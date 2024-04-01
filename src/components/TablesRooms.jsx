import axios from "axios";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import "jquery/dist/jquery.min.js";

import serverDev from "../Server";
import FormInputRooms from "./materials/InputFormRooms";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";

import Swal from "sweetalert2";
import DetailFormRoom from "./materials/DetailFormRoom";
import UpdateFormRooms from "./materials/UpdateFormRooms";
import { Spinner } from "react-bootstrap";

const TableRooms = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [rooms, setRooms] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // if (!$.fn.DataTable.isDataTable("#tableRooms")) {
    //   $(document).ready(function () {
    //     setTimeout(function () {
    //       $("#tableRooms").DataTable();
    //     }, 1000);
    //   });
    // }

    if (!$.fn.DataTable.isDataTable("#tableRooms")) {
      $(document).ready(function () {
        const tableInterval = setInterval(() => {
          if ($("#tableRooms").is(":visible")) {
            clearInterval(tableInterval);
            $("#tableRooms").DataTable();
          }
        }, 1000);
      });
    }

    getRoom();
    getEmployees();
  }, []);

  const getRoom = async () => {
    try {
      const res = await axios.get(`${serverDev}room`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setRooms(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await axios.get(`${serverDev}pegawai`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const deleteHandler = async (r) => {
    Swal.fire({
      title: `Are you sure to delete ${r.nameroom}`,
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios
            .delete(`${serverDev}room/delete/${r.id}`, {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "accessToken"
                )}`,
              },
            })
            .then(() => {
              Swal.fire("Deleted!", `Your data has been deleted.`, "success");
              getRoom();
            });
        } catch (error) {
          console.error("Error deleting room:", error);
          Swal.fire("Error!", error.message, "error");
        }
      }
    });
  };

  return (
    <div className="container-fluid table-room col-lg-12 col-sm-12 col-md-12 mt-4 ms-2">
      <div className="card table-room">
        <div className="card-body">
          <h4 className="fw-bold my-3 mb-4">Tabel Kamar Santri/wati</h4>
          <FormInputRooms emp={employees} />

          <div className="table-responsive overflow-x-auto mt-4">
            <div className="table-scroll-x">
              <table className="table table-hover" id="tableRooms">
                <thead>
                  <tr>
                    <th>Id Ruangan</th>
                    <th>Nama Ruangan</th>
                    <th>Nama Ustadz</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td className="align-items-center">
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </td>
                    </tr>
                  ) : (
                    rooms.map((r, index) => (
                      <tr key={index}>
                        <td>R {index + 1}</td>
                        <td>{r.nameroom}</td>
                        <td>
                          {r.namaustadz
                            ? r.namaustadz.name_pegawai
                            : "No Ustadz"}
                        </td>
                        <td>
                          <DropdownButton
                            as={ButtonGroup}
                            key="end"
                            id="dropdown-button-drop-end"
                            drop="end"
                            variant="secondary"
                          >
                            <DetailFormRoom room={r} />
                            <UpdateFormRooms room={r} emp={employees} />
                            <button
                              className="dropdown-item"
                              onClick={() => deleteHandler(r)}
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
    </div>
  );
};

export default TableRooms;
