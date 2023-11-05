import { Container, Row, Col } from "react-bootstrap";
import HeroImage from "../../assets/img/hero.png";
import { Link } from "react-router-dom";
import "../../dist/css/main.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="w-100 min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="header-box d-flex align-items-center">
            <Col lg="6">
              <h1>
                Aplikasi <br /> <span> Perizinan Pondok Pesantren </span> <br />
                Daarul Istiqlal Medan
              </h1>
              <p className="mb-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Maiores, consequuntur autem soluta laborum laudantium aperiam
                blanditiis impedit perferendis laboriosam iusto ut ullam
                aspernatur, similique culpa excepturi quas facilis cum quod!
              </p>
              <Link to="/login">
                <button className="btn btn-danger btn-lg rounded-1 me-2 mb-xs-0 mb-2">
                  Login
                </button>
              </Link>
              <button className="btn btn-outline-danger btn-lg rounded-1">
                Register
              </button>
            </Col>
            <Col lg="6" className="pt-lg-0 pt-5">
              <img src={HeroImage} alt="hero-img" />
            </Col>
          </Row>
        </Container>
      </header>
      <div className="kelas w-100 min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold">Kelas Terbaru</h1>
              <p className="text-center">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Sapiente nisi suscipit aliquam fugit recusandae, cumque ex
                impedit sunt nemo eaque quisquam, necessitatibus dignissimos
                possimus esse! Debitis, fugit quo. Deleniti, eos!
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
