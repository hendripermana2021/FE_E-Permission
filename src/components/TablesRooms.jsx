import axios from "axios";
import { useEffect, useState } from "react";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import "jquery/dist/jquery.min.js";

import serverDev from "../Server";
import FormInputRooms from "./materials/InputFormROoms";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";

import Swal from "sweetalert2";
import DetailFormRoom from "./materials/DetailFormRoom";
import UpdateFormRooms from "./materials/UpdateFormRooms";

const TableRooms = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [rooms, setRooms] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable("#tableRooms")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#tableRooms").DataTable();
        }, 1000);
      });
    }

    getRoom();
    getEmployees();
  }, [rooms]);

  const getRoom = async () => {
    try {
      const res = await axios.get(`${serverDev}/v1/api/room`);
      setRooms(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await axios.get(`${serverDev}/v1/api/pegawai`);
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
            .delete(`${serverDev}/v1/api/room/delete/${r.id}`, {
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data is safe :)", "error");
      }
    });
  };

  return (
    <div className="container-fluid col-lg-12 grid-margin stretch-card mt-4">
      <div className="card">
        <div className="card-body">
          <h3 className="fw-bold my-3 mb-4">Tabel Kamar Santri/wati</h3>
          <FormInputRooms emp={employees} />

          <div className="table-responsive mt-4">
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
                    <td colSpan="4" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  rooms.map((r, index) => (
                    <tr key={index}>
                      <td>R {index + 1}</td>
                      <td>{r.nameroom}</td>
                      <td>
                        {/* If name_pegawai is null */}
                        {r.namaustadz ? r.namaustadz.name_pegawai : "No Ustadz"}
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
  );
};

export default TableRooms;
