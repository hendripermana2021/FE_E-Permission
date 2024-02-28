import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import propTypes from "prop-types";
const DetailKriteria = (props) => {
  const k = props.kriteria;

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  return (
    <>
      <button className="dropdown-item" onClick={handleShow}>
        <i className="ti-info menu-icon me-2" />
        Detail
      </button>

      <Modal
        show={show}
        onHide={handleShow}
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Data Kamar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row container my-2">
            <div className="col-md-6 col-sm-12">
              <label htmlFor="nameroom" className="fw-bold">
                Nama Kriteria
              </label>
              <p>{k.name_kriteria}</p>
            </div>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="nameroom" className="fw-bold">
                Type
              </label>
              <p>{k.type ? "Benefit" : "Cost"}</p>
            </div>
            <div className="col-md-6 col-sm-12">
              {" "}
              <label htmlFor="nameroom" className="fw-bold">
                Nilai Bobot
              </label>
              <p>{k.weight_score == null ? 0 : k.weight_score}</p>
            </div>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="nameroom" className="fw-bold">
                Prioritas
              </label>
              <p>{k.scale_priority}</p>
            </div>
            <div className="col-md-12 col-sm-12">
              <label htmlFor="namaustadz" className="fw-bold mb-2">
                Sub Kriteria
              </label>
              {k.sub_kriteria.length === 0 ? (
                <p>No Sub Kriteria</p>
              ) : (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nama Sub Kriteria</th>
                      <th>Bobot</th>
                    </tr>
                  </thead>
                  {k.sub_kriteria.map((sub, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{sub.name_sub}</td>
                      <td>{sub.value}</td>
                    </tr>
                  ))}
                  <tbody></tbody>
                </table>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
DetailKriteria.propTypes = {
  kriteria: propTypes.object,
};
export default DetailKriteria;
