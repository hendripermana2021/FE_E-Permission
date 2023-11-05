import { Container, Row, Col } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import Select from "react-select";

import HeroImage from "../../assets/img/hero.png";

import "../../dist/css/register.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="registerpage">
      <header className="w-100 min-vh-100 d-flex align-items-center mb-6">
        <Container>
          <Row>
            <Col lg="6" className="pt-lg-0 pt-5 d-flex align-items-center">
              <img src={HeroImage} alt="hero-img" />
            </Col>
            <Col lg="6">
              <div className="register template d-flex justify-content-center align-items-center ">
                <div className="form_container p-5 rounded bg-white align-items-center">
                  <form>
                    <h3 className="signup text-center">Register</h3>
                    <div className="mb-2">
                      <FloatingLabel
                        controlId="namaayah"
                        label="Nama Ayah (Sesuai KTP)"
                        className="mb-3 mt-12"
                      >
                        <Form.Control type="text" placeholder="Nama Ayah" />
                      </FloatingLabel>
                    </div>
                    <div className="mb-2">
                      <FloatingLabel
                        controlId="namaibu"
                        label="Nama Ibu (Sesuai KTP)"
                        className="mb-3 mt-12"
                      >
                        <Form.Control type="text" placeholder="Password" />
                      </FloatingLabel>
                    </div>
                    <div className="mb-2">
                      <FloatingLabel
                        controlId="date"
                        label="Tgl Lahir (Sesuai KTP)"
                        className="mb-3 mt-12"
                      >
                        <Form.Control type="text" placeholder="Password" />
                      </FloatingLabel>
                    </div>
                    <div className="selectRegister mb-2">
                      <p className="namaselect mb-2">Nama Santri/wati</p>
                      <Select
                        className="basic-single"
                        classNamePrefix="Nama Santri/wati"
                        name="color"
                      />
                    </div>
                    <div>
                      <p className="mb-1">Kelas</p>
                      <Form.Control
                        type="text"
                        placeholder="Kelas Santri/wati"
                        aria-label="Kelas Santri/wati"
                        readOnly
                      />
                    </div>
                    <div>
                      <p className="mb-1">Kamar</p>
                      <Form.Control
                        type="text"
                        placeholder="Kamar Santri/wati"
                        aria-label="Kamar Santri/wati"
                        readOnly
                      />
                    </div>
                    <div className="mb-2">
                      <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Foto KTP</Form.Label>
                        <Form.Control type="file" multiple />
                      </Form.Group>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        className="custom-control custom-checkbox"
                        id="check"
                      />
                      <label
                        htmlFor="check"
                        className="custom input-label ms-2 mt-2"
                      >
                        Remember Me
                      </label>
                    </div>
                    <div className="d-flex mt-2 align-items-center text-center">
                      <button className="btn btn-primary">Register</button>
                      <button className="btn btn-danger ms-2">Cancel</button>
                    </div>

                    <p className="text-end mt-2 mb-1">
                      Forgot <a href="">Password?</a>
                      <Link to="/signup" className="ms-2">
                        Sign Up
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <h3>POWERED</h3>
            </Col>
          </Row> */}
        </Container>
      </header>
      {/* <div>
        <Container>
          <Row>
            <Col
              lg="12"
              className="w-100 vh-100 d-flex align-items-center"
            ></Col>
          </Row>
        </Container>
      </div> */}
    </div>
  );
};

export default RegisterPage;
