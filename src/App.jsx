import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardKasir from "./pages/kasir/DashboardKasir";
import DashboardGudang from "./pages/gudang/DashboardGudang";
import UserManagement from "./pages/admin/UserManagement";
import Unauthorized from "./pages/Unauthorized";
import SalesPage from "./pages/kasir/SalesPage";
import RBACPage from "./pages/admin/RBACpage";
import ProductPage from "./pages/admin/ProductPage";
import CategoryPage from "./pages/admin/CategoryPage";
import StockInPage from "./pages/stock/StockInPage";
import StockOutPage from "./pages/stock/StockOutPage";
import SalesReportPage from "./pages/reports/SalesReportPage";
import LowStockPage from "./pages/stock/LowStockPage";
import ProductPage2 from "./pages/stock/ProductPage";
import TransactionHistoryPage from "./pages/reports/TransactionHistoryPage";

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
        {/* ➜ RBAC */}
        <Route
          path="/admin/rbac"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <RBACPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        {/* ➜ Manajemen Produk */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <ProductPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        {/* ➜ Manajemen Kategori */}
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <CategoryPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        {/* STOCK */}
        {/* Stok In */}
        <Route
          path="/admin/stock-in"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <StockInPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        {/* ADMIN STOCK OUT */}
        <Route
          path="/admin/stock-out"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <StockOutPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/sales-report"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <SalesReportPage />
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
        <Route
          path="/kasir/sales-report"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["kasir", "admin"]}>
                <SalesReportPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/kasir/history"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["kasir", "admin"]}>
                <TransactionHistoryPage />
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
        {/* GUDANG STOCK REPORT */}
        <Route
          path="/gudang/stock-in"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["gudang", "admin"]}>
                <StockInPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        {/* GUDANG STOCK OUT */}
        <Route
          path="/gudang/stock-out"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["gudang", "admin"]}>
                <StockOutPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/gudang/low-stock"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["gudang", "admin"]}>
                <LowStockPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/gudang/products"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["gudang", "admin"]}>
                <ProductPage2 />
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
