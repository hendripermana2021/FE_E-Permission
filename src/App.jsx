import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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

const LayoutRoute = ({ element, ...rest }) => (
  <div>
    <NavbarComponent />
    {element}
  </div>
);

const AdminRoutes = () => (
  <Routes>
    <Route index element={<DashboardPage />} />
    <Route path="roompage" element={<RoomsPage />} />
    <Route path="students" element={<StudentsPage />} />
    <Route path="employes" element={<EmployeePage />} />
    <Route path="permission" element={<PermissionPage />} />
    <Route path="kriteria" element={<KriteriaPage />} />
    <Route path="cpi-calculated" element={<CalculatedPage />} />
    <Route path="approval" element={<ApprovalPage />} />
  </Routes>
);

const App = () => {
  const token = sessionStorage.getItem("accessToken");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // navigate
      navigate("/login");
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/dashboard/*" element={<AdminRoutes />} />
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
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default App;
