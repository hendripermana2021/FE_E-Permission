import axios from "axios";
import { useEffect, useState } from "react";

import FormInputKriteria from "./materials/InputFormDataKriteria";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables";
import $ from "jquery";
import "jquery/dist/jquery.min.js";
import serverDev from "../Server";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import DetailKriteria from "./materials/DetailKriteria";
import Swal from "sweetalert2";
import UpdateFormKriteria from "./materials/UpdateFormKriteria";

const TableKriteria = () => {
  const [kriteria, setKriteria] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable("#tableKriteria")) {
      $(document).ready(function () {
        const tableInterval = setInterval(() => {
          if ($("#tableKriteria").is(":visible")) {
            clearInterval(tableInterval);
            $("#tableKriteria").DataTable();
          }
        }, 1000);
      });
    }

    getKriteria();
  }, []);

  const getKriteria = async () => {
    try {
      const response = await axios.get(`${serverDev}kriteria`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setKriteria(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  const deleteHandler = async (k) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${serverDev}kriteria/delete/${k.id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          });
          getKriteria();
          Swal.fire("Deleted!", "Your data has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting data:", error);
          Swal.fire("Error!", "Your data cannot be deleted.", "error");
        }
      }
    });
  };
  return (
    <div className="container-fluid col-lg-12 col-sm-12 col-md-12 grid-margin stretch-card mt-4 ms-2">
      <div className="card">
        <div className="card-body">
          <h4 className="fw-bold my-3 mb-4">Table Kriteria dan Sub Kriteria</h4>
          <FormInputKriteria />
          <div className="table-responsive mt-4">
            <table className="table table-hover" id="tableKriteria">
              <thead>
                <tr align="center">
                  <th>ID</th>
                  <th>Prioritas</th>
                  <th>Rincian Kriteria</th>
                  <th>Type</th>
                  <th>Sub-Kriteria</th>
                  <th>Bobot Kriteria</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7">Loading...</td>
                  </tr>
                ) : kriteria.length === 0 ? (
                  <tr>
                    <td colSpan="7">No rooms available</td>
                  </tr>
                ) : (
                  kriteria.map((kriterias, index) => (
                    <tr key={index}>
                      <td>K {index + 1}</td>
                      <td>{kriterias.scale_priority}</td>
                      <td>{kriterias.name_kriteria}</td>
                      <td>{kriterias.type ? "Benefit" : "Cost"}</td>
                      <td>{kriterias.sub_kriteria.length} Sub Kriteria</td>
                      <td>
                        {kriterias.weight_score == null
                          ? 0
                          : kriterias.weight_score}
                      </td>
                      <td>
                        <DropdownButton
                          as={ButtonGroup}
                          key="end"
                          id="dropdown-button-drop-end"
                          drop="end"
                          variant="secondary"
                        >
                          <DetailKriteria kriteria={kriterias} />
                          <UpdateFormKriteria kriteria={kriterias} />

                          <button
                            className="dropdown-item"
                            onClick={() => deleteHandler(kriterias)}
                          >
                            <i className="ti-trash menu-icon me-2" />
                            Delete
                          </button>
                        </DropdownButton>
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
