import React from "react";
import NavbarAdminComponent from "../components/NavbarAdminComponent";
import SideBarComponents from "../components/SideBarComponents";
import FooterComponents from "../components/FooterComponents";
import PropTypes from "prop-types";
import "../dist/css/admindashboard.css";
import "../assets/vendors/ti-icons/css/themify-icons.css";
import "../assets/vendors/base/vendor.bundle.base.css";

const LayoutUser = ({ children }) => {
  return (
    <React.Fragment>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <NavbarAdminComponent />
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row sidebaradmin">
              <div className="col-md-2">
                <SideBarComponents />
              </div>
              <div className="col-md-10">
                <main>{children}</main>
              </div>
              <FooterComponents />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

LayoutUser.propTypes = {
  children: PropTypes.node.isRequired, // Specify children prop type
};

export default LayoutUser;
