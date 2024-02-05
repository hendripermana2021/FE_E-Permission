import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import Swal from "sweetalert2";

// import serverDev from "../../Server";
import propTypes from "prop-types";

const UpdateFormRooms = (props) => {
  const [show, setShow] = useState(false);
  const [NamaRuangan, setNamaRuangan] = useState(props.room.nameroom);
  const [id_ustadz, setid_ustadz] = useState(props.room.id);

  const employees = props.emp;
  const handleShow = () => setShow(!show);

  const updateHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        <i className="ti-pencil-alt menu-icon" />
      </Button>

      <Modal show={show} onHide={handleShow} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data Kamar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateHandler}>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Nama Ruangan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Ruangan"
                value={NamaRuangan}
                onChange={(e) => setNamaRuangan(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Wali Kamar</Form.Label>
              <Form.Select
                value={id_ustadz}
                onChange={(e) => setid_ustadz(e.target.value)}
              >
                {employees.map((employee, index) => (
                  <option key={index + 1} value={employee.id}>
                    {employee.name_pegawai}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={updateHandler}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleShow}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
UpdateFormRooms.propTypes = {
  room: propTypes.object,
  emp: propTypes.array,
};

export default UpdateFormRooms;
