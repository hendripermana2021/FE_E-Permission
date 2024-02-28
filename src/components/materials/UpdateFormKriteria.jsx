import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import propTypes from "prop-types";

const UpdateFormKriteria = (props) => {
  const k = props.kriteria;

  const [name, setName] = useState(k.name_kriteria);
  const [type, setType] = useState(k.type);
  const [weight, setWeight] = useState(k.weight_score);
  const [priority, setPriority] = useState(k.scale_priority);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // make array of object state for subKriteria
  const [subKriteria, setSubKriteria] = useState([
    //  Loop k.sub_kriteria
    {
      name_sub: k.sub_kriteria[0] ? k.sub_kriteria[0].name_sub : "",
      value: k.sub_kriteria[0] ? k.sub_kriteria[0].value : "",
    },
    {
      name_sub: k.sub_kriteria[1] ? k.sub_kriteria[1].name_sub : "",
      value: k.sub_kriteria[1] ? k.sub_kriteria[1].value : "",
    },
    {
      name_sub: k.sub_kriteria[2] ? k.sub_kriteria[2].name_sub : "",
      value: k.sub_kriteria[2] ? k.sub_kriteria[2].value : "",
    },
    {
      name_sub: k.sub_kriteria[3] ? k.sub_kriteria[3].name_sub : "",
      value: k.sub_kriteria[3] ? k.sub_kriteria[3].value : "",
    },
    {
      name_sub: k.sub_kriteria[4] ? k.sub_kriteria[4].name_sub : "",
      value: k.sub_kriteria[4] ? k.sub_kriteria[4].value : "",
    },
    {
      name_sub: k.sub_kriteria[5] ? k.sub_kriteria[5].name_sub : "",
      value: k.sub_kriteria[5] ? k.sub_kriteria[5].value : "",
    },
  ]);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  //For Handle Button Sub Kriteria
  const [selectedOption, setSelectedOption] = useState("");
  const [additionalRows, setAdditionalRows] = useState(k.sub_kriteria);

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

  const updateHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // form validation
    if (name === "" || type === "" || weight === "" || priority === "") {
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
      await axios
        .put(
          "http://localhost:8000/v1/api/kriteria/update/" + k.id,
          {
            name_kriteria: name,
            scale_priority: parseInt(priority),
            type: type,
            weight_score: weight,
            subkriteria: filteredSubKriteria,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Data Berhasil Diupdate",
            }).then(() => {
              setIsSubmitting(false);

              handleShow();
              window.location.reload();
            });
          }
        });
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
      <button className="dropdown-item" onClick={handleShow}>
        <i className="ti-pencil-alt menu-icon me-2" />
        Update
      </button>

      <Modal
        show={show}
        onHide={handleShow}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={updateHandler}>
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
                      {k.type ? "Benefit" : "Cost"}
                    </option>
                    <option value={1}>Benefit</option>
                    <option value={0}>Cost</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6 col-sm-12 mt-2">
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Bobot Kriteria</Form.Label>
                  <Form.Control
                    placeholder="Bobot Kriteria"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 col-sm-12 mt-3">
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Sub-Kriteria</Form.Label>
                  <Form.Select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    disabled
                  >
                    <option selected hidden>
                      {additionalRows.length}
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
};
UpdateFormKriteria.propTypes = {
  kriteria: propTypes.object.isRequired,
};

export default UpdateFormKriteria;
