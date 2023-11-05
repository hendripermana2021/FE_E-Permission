import FooterComponents from "../../components/FooterComponents";
import SideBarComponents from "../../components/SideBarComponents";
import NavbarAdminComponent from "../../components/NavbarAdminComponent";
import "../../dist/css/admindashboard.css";
import "../../dist/css/material.css";
import "../../assets/vendors/ti-icons/css/themify-icons.css";
import "../../assets/vendors/base/vendor.bundle.base.css";
import TableClass from "../../components/TablesClass";

function ClassRoomPages() {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <NavbarAdminComponent />
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row sidebaradmin">
            <div className="col-md-3">
              <SideBarComponents />
            </div>
            <div className="col-md-9">
              <TableClass />
            </div>
            <FooterComponents />
          </div>
        </div>
      </div>
    </div>
    // <div className="container-scroller">
    //   <NavbarAdminComponent />
    //   <div className="container-fluid page-body-wrapper">
    //     <SideBarComponents />
    //   </div>
    //   <FooterComponents />
    // </div>
  );
}

export default ClassRoomPages;
