import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import propTypes from "prop-types";

import axios from "axios";
import Swal from "sweetalert2";
import serverDev from "../../Server";

const UpdateFormPermission = (props) => {
  const users = props.users;
  const kriterias = props.kriterias;
  const permission = props.permission;

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShow = () => setShow(!show);

  const [commented, setCommented] = useState(permission.commented);
  const [student, setStudent] = useState(permission.student_id);

  const [selectedDateFrom, setSelectedDateFrom] = useState(
    new Date(permission.start_permission).toISOString().split("T")[0]
  );
  const [selectedDateUntil, setSelectedDateUntil] = useState(
    new Date(permission.end_permission).toISOString().split("T")[0]
  );
  const [selectedKriteria, setSelectedKriteria] = useState({});

  useEffect(() => {
    const initialSelectedKriteria = {};
    permission.cpi_data.forEach((s) => {
      initialSelectedKriteria[s.kriteria.id] = s.subkriteria.id;
    });
    setSelectedKriteria(initialSelectedKriteria);
  }, [permission.cpi_data]);

  const handleDateChange = (event) => {
    setSelectedDateFrom(event.target.value);
  };
  const handleDateChangeUntil = (event) => {
    setSelectedDateUntil(event.target.value);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const allKriteria = [{}];

    for (let i = 0; i < kriterias.length; i++) {
      allKriteria.push({
        id_kriteria: kriterias[i].id,
        id_subkriteria: parseInt(selectedKriteria[kriterias[i].id]),
      });
    }

    // remove empty object
    allKriteria.shift();

    try {
      await axios
        .put(
          `${serverDev}/v1/api/permission/update/${permission.id}`,
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
        .then(() => {
          setIsLoading(false);
          handleShow();
          Swal.fire("Data updated!", "Data has been updated.", "success").then(
            () => {
              window.location.reload();
            }
          );
        });
    } catch (error) {
      console.error("Error fetching room data:", error);
      setIsLoading(false);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
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
            <Modal.Title>Form Update Data Permission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Nama Santri/wati</Form.Label>
              <select
                className="form-select"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
              >
                <option selected value={permission.namasantri.id}>
                  {permission.namasantri.name_santri}
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
                  <div className="mb-3 row" key={index}>
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
                        {permission.cpi_data.map((s, index) => {
                          <option
                            value={s.subkriteria.id}
                            key={index}
                            selected
                            hidden
                          >
                            {s.subkriteria.name_sub}
                          </option>;
                        })}
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
            <Button variant="secondary" onClick={handleShow}>
              Batal
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

UpdateFormPermission.propTypes = {
  users: propTypes.array,
  kriterias: propTypes.array,
  permission: propTypes.object,
};

export default UpdateFormPermission;
