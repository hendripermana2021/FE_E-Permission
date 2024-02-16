import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import PropTypes from "prop-types";

function FormInputStudent(props) {
  const [show, setShow] = useState(false);
  const rooms = props.rooms;

  const handleShow = () => setShow(!show);

  const [selectedDate, setSelectedDate] = useState("");

  // Handler function to update the state when the date changes
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Tambah Siswa
      </Button>

      <Modal show={show} onHide={handleShow} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Input Data Santri</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Nama Santri</Form.Label>
                  <Form.Control placeholder="Nama Santri" />
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
                  <Form.Control placeholder="Nama Ayah" />
                </Form.Group>
              </div>
              <div className="col-lg-6 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Nama Ibu</Form.Label>
                  <Form.Control placeholder="Nama Ibu" />
                </Form.Group>
              </div>
              <div className="col-lg-12 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Ruangan</Form.Label>
                  <Form.Select>
                    {rooms.map((room, index) => {
                      return (
                        <option key={index} value={room.id}>
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
}

FormInputStudent.propTypes = {
  rooms: PropTypes.array,
};

export default FormInputStudent;