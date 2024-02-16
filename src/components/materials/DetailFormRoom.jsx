import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import propTypes from "prop-types";

const DetailFormRoom = (props) => {
  const room = props.room;

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
              <label htmlFor="nameroom" className="fw-bold">
                Nama Kamar
              </label>
              <p>{room.nameroom}</p>
            </div>
            <div className="col-md-6 col-sm-12">
              <label htmlFor="namaustadz" className="fw-bold">
                Nama Ustadz
              </label>
              <p>{room.namaustadz.name_pegawai}</p>
              <label htmlFor="namaustadz" className="fw-bold">
                Email Ustadz
              </label>
              <p>{room.namaustadz.email}</p>
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
DetailFormRoom.propTypes = {
  room: propTypes.object,
};

export default DetailFormRoom;
