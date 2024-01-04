import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function FormInputKriteria() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //For Handle Button Sub Kriteria
  const [selectedOption, setSelectedOption] = useState("");
  const [additionalRows, setAdditionalRows] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

    // Check if the selected option is not empty
    if (event.target.value !== "") {
      // Generate rows based on the selected option and update state
      const rows = Array.from(
        { length: parseInt(event.target.value, 10) },
        (_, index) => `Row ${index + 1}`
      );
      setAdditionalRows(rows);
    } else {
      // Reset additionalRows if the selected option is empty
      setAdditionalRows([]);
    }
  };
  //End For Handle Sub Kriteria

  return (
    <>
      <Button variant="outline-primary" size="sm" onClick={handleShow}>
        Tambah Kriteria
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Form Input Data Kriteria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Nama Kriteria</Form.Label>
              <Form.Control placeholder="Nama Santri" />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3 col-md-3"
                  controlId="formGridAddress1"
                >
                  <Form.Label>Prioritas</Form.Label>
                  <Form.Select>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3 col-md-6"
                  controlId="formGridAddress1"
                >
                  <Form.Label>Type</Form.Label>
                  <Form.Select>
                    <option value={1}>Benefit</option>
                    <option value={0}>Cost</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3 col-md-3" controlId="formGridAddress1">
              <Form.Label>Sub-Kriteria</Form.Label>
              <Form.Select value={selectedOption} onChange={handleOptionChange}>
                <option value="">-- Select --</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Form.Select>
            </Form.Group>
            <table className="table table-hover">
              <thead>
                <tr align="center">
                  <th>No.</th>
                  <th>Sub-Kriteria</th>
                </tr>
              </thead>
              <tbody align="center">
                {additionalRows.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Control placeholder={`Sub-Kriteria ${index + 1}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default FormInputKriteria;
