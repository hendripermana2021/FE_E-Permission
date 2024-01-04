import SearchBox from "./materials/SearchBox";
import ButtonGroup from "./materials/ButtonDropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import FormInputKriteria from "./materials/InputFormDataKriteria";

const TableKriteria = () => {
  const [kriteria, setKriteria] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getKriteria();
  }, []);

  const getKriteria = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/api/kriteria");
      setKriteria(response.data.data);
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
              <div className="searchboxclass col-md-6">
                <SearchBox />
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                <FormInputKriteria />
              </div>
            </div>
            <table className="table table-hover">
              <thead>
                <tr align="center">
                  <th>ID</th>
                  <th>Prioritas</th>
                  <th>Rincian Kriteria</th>
                  <th>Sub-Kriteria</th>
                  <th>Bobot Sub-Kriteria</th>
                  <th>Bobot Kriteria</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody align="center">
                {loading ? (
                  <tr>
                    <td colSpan="5">Loading...</td>
                  </tr>
                ) : kriteria.length === 0 ? (
                  <tr>
                    <td colSpan="5">No rooms available</td>
                  </tr>
                ) : (
                  kriteria.map((kriterias, index) => (
                    <tr key={kriterias.id}>
                      <td>{index + 1}</td>
                      <td>{kriterias.scale_priority}</td>
                      <td>{kriterias.name_kriteria}</td>
                      <td>
                        {kriterias.sub_kriteria.map((sub_kriterias, index) => (
                          <span key={index}>
                            {sub_kriterias.name_sub} <br></br>
                            <br></br>{" "}
                          </span>
                        ))}
                      </td>
                      <td>
                        {kriterias.sub_kriteria.map((sub_kriterias, index) => (
                          <span key={index}>
                            {sub_kriterias.value} <br></br>
                            <br></br>{" "}
                          </span>
                        ))}
                      </td>
                      {/* <td>{kriterias.sub_kriteria.value}</td> */}
                      <td>{kriterias.weight_score}</td>
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
export default TableKriteria;
