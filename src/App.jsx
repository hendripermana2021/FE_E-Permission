import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/admin/HomePage";
import Testimonial from "./pages/admin/Testimonial";
import SyaratKetentuanPage from "./pages/admin/SyaratKetentuanPage";
import FaqPage from "./pages/admin/FaqPage";
import NavbarComponent from "./components/NavbarComponent";
import LoginPage from "./pages/admin/LoginPage";
import RegisterPage from "./pages/admin/RegisterPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import DashboardPage from "./pages/admin/DashboardPage";
import RoomsPage from "./pages/admin/RoomsPage";
import StudentsPage from "./pages/admin/StudentsPage";
import EmployeePage from "./pages/admin/EmployeePage";
import PermissionPage from "./pages/admin/PermissionPage";
import CalculatedPage from "./pages/admin/CalculatedPage";
import KriteriaPage from "./pages/admin/KriteriaPage";

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
  </Routes>
);

const App = () => (
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

export default App;
