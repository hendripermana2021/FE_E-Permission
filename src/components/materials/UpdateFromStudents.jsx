import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import PropTypes from "prop-types";

const UpdateFromStudents = (props) => {
  const [show, setShow] = useState(false);
  const rooms = props.rooms;

  const handleShow = () => setShow(!show);

  const [fatherName, setFatherName] = useState(props.student.nama_ayah);
  const [motherName, setMotherName] = useState(props.student.nama_ibu);
  const [studentName, setStudentName] = useState(props.student.nama_santri);
  const [selectedDate, setSelectedDate] = useState(props.student.tgl_lahir);
  const [ruangan, setRuangan] = useState(props.student.rooms.nama_ruangan);

  // Handler function to update the state when the date changes
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <Button variant="warning" className="me-2" onClick={handleShow}>
        <i className="bi bi-pencil-fill"></i>
      </Button>

      <Modal show={show} onHide={handleShow} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data Santri</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Nama Santri</Form.Label>
                  <Form.Control
                    placeholder="Nama Santri"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-12 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control
                    placeholder="Apartment, studio, or floor"
                    type="date"
                    id="dateInput"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Nama Ayah</Form.Label>
                  <Form.Control
                    placeholder="Nama Ayah"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Nama Ibu</Form.Label>
                  <Form.Control
                    placeholder="Nama Ibu"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-12 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Ruangan</Form.Label>
                  <Form.Select
                    value={ruangan}
                    onChange={(e) => setRuangan(e.target.value)}
                  >
                    {rooms.map((room, index) => {
                      return (
                        <option key={index + 1} value={room.id}>
                          {room.nama_ruangan}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Confirm</Button>
          <Button variant="secondary" onClick={handleShow}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

UpdateFromStudents.propTypes = {
  rooms: PropTypes.array,
  student: PropTypes.object,
};

export default UpdateFromStudents;
