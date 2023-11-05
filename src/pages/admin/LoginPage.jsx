import { Container, Row, Col } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import HeroImage from "../../assets/img/hero.png";

import "../../dist/css/login.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="loginpage">
      <header className="w-100 min-vh-100 d-flex align-items-center">
        <Container>
          <Row>
            <Col lg="6" className="pt-lg-0 pt-5 d-flex align-items-center">
              <img src={HeroImage} alt="hero-img" />
            </Col>
            <Col lg="6">
              <div className="login template d-flex justify-content-center align-items-center ">
                <div className="form_container p-5 rounded bg-white align-items-center">
                  <form>
                    <h3 className="signin text-center">Sign In</h3>
                    <div className="mb-2">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3 mt-12"
                      >
                        <Form.Control
                          type="email"
                          placeholder="name@example.com"
                        />
                      </FloatingLabel>
                    </div>
                    <div className="mb-2">
                      <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                      >
                        <Form.Control type="password" placeholder="Password" />
                      </FloatingLabel>
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
                      <button className="btn btn-primary">Sign In</button>
                      <button className="btn btn-danger ms-2">Cancel</button>
                    </div>
                    <p className="text-end mt-2">
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

export default LoginPage;
