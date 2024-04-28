import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/NavbarComponent";
import CalculatedPage from "./pages/admin/CalculatedPage";
import DashboardPage from "./pages/admin/DashboardPage";
import EmployeePage from "./pages/admin/EmployeePage";
import FaqPage from "./pages/admin/FaqPage";
import HomePage from "./pages/admin/HomePage";
import KriteriaPage from "./pages/admin/KriteriaPage";
import LoginPage from "./pages/admin/LoginPage";
import PermissionPage from "./pages/admin/PermissionPage";
import RegisterPage from "./pages/admin/RegisterPage";
import RoomsPage from "./pages/admin/RoomsPage";
import StudentsPage from "./pages/admin/StudentsPage";
import SyaratKetentuanPage from "./pages/admin/SyaratKetentuanPage";
import Testimonial from "./pages/admin/Testimonial";
import ApprovalPage from "./pages/admin/ApprovalPage";
import { element } from "prop-types";

const LayoutRoute = ({ element, ...rest }) => (
  <div>
    <NavbarComponent />
    {element}
  </div>
);

const App = () => {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("accessToken");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // navigate
      navigate("/login");
    } else {
      const decode = jwt_decode(token);
      console.log(decode.role_id);
      setData(decode.role_id);
    }
  }, [token, navigate]);

  const AdminRoutes = () => (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route
        path="roompage"
        element={
          data == 1 ? (
            <RoomsPage />
          ) : data == 0 ? (
            <RoomsPage />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route path="students" element={<StudentsPage />} />
      <Route
        path="employes"
        element={
          data == 1 ? (
            <EmployeePage />
          ) : data == 0 ? (
            <EmployeePage />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route path="permission" element={<PermissionPage />} />
      <Route
        path="kriteria"
        element={
          data == 1 ? (
            <KriteriaPage />
          ) : data == 0 ? (
            <KriteriaPage />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="cpi-calculated"
        element={
          data == 1 ? (
            <CalculatedPage />
          ) : data == 0 ? (
            <CalculatedPage />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route path="approval" element={<ApprovalPage />} />
    </Routes>
  );

  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={<LayoutRoute element={<AdminRoutes />} />}
      />
      <Route path="/" element={<LayoutRoute element={<HomePage />} />} />
      <Route path="/kelas" element={<LayoutRoute />} />
      <Route
        path="/testimonial"
        element={<LayoutRoute element={<Testimonial />} />}
      />
      <Route path="/login" element={<LayoutRoute element={<LoginPage />} />} />
      <Route path="/faq" element={<LayoutRoute element={<FaqPage />} />} />
      <Route
        path="/signup"
        element={<LayoutRoute element={<RegisterPage />} />}
      />
      <Route
        path="/terms"
        element={<LayoutRoute element={<SyaratKetentuanPage />} />}
      />
    </Routes>
  );
};

export default App;
