import Layout from "../Layout";
import MainDashboard from "../../components/MainDashboard";

// function DashboardPage() {
//   return (
//     <div className="container-scroller">
//       <div className="container-fluid page-body-wrapper full-page-wrapper">
//         <NavbarAdminComponent />
//         <div className="content-wrapper d-flex align-items-center auth px-0">
//           <div className="row sidebaradmin">
//             <div className="col-md-3">
//               <SideBarComponents />
//             </div>
//             <div className="col-md-9">
//               <MainDashboard />
//             </div>
//             <FooterComponents />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

const DashboardPage = () => {
  return (
    <Layout>
      <MainDashboard />
    </Layout>
  );
};

export default DashboardPage;
