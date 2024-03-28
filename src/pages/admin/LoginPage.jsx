import { Container, Row, Col } from "react-bootstrap";
import HeroImage from "../../assets/img/logopondok.png";
import "../../dist/css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import serverDev from "../../Server";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in local storage
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      // Redirect to dashboard page
      navigate("/dashboard");
    }
  }, [navigate]);

  const Login = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const post = await axios.post(`${serverDev}login`, {
        email,
        password,
      });
      const token = post.data.accessToken;
      sessionStorage.setItem("accessToken", token);
      setIsSubmitting(false);

      Swal.fire({
        icon: "success",
        title: "Login Success",
        text: "You have successfully logged in!",
      });
      navigate("/dashboard");
    } catch (error) {
      setIsSubmitting(false);

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
          <Row className="align-items-center">
            <Col lg="6" className="pt-lg-0 pt-5 text-center">
              <img
                src={HeroImage}
                alt="hero-img"
                style={{ maxWidth: "60%" }}
                className="img-fluid"
              />
            </Col>
            <Col lg="6">
              <div className="login template d-flex justify-content-center align-items-center ">
                <div className="form_container p-5 rounded bg-white">
                  <form onSubmit={Login}>
                    <h3 className="signin text-center">Login Page</h3>
                    <div className="mb-4">
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
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
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
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="buttonLoginAndCancel d-flex mt-4 align-items-center text-center">
                      <button className="btn btn-primary" type="submit">
                        {isSubmitting ? "Loading..." : "Sign In"}
                      </button>
                      <button className="btn btn-danger ms-2">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default LoginPage;
