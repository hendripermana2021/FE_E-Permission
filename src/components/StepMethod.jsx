import ButtonGroup from "./materials/ButtonDropdown";
import { useEffect, useState } from "react";
import axios from "axios";

const StepMethod = () => {
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
    <div className="container-fluid col-md-12 grid-margin stretch-card mt-4">
      <div className="card">
        <div className="card-body">
          <h4>CALCULATED METHOD CPI & ROC</h4>
          <p className="card-description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
            officia non eos perferendis blanditiis libero ex laudantium quo ipsa
            quos corporis assumenda ipsum, vel, amet quae eligendi atque. Odio,
            nemo!
          </p>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr align="center">
                  <th>No.</th>
                  <th>Nama Santri/wati</th>
                  <th>Keterangan Perizinan</th>
                  <th></th>
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
        <div className="card-body">
          <h4 className="card-title">TABEL DATA SANTRI/WATI</h4>
          <p className="card-description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
            officia non eos perferendis blanditiis libero ex laudantium quo ipsa
            quos corporis assumenda ipsum, vel, amet quae eligendi atque. Odio,
            nemo!
          </p>
          <div className="table-responsive">
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
export default StepMethod;
