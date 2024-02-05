import { Container, Row, Col } from "react-bootstrap";

import HeroImage from "../../assets/img/hero.png";

import "../../dist/css/login.css";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import serverDev from "../../Server";

import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const Login = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post(`${serverDev}login`, {
  //       email: email,
  //       password: password,
  //     });
  //     navigate("/dashboard");
  //   } catch (error) {
  //     if (error.response) {
  //       console.log(error.response.data);
  //       setMsg(error.response.data.msg);
  //       setShow(true);
  //     }
  //   }
  // };

  const Login = async (e) => {
    e.preventDefault();
    try {
      const post = await axios.post(`${serverDev}/v1/api/login`, {
        email: email,
        password: password,
      });
      const token = post.data.accessToken;
      sessionStorage.setItem("accessToken", token);
      const decoded = jwt_decode(token);

      if (parseInt(decoded.role_id) === 1) {
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "You have successfully logged in!",
        });
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid username or password",
        });
      }
    }
  };

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
                  <form onSubmit={Login}>
                    <h3 className="signin text-center">Sign In</h3>
                    <div className="flex-column align-items-center mb-2">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="example100@gmail.com"
                        id="email"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>

                    <div className="flex-column align-items-start">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
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
                      <button className="btn btn-primary" type="submit">
                        Sign In
                      </button>
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
