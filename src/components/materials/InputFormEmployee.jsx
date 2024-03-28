import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import serverDev from "../../Server";

function FormInputEmployee(prop) {
  const roles = prop.roles;

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [role, setRole] = useState();
  const [sex, setSex] = useState();

  const handleShow = () => setShow(!show);

  const createHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // form validation
    if (!name) {
      setIsLoading(false);
      return Swal.fire({ icon: "error", title: "Nama tidak boleh kososng" });
    }
    if (!email) {
      setIsLoading(false);
      return Swal.fire({ icon: "error", title: "Email tidak boleh kososng" });
    }
    if (!password) {
      setIsLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Password tidak boleh kososng",
      });
    }
    if (!confPassword) {
      setIsLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Confirm Password tidak boleh kososng",
      });
    }
    if (!role) {
      setIsLoading(false);
      return Swal.fire({ icon: "error", title: "Role tidak boleh kososng" });
    }
    if (!sex) {
      setIsLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Jenis Kelamin tidak boleh kososng",
      });
    }

    if (password !== confPassword) {
      setIsLoading(false);
      return Swal.fire({ icon: "error", title: "Password tidak sama" });
    }
    try {
      const res = await axios.post(
        `${serverDev}/pegawai/register`,
        {
          name_pegawai: name,
          email: email,
          password: password,
          role_id: parseInt(role),
          sex: parseInt(sex),
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.status === 200) {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil ditambahkan",
        }).then(() => {
          setName("");
          setPassword("");
          setConfPassword("");
          setRole("");
          setSex("");
          handleShow();
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Tambah Pegawai
      </Button>

      <Modal
        show={show}
        onHide={handleShow}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={createHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Form Input Data Pegawai dan Ustadz/ah</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                placeholder="Nama Santri"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Email"
                type="email" // Add this line to specify the input type as email
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Select value={sex} onChange={(e) => setSex(e.target.value)}>
                <option selected hidden>
                  --- Pilih Jenis Kelamin ---
                </option>
                <option value={1}>Laki - Laki</option>
                <option value={2}>Perempuan</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Input Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Input Conf Password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Job Desc</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option selected hidden>
                  --- Select Jobdesc ---
                </option>
                {roles.map((role, index) => (
                  <option key={index} value={role.id}>
                    {role.role_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
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
}

FormInputEmployee.propTypes = {
  roles: PropTypes.array,
};

export default FormInputEmployee;
