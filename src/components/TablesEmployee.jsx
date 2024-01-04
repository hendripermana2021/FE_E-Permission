import SearchBox from "./materials/SearchBox";
import ButtonGroup from "./materials/ButtonDropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import FormInputEmployee from "./materials/InputFormEmployee";

const TableEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/api/pegawai");
      setEmployee(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-12 grid-margin stretch-card mt-4">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Data Employee and Teacher&apos;s</h4>
          <div className="table-responsive">
            <div className="row">
              <div className="searchboxclass col-md-6">
                <SearchBox />
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                <FormInputEmployee />
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Sex</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Bagian</th>
                  <th>Action</th>
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
                    <tr key={employes.id}>
                      <td>{index + 1}</td>
                      <td>{employes.name_pegawai}</td>
                      {employes.sex ? <td>Laki-laki</td> : <td>Perempuan</td>}
                      <td>{employes.email}</td>
                      <td>{employes.real_password}</td>
                      <td>{employes.role.role_name}</td>
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

export default TableEmployee;
