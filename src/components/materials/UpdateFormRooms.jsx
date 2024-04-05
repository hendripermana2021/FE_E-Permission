import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import propTypes from "prop-types";
import Swal from "sweetalert2";
import serverDev from "../../Server";

const UpdateFormRooms = (props) => {
  const room = props.room;
  const employees = props.emp;

  const [show, setShow] = useState(false);
  const [NamaRuangan, setNamaRuangan] = useState(room.nameroom);
  const [id_ustadz, setid_ustadz] = useState(room.id_ustadz);
  const handleShow = () => setShow(!show);

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      await axios
        .put(
          `${serverDev}room/update/${room.id}`,
          {
            id_ustadz: parseInt(id_ustadz),
            nameroom: NamaRuangan,
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
            });
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
      <button className="dropdown-item" onClick={handleShow}>
        <i className="ti-pencil-alt menu-icon me-2" />
        Update
      </button>

      <Modal
        show={show}
        onHide={handleShow}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Form Update Data Kamar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateHandler}>
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
                <option value={room.namaustadz.id} selected hidden>
                  {room.namaustadz.name_pegawai}
                </option>
                {employees.map((employee, index) => (
                  <option key={index} value={employee.id}>
                    {employee.name_pegawai}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={updateHandler}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleShow}>
            Batal
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
UpdateFormRooms.propTypes = {
  room: propTypes.object,
  emp: propTypes.array,
};

export default UpdateFormRooms;
