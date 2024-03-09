import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container, Row, Col } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

const DropdownInsideFormFloating = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <Form.Floating className="mb-3">
      <Form.Control
        id="floatingDropdown"
        type="text"
        placeholder="Select an option"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      />
      <label htmlFor="floatingDropdown">Dropdown Inside Form.Floating</label>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Dropdown Options
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onSelect={() => handleDropdownSelect("Option 1")}>
            Option 1
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => handleDropdownSelect("Option 2")}>
            Option 2
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => handleDropdownSelect("Option 3")}>
            Option 3
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Form.Floating>
  );
};

const DateInput = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <div className="p-2">Tanggal Lahir</div>
      <DatePicker
        className="p-1"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Pilih Tanggal"
      />
    </div>
  );
};

function FormClass() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-secondary" onClick={handleShow}>
        Tambah Kelas
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Siswa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={6} md={6}>
                <FloatingLabel
                  controlId="namasiswa"
                  label="Nama Siswa"
                  className="mb-3"
                >
                  <Form.Control type="nama" placeholder="Nama Siswa" />
                </FloatingLabel>
              </Col>
              <Col xs={6} md={6}>
                <DateInput />
              </Col>
            </Row>

            <Row>
              <Col xs={6} md={6}>
                <FloatingLabel
                  controlId="namaayah"
                  label="Nama Ayah"
                  className="mb-3"
                >
                  <Form.Control type="namaayah" placeholder="Nama Ayah" />
                </FloatingLabel>
              </Col>
              <Col xs={6} md={6}>
                <FloatingLabel
                  controlId="namaibu"
                  label="Nama Ibu"
                  className="mb-3"
                >
                  <Form.Control type="namaibu" placeholder="Nama Ibu" />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={6}>
                <DropdownInsideFormFloating />
              </Col>
              <Col xs={6} md={6}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormClass;
