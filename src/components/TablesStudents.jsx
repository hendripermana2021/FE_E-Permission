import SearchBox from "./materials/SearchBox";
import ButtonGroup from "./materials/ButtonDropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import FormInputStudent from "./materials/InputFormStudents";

const TableStudents = () => {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudent();
  }, []);

  const getStudent = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/api/santri");
      setStudent(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };
  return (
    <div className="container-fluid col-lg-12 grid-margin stretch-card mt-4">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">TABEL DATA SANTRI/WATI</h4>
          <p className="card-description"></p>
          <div className="table-responsive">
            <div className="row">
              <div className="searchboxclass col-md-7">
                <SearchBox />
              </div>
              {/* Modal Input Form */}
              <div className="col-md-5 d-flex justify-content-end">
                <FormInputStudent />
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Santri/wati</th>
                  <th>Sex</th>
                  <th>Nama Ayah</th>
                  <th>Nama Ibu</th>
                  <th>Nama Ruangan</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5">Loading...</td>
                  </tr>
                ) : student.length === 0 ? (
                  <tr>
                    <td colSpan="5">No rooms available</td>
                  </tr>
                ) : (
                  student.map((students, index) => (
                    <tr key={students.id}>
                      <td>{index + 1}</td>
                      <td>{students.name_santri}</td>
                      {students.sex ? <td>Laki-laki</td> : <td>Perempuan</td>}
                      <td>{students.fathername}</td>
                      <td>{students.mothername}</td>
                      <td>{students.nameroom.walikamar.name_pegawai}</td>
                      {students.status ? <td>Aktif</td> : <td>Tidak Aktif</td>}
                      <td>
                        <ButtonGroup />
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
export default TableStudents;
