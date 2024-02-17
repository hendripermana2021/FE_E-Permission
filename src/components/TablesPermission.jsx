import ButtonGroup from "./materials/ButtonDropdown";
import SearchBox from "./materials/SearchBox";
import { useEffect, useState } from "react";
import axios from "axios";
import FormInputPermission from "./materials/InputFormPermission";

const TablePermission = () => {
  const [permission, setPermission] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPermission();
    console.log(getPermission);
  }, []);

  const getPermission = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/v1/api/permission/all"
      );
      setPermission(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid col-lg-12 col-md-12 grid-margin stretch-card mt-4">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Tabel Permission Santri/ Wati</h3>
          <div className="table-responsive">
            <div className="row">
              <div className="searchboxclass col-md-6">
                <SearchBox />
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                <FormInputPermission />
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Santri/wati</th>
                  <th>Date From</th>
                  <th>Until Date</th>
                  <th>Score</th>
                  <th>Code</th>
                  <th>Permission Status</th>
                  <th>Created By</th>
                  <th>Val. Go By</th>
                  <th>Val. Back By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5">Loading...</td>
                  </tr>
                ) : permission.length === 0 ? (
                  <tr>
                    <td colSpan="5">No rooms available</td>
                  </tr>
                ) : (
                  permission.map((permissions, index) => (
                    <tr key={permissions.id}>
                      <td>{index + 1}</td>

                      <td>{permissions.start_permission}</td>
                      <td>{permissions.end_permission}</td>
                      <td>{permissions.cpi_result}</td>
                      <td>{permissions.validation_code}</td>
                      {permissions.permission_status == false &&
                      permissions.val_go_name === null ? (
                        <td>No Used</td>
                      ) : permissions.permission_status == true &&
                        permissions.val_back_name === null ? (
                        <td>Active</td>
                      ) : permissions.val_back_name != null ? (
                        <td>No Active</td>
                      ) : (
                        <td>--</td>
                      )}
                      <td>{permissions.created_permission.name_pegawai}</td>
                      {permissions.val_go_name === null ? (
                        <td>--</td>
                      ) : (
                        <td>{permissions.val_go_name.name_pegawai}</td>
                      )}
                      {/* asdasd */}
                      {permissions.val_back_name === null ? (
                        <td>--</td>
                      ) : (
                        <td>{permissions.val_back_name.name_pegawai}</td>
                      )}
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

export default TablePermission;
