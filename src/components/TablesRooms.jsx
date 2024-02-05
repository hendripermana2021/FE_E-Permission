import { useEffect, useRef, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons";

// components
import Button from "react-bootstrap/Button";
import serverDev from "../Server";
import FormInputRooms from "./materials/InputFormROoms";
import UpdateFormRooms from "./materials/UpdateFormRooms";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";

const TableRooms = () => {
  const dataTableRef = useRef(null);

  const [rooms, setRooms] = useState([
    // Your room data
    {
      id: 1,
      nameroom: "Kamar 1",
      namaustadz: "Ustadz 1",
    },
    {
      id: 2,
      nameroom: "Kamar 2",
      namaustadz: "Ustadz 2",
    },
    {
      id: 3,
      nameroom: "Kamar 3",
      namaustadz: "Ustadz 3",
    },
  ]);
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name_pegawai: "Ustadz 1",
    },
    {
      id: 2,
      name_pegawai: "Ustadz 2",
    },
    {
      id: 3,
      name_pegawai: "Ustadz 3",
    },
  ]);

  useEffect(() => {
    $(dataTableRef.current).DataTable();
    getRoom();
    getEmployees();
  }, []);

  const getRoom = async () => {
    try {
      const response = await axios.get(`${serverDev}/v1/api/room`);
      setRooms(response.data.data);
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

  const deleteHandler = async (id, nameroom) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete " + nameroom + "!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${serverDev}/v1/api/room/${id}`);
          if (response.status === 200) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            getRoom();
          }
        } catch (error) {
          console.error("Error deleting room data:", error);
        }
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
            <table className="table table-hover" ref={dataTableRef}>
              <thead>
                <tr>
                  <th>Id Ruangan</th>
                  <th>Nama Ruangan</th>
                  <th>Nama Ustadz</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id}>
                    <td>R {room.id}</td>
                    <td>{room.nameroom}</td>
                    <td>{room.namaustadz}</td>
                    <td>
                      <div className="d-block">
                        <UpdateFormRooms room={room} emp={employees} />
                        <Button
                          variant="danger"
                          className="ms-2"
                          onClick={deleteHandler.bind(
                            this,
                            room.id,
                            room.nameroom
                          )}
                        >
                          <i className="ti-trash menu-icon" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableRooms;
