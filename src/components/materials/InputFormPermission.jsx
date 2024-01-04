import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ModalBody } from "react-bootstrap";

function FormInputPermission() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [selectedDateUntil, setSelectedDateUntil] = useState("");
  // Handler function to update the state when the date changes
  const handleDateChange = (event) => {
    setSelectedDateFrom(event.target.value);
  };
  const handleDateChangeUntil = (event) => {
    setSelectedDateUntil(event.target.value);
  };

  //Select and Search Box
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  //End Select and Search Box

  return (
    <>
      <Button variant="outline-primary" size="sm" onClick={handleShow}>
        Tambah Permission
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Form Input Data Permission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Nama Santri/wati</Form.Label>
              <Select
                options={options}
                className="basic-single"
                classNamePrefix="select"
                name="color"
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Date Permission</Form.Label>
                  <Form.Control
                    placeholder="Apartment, studio, or floor"
                    type="date"
                    id="fromDate"
                    value={selectedDateFrom}
                    onChange={handleDateChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    placeholder="Apartment, studio, or floor"
                    type="date"
                    id="untilDate"
                    value={selectedDateUntil}
                    onChange={handleDateChangeUntil}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Modal.Header>
              <Modal.Title>Form Input Data Permission</Modal.Title>
            </Modal.Header>
            <ModalBody>
              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Keterangan Perizinan</Form.Label>
                <Form.Select>
                  <option>Pegawai Kebersihan</option>
                  <option>Pegawai Keamanan</option>
                  <option>Ustadz/ah</option>
                </Form.Select>
              </Form.Group>
            </ModalBody>
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

export default FormInputPermission;
