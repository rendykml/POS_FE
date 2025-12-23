import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/DashboardLayout";

import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardKasir from "./pages/kasir/DashboardKasir";
import DashboardGudang from "./pages/gudang/DashboardGudang";
import CategoryPage from "./pages/admin/CategoryPage";
import Login from "./pages/Login";

import ProtectedRoute from "./routers/ProtectedRoute";
import RoleRoute from "./routers/RoleRoute";
import RootRedirect from "./routers/RouteRedirect";

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RootRedirect />} />

      {/* PROTECTED + LAYOUT */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* ADMIN */}
        <Route
          path="admin"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <DashboardAdmin />
            </RoleRoute>
          }
        />

        {/* ADMIN - CATEGORIES */}
        <Route
          path="admin/categories"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <CategoryPage />
            </RoleRoute>
          }
        />

        {/* KASIR */}
        <Route
          path="kasir"
          element={
            <RoleRoute allowedRoles={["kasir"]}>
              <DashboardKasir />
            </RoleRoute>
          }
        />

        {/* GUDANG */}
        <Route
          path="gudang"
          element={
            <RoleRoute allowedRoles={["gudang"]}>
              <DashboardGudang />
            </RoleRoute>
          }
        />
      </Route>
    </Routes>
  );
}
