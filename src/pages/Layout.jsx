import React from "react";
import NavbarAdminComponent from "../components/NavbarAdminComponent";
import SideBarComponents from "../components/SideBarComponents";
import FooterComponents from "../components/FooterComponents";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "../dist/css/admindashboard.css";
import "../dist/css/layout.css";
import "../dist/css/dstables.css";
import "../assets/vendors/ti-icons/css/themify-icons.css";
import "../assets/vendors/base/vendor.bundle.base.css";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      {/* <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <NavbarAdminComponent />
          <div className="content-wrapper layout1 d-flex align-items-center auth px-0">
            <div className="row sidebaradmin">
              <div className="col-md-2">
                <SideBarComponents />
              </div>
              <div className="col-md-10 col-sm-10 col-xl-10 col-lg-10">
                <main>{children}</main>
              </div>
              <FooterComponents />
            </div>
          </div>
        </div>
      </div> */}
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <Container fluid className="ms-6 ps-0">
        {/* Navbar */}
        <Row>
          <Col>
            <NavbarAdminComponent />
          </Col>
        </Row>

        {/* Main Content */}
        <Row>
          <Col md={2} className="sidebaradmin mt-5">
            {/* Sidebar */}
            <SideBarComponents />
          </Col>
          <Col md={10} className="mt-4 pt-3">
            <div className="content">{children}</div>
          </Col>
        </Row>

        {/* Footer */}
        <Row>
          <Col>
            <FooterComponents />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired, // Specify children prop type
};

export default Layout;
