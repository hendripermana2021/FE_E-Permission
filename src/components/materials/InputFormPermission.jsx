import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

import propTypes from "prop-types";
import Swal from "sweetalert2";
import serverDev from "../../Server";

function FormInputPermission(props) {
  const users = props.users;
  const kriterias = props.kriterias;

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [commented, setCommented] = useState("");
  const [student, setStudent] = useState();

  const [selectedDateFrom, setSelectedDateFrom] = useState("");
  const [selectedDateUntil, setSelectedDateUntil] = useState("");
  const [selectedKriteria, setSelectedKriteria] = useState({});

  const handleDateChange = (event) => {
    setSelectedDateFrom(event.target.value);
  };
  const handleDateChangeUntil = (event) => {
    setSelectedDateUntil(event.target.value);
  };

  const createHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const allKriteria = [{}];

    for (let i = 0; i < kriterias.length; i++) {
      allKriteria.push({
        id_kriteria: kriterias[i].id,
        id_subkriteria: parseInt(selectedKriteria[i + 1]),
      });
    }

    // remove empty object
    allKriteria.shift();

    try {
      await axios
        .post(
          `${serverDev}permission/create`,
          {
            student_id: parseInt(student),
            start_permission: selectedDateFrom,
            end_permission: selectedDateUntil,
            commented: commented,
            kriteria: allKriteria,
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
              title: "Berhasil",
              text: "Data berhasil ditambahkan",
            }).then(() => {
              setIsLoading(false);
              handleClose();
            });
          } else if (res.status === 400) {
            Swal.fire({
              icon: "error", // Mengganti 'danger' menjadi 'error'
              title: "Gagal", // Mengganti 'Failed' menjadi 'Gagal'
              text: res.response.data.msg || "Terjadi kesalahan", // Menambahkan .data dan memeriksa pesan dari respons
            }).then(() => {
              setIsLoading(false);
              handleClose();
            });
            console.log(res);
          }
        });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Permission",
        text: error.response.data.msg, // Pesan default jika tidak ada pesan dari respons
      }).then(() => {
        setIsLoading(false);
      });
    }
  };

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
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={createHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Form Input Data Permission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Nama Santri/wati</Form.Label>
              <select
                className="form-select"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
              >
                <option selected hidden>
                  --- Pilih Santri ----
                </option>
                {users.map((u, index) => (
                  <option value={u.id} key={index}>
                    {u.name_santri}
                  </option>
                ))}
              </select>
            </Form.Group>
            <div className="row">
              <div className="col-md-6">
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
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Date back</Form.Label>
                  <Form.Control
                    placeholder="Apartment, studio, or floor"
                    type="date"
                    id="untilDate"
                    value={selectedDateUntil}
                    onChange={handleDateChangeUntil}
                  />
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Alasan Perizinan</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Alasan Perizinan"
                    value={commented}
                    onChange={(e) => setCommented(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-12 ">
                {kriterias.map((k, index) => (
                  <div className="mb-1 row" key={index}>
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-4 col-form-label"
                    >
                      {k.name_kriteria}
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        value={selectedKriteria[k.id] || ""}
                        onChange={(e) =>
                          setSelectedKriteria({
                            ...selectedKriteria,
                            [k.id]: e.target.value,
                          })
                        }
                      >
                        <option selected hidden>
                          --- Pilih Sub Kriteria ----
                        </option>
                        {k.sub_kriteria.map((sub, index) => (
                          <option value={sub.id} key={index}>
                            {sub.name_sub}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              {isLoading ? "Loading..." : "Confirm"}
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Batal
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

FormInputPermission.propTypes = {
  users: propTypes.array,
  kriterias: propTypes.array,
};

export default FormInputPermission;
