import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

function FormInputKriteria() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // make array of object state for subKriteria
  const [subKriteria, setSubKriteria] = useState([
    {
      name_sub: "",
      value: "",
    },
    {
      name_sub: "",
      value: "",
    },
    {
      name_sub: "",
      value: "",
    },
    {
      name_sub: "",
      value: "",
    },
    {
      name_sub: "",
      value: "",
    },
    {
      name_sub: "",
      value: "",
    },
    {
      name_sub: "",
      value: "",
    },
  ]);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  //For Handle Button Sub Kriteria
  const [selectedOption, setSelectedOption] = useState("");
  const [additionalRows, setAdditionalRows] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

    // Check if the selected option is not empty
    if (event.target.value !== "") {
      // Generate rows based on the selected option and update state
      const rows = Array.from({ length: parseInt(event.target.value, 10) });
      setAdditionalRows(rows);
    } else {
      // Reset additionalRows if the selected option is empty
      setAdditionalRows([]);
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // form validation
    if (name === "" || type === "" || priority === "") {
      setIsSubmitting(false);

      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Semua Form tidak boleh kosong!",
      });
    }

    // remove empty subKriteria
    const filteredSubKriteria = subKriteria.filter(
      (item) => item.name_sub !== "" && item.value !== ""
    );

    try {
      const res = await axios.post(
        "http://localhost:8000/v1/api/kriteria/create",
        {
          name_kriteria: name,
          scale_priority: parseInt(priority),
          type: type,
          subkriteria: filteredSubKriteria,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")} `,
          },
        }
      );

      if (res.status == 200) {
        setIsSubmitting(false);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data Kriteria berhasil ditambahkan",
        }).then(() => {
          handleShow();
          window.location.reload();
        });
      } else {
        setIsSubmitting(false);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.msg,
        }).then(() => {
          handleShow();
        });
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.msg,
      });
    }
  };

  return (
    <>
      <Button variant="outline-primary" size="sm" onClick={handleShow}>
        Tambah Kriteria
      </Button>

      <Modal
        show={show}
        onHide={handleShow}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={createHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Form Input Data Kriteria</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Nama Kriteria</Form.Label>
                  <Form.Control
                    placeholder="Nama Kriteria"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 col-sm-12">
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Prioritas</Form.Label>
                  <Form.Control
                    placeholder="Nama Kriteria"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    type="number"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 col-sm-12">
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option selected hidden>
                      -- Pilih Type --
                    </option>
                    <option value={1}>Benefit</option>
                    <option value={0}>Cost</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-md-6 col-sm-12 mt-3">
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Sub-Kriteria</Form.Label>
                  <Form.Select
                    value={selectedOption}
                    onChange={handleOptionChange}
                  >
                    <option selected hidden>
                      -- Pilih Banyak Sub Kriteria --
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-12 col-sm-12">
                <table className="table table-hover">
                  <thead>
                    <tr align="center">
                      <th>No.</th>
                      <th>Sub-Kriteria</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody align="center">
                    {additionalRows.map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <Form.Control
                            placeholder={`Sub-Kriteria ${index + 1}`}
                            value={subKriteria[index].name_sub}
                            onChange={(e) => {
                              const newSubKriteria = [...subKriteria];
                              newSubKriteria[index].name_sub = e.target.value;
                              setSubKriteria(newSubKriteria);
                            }}
                          />
                        </td>
                        <td>
                          <Form.Control
                            placeholder={`Value Sub-Kriteria ${index + 1}`}
                            type="number"
                            value={subKriteria[index].value}
                            onChange={(e) => {
                              const newSubKriteria = [...subKriteria];
                              newSubKriteria[index].value = e.target.value;
                              setSubKriteria(newSubKriteria);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              {isSubmitting ? "Loading..." : "Confirm"}
            </Button>
            <Button variant="secondary" onClick={handleShow}>
              Batal
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default FormInputKriteria;
