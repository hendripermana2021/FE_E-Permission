import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";

import axios from "axios";
import propTypes from "prop-types";

import Swal from "sweetalert2";
import serverDev from "../../Server";

const UpdateFormEmployee = (props) => {
  const roles = props.roles;
  const emp = props.emp;

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(emp.name_pegawai);
  const [email, setEmail] = useState(emp.email);
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [role, setRole] = useState();
  const [sex, setSex] = useState();

  const handleShow = () => setShow(!show);

  const updateHandler = async (e) => {
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
    if (!role) {
      setIsLoading(false);
      return Swal.fire({ icon: "error", title: "Role tidak boleh kososng" });
    }
    if (password) {
      if (!confPassword) {
        setIsLoading(false);
        return Swal.fire({
          icon: "error",
          title: "Confirm Password tidak boleh kososng",
        });
      }
      if (password !== confPassword) {
        setIsLoading(false);
        return Swal.fire({
          icon: "error",
          title: "Password dan Confirm Password tidak sama",
        });
      }
    }

    try {
      await axios
        .put(
          `${serverDev}/v1/api/pegawai/update/${emp.id}`,
          {
            name_pegawai: name,
            email: email,
            password: password == null ? emp.real_password : password,
            role_id: parseInt(role),
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
              handleShow();
              // refresh page
              window.location.reload();
            });
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

      <Modal show={show} onHide={handleShow} backdrop="static" keyboard={false}>
        <Form onSubmit={updateHandler}>
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
                placeholder="Email "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Job Desc</Form.Label>
              <Form.Select value={sex} onChange={(e) => setSex(e.target.value)}>
                <option selected hidden value={1}>
                  {emp.sex ? "Laki - Laki" : "Perempuan"}
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
                <option value={emp.role.id} selected hidden>
                  {emp.role.role_name}
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
};

UpdateFormEmployee.propTypes = {
  emp: propTypes.object,
  roles: propTypes.array,
};

export default UpdateFormEmployee;
