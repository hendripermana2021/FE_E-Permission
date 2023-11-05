import SearchBox from "./materials/SearchBox";
import { Button } from "react-bootstrap";
import ButtonGroup from "./materials/ButtonDropdown";
function TableStudents() {
  return (
    <div className="col-lg-12 grid-margin stretch-card mt-4">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">TABEL DATA SANTRI/WATI</h4>
          <p className="card-description"></p>
          <div className="table-responsive">
            <div className="row">
              <div className="searchboxclass col-md-6">
                <SearchBox />
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                <Button variant="outline-secondary">Tambah Siswa</Button>{" "}
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Santri/wati</th>
                  <th>Tanggal Lahir</th>
                  <th>Nama Ayah</th>
                  <th>Nama Ibu</th>
                  <th>Nama Kelas</th>
                  <th>Nama Ruangan</th>
                  <th>Status</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jacob</td>
                  <td>Photoshop</td>
                  <td>Photoshop</td>
                  <td>Photoshop</td>
                  <td>Photoshop</td>
                  <td>Photoshop</td>
                  <td>Photoshop</td>
                  <td></td>
                  <td className="text-danger">
                    {" "}
                    28.76% <i className="ti-arrow-down" />
                  </td>
                  <td>
                    <ButtonGroup />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableStudents;
