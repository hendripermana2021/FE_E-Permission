import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import propTypes from "prop-types";

const DetailFormEmployee = (props) => {
  const emp = props.emp;

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
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail Data Pegawai</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <label htmlFor="nameroom" className="fw-bold">
                Nama Pegawai
              </label>
              <p>{emp.name_pegawai}</p>
              <label htmlFor="nameroom" className="fw-bold">
                Email Pegawai
              </label>
              <p>{emp.email}</p>
            </div>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="namaustadz" className="fw-bold">
                Jenis Kelamin
              </label>
              <p>{emp.sex ? "Laki -Laki" : "Perempuan"}</p>
              <label htmlFor="namaustadz" className="fw-bold">
                Job Description
              </label>
              <p>{emp.role.role_name}</p>
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
DetailFormEmployee.propTypes = {
  emp: propTypes.object,
};

export default DetailFormEmployee;
