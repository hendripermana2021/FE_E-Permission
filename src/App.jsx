import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/admin/HomePage";
import KelasPage from "./pages/admin/KelasPage";
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
import ClassRoomPages from "./pages/admin/ClassRoomPage";
import StudentsPage from "./pages/admin/StudentsPage";
import EmployeePage from "./pages/admin/EmployeePage";
import PermissionPage from "./pages/admin/PermissionPage";
import CalculatedPage from "./pages/admin/CalculatedPage";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavbarComponent />
              <HomePage />
            </div>
          }
        />
        <Route
          path="/kelas"
          element={
            <div>
              <NavbarComponent />
              <KelasPage />
            </div>
          }
        />

        <Route
          path="/testimonial"
          element={
            <div>
              <NavbarComponent />
              <Testimonial />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <NavbarComponent />
              <LoginPage />
            </div>
          }
        />
        <Route
          path="/faq"
          element={
            <div>
              <NavbarComponent />
              <FaqPage />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div>
              <NavbarComponent />
              <RegisterPage />
            </div>
          }
        />
        <Route
          path="/terms"
          element={
            <div>
              <NavbarComponent />
              <SyaratKetentuanPage />
            </div>
          }
        />
        <Route path="/admin">
          <Route index element={<DashboardPage />} />
          <Route path="roompage" element={<RoomsPage />} />
          <Route path="classpage" element={<ClassRoomPages />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="employes" element={<EmployeePage />} />
          <Route path="permission" element={<PermissionPage />} />
          <Route path="cpi-calculated" element={<CalculatedPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
