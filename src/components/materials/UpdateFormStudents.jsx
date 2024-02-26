import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

import axios from "axios";
import Swal from "sweetalert2";
import serverDev from "../../Server";

const UpdateFormStudents = (props) => {
  const rooms = props.rooms;
  const student = props.student;

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShow = () => setShow(!show);

  const [room, setRoom] = useState(student.nameroom.id);
  const [sex, setSex] = useState(student.sex ? 1 : 2);
  const [name, setName] = useState(student.name_santri);
  const [father, setFather] = useState(student.fathername);
  const [mother, setMother] = useState(student.mothername);
  const [status, setStatus] = useState(student.status ? 1 : 2);

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // form validation
    if (!name)
      return Swal.fire({ icon: "error", title: "Nama tidak boleh kososng" });
    if (!sex)
      return Swal.fire({
        icon: "error",
        title: "Jenis Kelamin tidak boleh kososng",
      });
    if (!father)
      return Swal.fire({
        icon: "error",
        title: "Nama Ayah tidak boleh kososng",
      });
    if (!mother)
      return Swal.fire({
        icon: "error",
        title: "Nama Ibu tidak boleh kososng",
      });
    if (!room)
      return Swal.fire({ icon: "error", title: "Ruangan tidak boleh kososng" });
    if (!status)
      return Swal.fire({ icon: "error", title: "Status tidak boleh kososng" });

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name_santri", name);
    formData.append("sex", parseInt(sex));
    formData.append("fathername", father);
    formData.append("mothername", mother);
    formData.append("id_room", parseInt(room));
    formData.append("status", parseInt(status));
    formData.append("role_id", 2);

    try {
      const res = await axios.put(
        `${serverDev}/v1/api/santri/update/${student.id}`,
        {
          formData,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Diupdate",
        });
        setIsLoading(false);
        handleShow();
      }
    } catch (error) {
      console.error("Error updating student data:", error);
      Swal.fire({
        icon: "error",
        title: "Error updating student data",
      });
    }
  };

  return (
    <>
      <button className="dropdown-item" onClick={handleShow}>
        <i className="ti-pencil-alt menu-icon me-2" />
        Update
      </button>

      <Modal show={show} onHide={handleShow} backdrop="static" keyboard={false}>
        <Form onSubmit={updateHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Update Data Santri</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12 col-sm12">
                <div className="row mb-3">
                  <div className="col-md-3">
                    {image && (
                      <div>
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Selected"
                          style={{ maxWidth: "100%" }}
                          className="img-fluid rounded-circle"
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-9">
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                      <Form.Label>Foto profil</Form.Label>

                      <Form.Control
                        placeholder="Nama Santri"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Nama Santri</Form.Label>
                  <Form.Control
                    placeholder="Nama Santri"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-12 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <Form.Select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                  >
                    <option selected hidden>
                      {student.sex ? "Not Published" : "Undefined Gender"}
                    </option>
                    <option value={1}>Laki - Laki</option>
                    <option value={2}>Perempuan</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-lg-6 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Nama Ayah</Form.Label>
                  <Form.Control
                    placeholder="Nama Ayah"
                    type="text"
                    value={father}
                    onChange={(e) => setFather(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Nama Ibu</Form.Label>
                  <Form.Control
                    placeholder="Nama Ibu"
                    type="text"
                    value={mother}
                    onChange={(e) => setMother(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-12 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Ruangan </Form.Label>
                  <Form.Select
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  >
                    <option selected hidden value={student.nameroom.id}>
                      {student.nameroom.nameroom}
                    </option>
                    {rooms.map((r, index) => (
                      <option key={index + 1} value={r.id}>
                        {r.nameroom}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-lg-12 col-sm-12">
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Status </Form.Label>
                  <Form.Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option
                      selected
                      hidden
                      value={student.status ? 1 : undefined}
                    >
                      {student.status ? "Active" : "In Active"}
                    </option>
                    <option value={1}>Active</option>
                    <option value={2}>In Active</option>
                  </Form.Select>
                </Form.Group>
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

UpdateFormStudents.propTypes = {
  rooms: PropTypes.array,
  student: PropTypes.object,
};

export default UpdateFormStudents;
