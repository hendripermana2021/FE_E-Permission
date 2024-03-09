import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

import serverDev from "../../Server";
import propTypes from "prop-types";

function FormInputRooms(props) {
  const [show, setShow] = useState(false);
  const [NamaRuangan, setNamaRuangan] = useState("");
  const [id_ustadz, setid_ustadz] = useState("");
  const accessToken = sessionStorage.getItem("accessToken");

  const emp = props.emp;

  const handleShow = () => setShow(!show);

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
      await axios
        .post(
          `${serverDev}/v1/api/room/create`,
          {
            id_ustadz: parseInt(id_ustadz),
            nameroom: NamaRuangan,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Data Berhasil Ditambahkan",
            });
            setNamaRuangan("");
            setid_ustadz("");
            handleShow();
          }
        });
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
      <Button variant="outline-primary" onClick={handleShow}>
        Tambah Ruangan
      </Button>

      <Modal
        show={show}
        onHide={handleShow}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Input Data Kamar
          </Modal.Title>
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
              <Form.Label>Wali Kamar </Form.Label>
              <Form.Select
                value={id_ustadz}
                onChange={(e) => setid_ustadz(e.target.value)}
              >
                <option value={1} selected hidden>
                  === Select Ustadz ====
                </option>
                {emp.map((employee, index) => (
                  <option key={index + 1} value={employee.id}>
                    {employee.name_pegawai}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={submitRoom}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleShow}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
FormInputRooms.propTypes = {
  emp: propTypes.array,
};

export default FormInputRooms;
