import axios from "axios";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import { useEffect, useRef, useState } from "react";
import FormInputStudent from "./materials/InputFormStudents";

import serverDev from "../Server";
import UpdateFromStudents from "./materials/UpdateFromStudents";

const TableStudents = () => {
  const dataTableRef = useRef(null);
  const [students, setStudents] = useState([
    {
      id: 1,
      nama_santri: "Santri 1",
      jenis_kelamin: "Laki-laki",
      nama_ayah: "Ayah 1",
      nama_ibu: "Ibu 1",
      nama_ruangan: "Ruangan 1",
      tgl_lahir: "2021-08-01",
      status: "Aktif",
      rooms: {
        id: 1,
        nama_ruangan: "Ruangan 1",
      },
    },
    {
      id: 2,
      nama_santri: "Santri 2",
      jenis_kelamin: "Perempuan",
      nama_ayah: "Ayah 2",
      nama_ibu: "Ibu 2",
      nama_ruangan: "Ruangan 2",
      tgl_lahir: "2021-08-01",
      status: "Aktif",
      rooms: {
        id: 2,
        nama_ruangan: "Ruangan 2",
      },
    },
    {
      id: 3,
      nama_santri: "Santri 3",
      jenis_kelamin: "Laki-laki",
      nama_ayah: "Ayah 3",
      nama_ibu: "Ibu 3",
      nama_ruangan: "Ruangan 3",
      tgl_lahir: "2021-08-01",
      status: "Aktif",
      rooms: {
        id: 3,
        nama_ruangan: "Ruangan 3",
      },
    },
  ]);
  const [rooms, setRooms] = useState([
    {
      id: 1,
      nama_ruangan: "Ruangan 1",
    },
    {
      id: 2,
      nama_ruangan: "Ruangan 2",
    },
    {
      id: 3,
      nama_ruangan: "Ruangan 3",
    },
  ]);

  useEffect(() => {
    $(dataTableRef.current).DataTable();
    getStudents();
    getRooms();
  }, []);

  const getStudents = async () => {
    try {
      const response = await axios.get(`${serverDev}/v1/api/santri`);
      setStudents(response.data.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const getRooms = async () => {
    try {
      const response = await axios.get(`${serverDev}/v1/api/ruangan`);
      setRooms(response.data.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  return (
    <section className="container-fluid col-lg-12 grid-margin stretch-card mt-4">
      <div className="card">
        <div className="card-body">
          <h4 className="fw-bold my-3 mb-4">TABEL DATA SANTRI/WATI</h4>
          <FormInputStudent rooms={rooms} />

          <div className="table-responsive mt-4">
            <table className="table table-hover" ref={dataTableRef}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Santri/wati</th>
                  <th>Jenis Kelamin</th>
                  <th>Nama Ayah</th>
                  <th>Nama Ibu</th>
                  <th>Nama Ruangan</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <tr key={index}>
                      <td>S {student.id}</td>
                      <td>{student.nama_santri}</td>
                      <td>{student.jenis_kelamin}</td>
                      <td>{student.nama_ayah}</td>
                      <td>{student.nama_ibu}</td>
                      <td>{student.nama_ruangan}</td>
                      <td>{student.status}</td>
                      <td>
                        <UpdateFromStudents rooms={rooms} student={student} />
                        <button className="btn btn-danger">
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No student data available.
                    </td>
                  </tr>
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
