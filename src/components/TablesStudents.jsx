import axios from "axios";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import { useEffect, useRef, useState } from "react";
import FormInputStudent from "./materials/InputFormStudents";

import serverDev from "../Server";

const TableStudents = () => {
  const dataTableRef = useRef(null);
  const [students, setStudents] = useState();
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
            <table className="table table-hover">
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
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableStudents;
