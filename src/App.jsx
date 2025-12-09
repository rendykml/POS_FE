import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardKasir from "./pages/kasir/DashboardKasir";
import DashboardGudang from "./pages/gudang/DashboardGudang";
import UserManagement from "./pages/admin/UserManagement";
import Unauthorized from "./pages/Unauthorized";
import SalesPage from "./pages/kasir/SalesPage";

import ProtectedRoute from "./routers/ProtectedRoute";
import RoleRoute from "./routers/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect ke login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <DashboardAdmin />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* ➜ Manajemen User */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <UserManagement />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* KASIR */}
        <Route
          path="/kasir"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["kasir"]}>
                <DashboardKasir />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/kasir/sales"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["kasir"]}>
                <SalesPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* GUDANG */}
        <Route
          path="/gudang"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["gudang"]}>
                <DashboardGudang />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
