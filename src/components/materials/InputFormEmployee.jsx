import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function FormInputEmployee() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // For Selected Date Employee and Teachers
  const [selectedDate, setSelectedDate] = useState("");

  // Handler function to update the state when the date changes
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <Button variant="outline-primary" size="sm" onClick={handleShow}>
        Tambah Pegawai
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Form Input Data Pegawai dan Ustadz/ah</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Nama</Form.Label>
              <Form.Control placeholder="Nama Santri" />
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Input Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Input Conf Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Job Desk</Form.Label>
              <Form.Select>
                <option>Pegawai Kebersihan</option>
                <option>Pegawai Keamanan</option>
                <option>Ustadz/ah</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Confirm</Button>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormInputEmployee;
