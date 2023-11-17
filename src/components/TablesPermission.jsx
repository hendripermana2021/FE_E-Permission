import ButtonGroup from "./materials/ButtonDropdown";
import SearchBox from "./materials/SearchBox";
import FormClass from "./materials/FormClass";

function TablePermission() {
  return (
    <div className="container-fluid col-lg-12 grid-margin stretch-card mt-4">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Tabel Permission Santri/ Wati</h3>
          <div className="table-responsive">
            <div className="row">
              <div className="searchboxclass col-md-6">
                <SearchBox />
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                <FormClass />
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Santri/wati</th>
                  <th>Dari Tgl.</th>
                  <th>Sampai Tgl.</th>
                  <th>Jam Surat Dibuat</th>
                  <th>Jam Pulang</th>
                  <th>Ustadz/ah</th>
                  <th>Code</th>
                  <th>Status Validation</th>
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

export default TablePermission;
