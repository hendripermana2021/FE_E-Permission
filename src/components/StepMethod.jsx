import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

const StepMethod = () => {
  const [kriteria, setKriteria] = useState([]);
  const [permission, setPermission] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cpi, setCpi] = useState();
  const [roc, setRoc] = useState([]);
  const [isRoc, setIsRoc] = useState(false);
  const [isCpi, setIsCpi] = useState(false);

  useEffect(() => {
    getKriteria();
    getPermission();
  }, []);

  const getPermission = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/v1/api/permission",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setPermission(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  const getKriteria = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/v1/api/kriteria",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setKriteria(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  const getRocHandler = async () => {
    setIsRoc(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/v1/api/action/calculatedROC",
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setRoc(response.data.data);
      setIsRoc(false);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "ROC calculated successfully!",
      });
    } catch (error) {
      console.error("Error fetching room data:", error);
      setIsRoc(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const getCpiHandler = async () => {
    setIsCpi(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/v1/api/action/calculatedCPI",
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setCpi(response.data.data);
      setIsCpi(false);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "CPI calculated successfully!",
      });
    } catch (error) {
      console.error("Error fetching room data:", error);
      setIsCpi(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.msg,
      });
    }
  };

  const handleExportToPdf = () => {
    if (cpi == undefined) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "CPI not calculated yet!",
      });
    }

    const docs = new jsPDF({ orientation: "landscape" });

    const title = `HASIL PERHITUNGAN PERIZINAN SANTRI/WATI
  MENGGUNAKAN METODE ROC (RANK ORDER CENTROID) DAN 
  CPI (COMPOSITE PERFORMANCE INDEX)
  `;
    const xCoordinate = docs.internal.pageSize.width / 2;
    const yCoordinate = 10;
    docs.text(title, xCoordinate, yCoordinate, { align: "center" });

    const tableMarginTop = 20;
    docs.autoTable({
      html: "#cpi-table",
      startY: yCoordinate + tableMarginTop,
    });

    docs.save("report-cpi.pdf");
  };

  return (
    <div className="container-fluid col-md-12 grid-margin stretch-card mt-4 ms-2">
      <div className="card">
        <div className="card-body">
          <h4 className="fw-bold my-3 mb-4 text-center">
            CALCULATED METHOD CPI & ROC
          </h4>

          <div className="d-block">
            <button
              className="btn btn-success me-3 my-3"
              onClick={getRocHandler}
            >
              {isRoc ? "Loading ..." : "Calculate ROC"}
            </button>
            <button
              className="btn btn-danger me-3 my-3"
              onClick={getCpiHandler}
            >
              {isCpi ? "Loading ..." : "Calculate CPI"}
            </button>
            <button
              className="btn btn-secondary me-3 my-3"
              onClick={handleExportToPdf}
            >
              Generate Report
            </button>
          </div>

          {/* Step 1 */}
          <div className="card bordered">
            <div className="card-body">
              <h6 className="fw-bold">Step 1 : Penentuan Skala Penilaian</h6>

              <div className="table-responsive my-4">
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-hover">
                    <thead>
                      <tr align="center">
                        <th>No.</th>
                        <th>Nama Santri/wati</th>
                        {kriteria.map((k, index) => (
                          <th key={index}>{k.name_kriteria}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody align="center">
                      {loading ? (
                        <tr>
                          <td colSpan="5">Loading...</td>
                        </tr>
                      ) : (
                        permission.map((p, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{p.namasantri.name_santri}</td>
                            {p.cpi_data.map((c, index) => (
                              <td key={index}>{c.subkriteria.name_sub}</td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="card bordered mt-4">
            <div className="card-body">
              <h6 className="fw-bold">Convert Ke nilai</h6>

              <div className="table-responsive my-4">
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-hover">
                    <thead>
                      <tr align="center">
                        <th>No.</th>
                        <th>Nama Santri/wati</th>
                        {kriteria.map((k, index) => (
                          <th key={index}>{k.name_kriteria}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody align="center">
                      {permission.map((p, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{p.namasantri.name_santri}</td>
                          {p.cpi_data.map((c, index) => (
                            <td key={index}>{c.subkriteria.value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* /Step 1 */}

          {/* Step 2 */}
          <div className="card bordered mt-4">
            <div className="card-body">
              <h6 className="fw-bold">Step 2 : Penyelesaian Bobot Kriteria</h6>

              <div className="table-responsive my-4">
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-hover">
                    <thead>
                      <tr align="center">
                        <th>No.</th>
                        <th>Prioritas</th>
                        <th>Nama Kriteria</th>
                        <th>Sub kriteria</th>
                        <th>Bobot Sub Kriteria</th>
                        <th>Bobot Kriteria</th>
                      </tr>
                    </thead>
                    <tbody align="center">
                      {kriteria.map((k, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{k.scale_priority}</td>
                          <td>{k.name_kriteria}</td>
                          <td>
                            {k.sub_kriteria.map((sub, index) => (
                              <p key={index}>{sub.name_sub}</p>
                            ))}
                          </td>

                          <td>
                            {k.sub_kriteria.map((sub, index) => (
                              <p key={index}>{sub.value}</p>
                            ))}
                          </td>
                          <td>
                            {roc.length === 0 ? (
                              <p>0 %</p>
                            ) : (
                              <p key={index}>
                                {roc[index].weight_score * 100}%
                              </p>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* /Step 2 */}

          {/* Step 3 */}
          <div className="card bordered mt-4">
            <div className="card-body">
              <h6 className="fw-bold">Step 3 : Matrix Normalisasi</h6>

              <div className="table-responsive my-4">
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-hover">
                    <thead>
                      <tr align="center">
                        <th>No.</th>
                        <th>Nama Santri/wati</th>
                        {kriteria.map((k, index) => (
                          <th key={index}>{k.name_kriteria}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody align="center">
                      {cpi == undefined ? (
                        <tr>
                          <td colSpan="12">No data available</td>
                        </tr>
                      ) : (
                        permission.map((p, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{p.namasantri.name_santri}</td>
                            <td>{cpi.step2[index][0]}</td>
                            <td>{cpi.step2[index][1]}</td>
                            <td>{cpi.step2[index][2]}</td>
                            <td>{cpi.step2[index][3]}</td>
                            <td>{cpi.step2[index][4]}</td>
                            <td>{cpi.step2[index][5]}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* /Step 3 */}

          {/* Step 4 */}
          <div className="card bordered mt-4">
            <div className="card-body">
              <h6 className="fw-bold">
                Step 4 : Perkealian bobot dengan Matriks Normalisasi
              </h6>

              <div className="table-responsive my-4">
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-hover">
                    <thead>
                      <tr align="center">
                        <th>No.</th>
                        <th>Nama Santri/wati</th>
                        {kriteria.map((k, index) => (
                          <th key={index}>{k.name_kriteria}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody align="center">
                      {cpi == undefined ? (
                        <tr>
                          <td colSpan="12">No data available</td>
                        </tr>
                      ) : (
                        permission.map((p, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{p.namasantri.name_santri}</td>
                            <td>{cpi.step3.step3Transpose[index][0]}</td>
                            <td>{cpi.step3.step3Transpose[index][1]}</td>
                            <td>{cpi.step3.step3Transpose[index][2]}</td>
                            <td>{cpi.step3.step3Transpose[index][3]}</td>
                            <td>{cpi.step3.step3Transpose[index][4]}</td>
                            <td>{cpi.step3.step3Transpose[index][5]}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* /Step 4 */}

          {/* Step 5 */}
          <div className="card bordered mt-4">
            <div className="card-body">
              <h6 className="fw-bold">
                Step 5 : Penyelesaian dengan Method CPI
              </h6>

              <div className="table-responsive my-4">
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-hover" id="cpi-table">
                    <thead>
                      <tr align="center">
                        <th>No.</th>
                        <th>Nama Santri/wati</th>
                        <th>Hasil CPI</th>
                        <th>Persentase</th>
                        <th>Ranking</th>
                      </tr>
                    </thead>
                    <tbody align="center">
                      {cpi == undefined ? (
                        <tr>
                          <td colSpan="12">No data available</td>
                        </tr>
                      ) : (
                        permission.map((p, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {cpi.sortfill[index].namasantri.name_santri}
                            </td>
                            <td>{cpi.sortfill[index].cpi_result.toFixed(2)}</td>
                            <td>
                              {(cpi.sortfill[index].cpi_result * 100).toFixed(
                                2
                              )}
                              %
                            </td>
                            <td>{index + 1}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* /Step 5 */}
        </div>
      </div>
    </div>
  );
};
export default StepMethod;
