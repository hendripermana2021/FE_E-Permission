import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import propTypes from "prop-types";

const DetailFormStudent = (props) => {
  const student = props.student;

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  return (
    <>
      <button className="dropdown-item" onClick={handleShow}>
        <i className="ti-info menu-icon me-2" />
        Detail
      </button>

      <Modal show={show} onHide={handleShow} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data Kamar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <label htmlFor="studentname" className="fw-bold">
                Nama Santri
              </label>
              <p>{student.name_santri}</p>
              <label htmlFor="studentname" className="fw-bold">
                Nama Ayah
              </label>
              <p>{student.fathername}</p>
              <label htmlFor="studentname" className="fw-bold">
                Nama Ibu
              </label>
              <p>{student.mothername}</p>
            </div>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="namaustadz" className="fw-bold">
                Nama Kamar
              </label>
              <p>{student.nameroom.nameroom}</p>
              <label htmlFor="namaustadz" className="fw-bold">
                Email Ustadz
              </label>
              <p>{student.nameroom.walikamar.name_pegawai}</p>
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

DetailFormStudent.propTypes = {
  student: propTypes.object,
};

export default DetailFormStudent;