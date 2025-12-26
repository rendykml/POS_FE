import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/DashboardLayout";

import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardKasir from "./pages/kasir/DashboardKasir";
import DashboardGudang from "./pages/gudang/DashboardGudang";
import CategoryPage from "./pages/admin/CategoryPage";
import ProductPage from "./pages/admin/ProductPage";
import UserManagementPage from "./pages/admin/UserManagement";
import SalesReportPage from "./pages/reports/SalesReportPage";
import SalesPage from "./pages/kasir/SalesPage";
import LowStockPage from "./pages/stock/LowStockPage";

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

         {/* ADMIN - PRODUCTS */}
        <Route
          path="admin/products"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <ProductPage />
            </RoleRoute>
          }
        />

        {/* ADMIN - USER MANAGEMENT */}
        <Route
          path="admin/users"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <UserManagementPage />
            </RoleRoute>
          }
        />
        {/*admin sales report*/}
        <Route
          path="admin/sales-report"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <SalesReportPage />
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
        {/*kasir sales report*/}
        <Route
          path="kasir/sales-report"
          element={
            <RoleRoute allowedRoles={["kasir"]}>
              <SalesReportPage />
            </RoleRoute>
          }
        />
        {/*kasir sales*/}
        <Route
          path="kasir/sales"
          element={
            <RoleRoute allowedRoles={["kasir"]}>
              <SalesPage />
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
        {/* GUDANG - LOW STOCK */}
        <Route
          path="gudang/low-stock"
          element={
            <RoleRoute allowedRoles={["gudang"]}>
              <LowStockPage/>
            </RoleRoute>
          }
        />
      </Route>
    </Routes>
  );
}
