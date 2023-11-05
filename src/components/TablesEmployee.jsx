import SearchBox from "./materials/SearchBox";
import ButtonGroup from "./materials/ButtonDropdown";
import { Button } from "react-bootstrap";

function TableEmployee() {
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
                <Button variant="outline-secondary">Tambah Data</Button>{" "}
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Tanggal Lahir</th>
                  <th>Password</th>
                  <th>Job Desk</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jacob</td>
                  <td>Photoshop</td>
                  <td>Photoshop</td>
                  <td>Photoshop</td>
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

export default TableEmployee;
