import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import axios from "axios";

import serverDev from "../../Server";

function FormInputRooms() {
  const [show, setShow] = useState(false);
  const [NamaRuangan, setNamaRuangan] = useState("");
  const [id_ustadz, setid_ustadz] = useState("");
  const [loading, setLoading] = useState(true);
  const accessToken = sessionStorage.getItem("accessToken");
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    getEmployee();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getEmployee = async () => {
    try {
      const response = await axios.get("http://localhost:8000/v1/api/pegawai");
      setEmployee(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  const submitRoom = async (e) => {
    e.preventDefault();
    if (NamaRuangan === "") {
      Swal.fire({
        icon: "error",
        title: "Please Fill Name Room",
      });
      return;
    }

    try {
      const post = await axios.post(
        `${serverDev}/v1/api/room/create`,
        {
          id_ustadz: id_ustadz,
          nameroom: NamaRuangan,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: post.data.msg,
      });
      handleClose();
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  return (
    <>
      <Button variant="outline-primary" size="sm" onClick={handleShow}>
        Tambah Ruangan
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Form Input Data Kamar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitRoom}>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Nama Ruangan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama Ruangan"
                value={NamaRuangan}
                onChange={(e) => setNamaRuangan(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Wali Kamar</Form.Label>
              <Form.Select
                value={id_ustadz}
                onChange={(e) => setid_ustadz(e.target.value)}
              >
                {loading ? (
                  <option>Default select</option>
                ) : (
                  employee.map((employee, index) => (
                    <option key={index + 1} value={employee.id}>
                      {employee.name_pegawai}
                    </option>
                  ))
                )}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={submitRoom}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormInputRooms;
