import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/DashboardLayout";

import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardKasir from "./pages/kasir/DashboardKasir";
import DashboardGudang from "./pages/gudang/DashboardGudang";
import CategoryPage from "./pages/admin/CategoryPage";
import ProductPage from "./pages/admin/ProductPage";
import UserManagementPage from "./pages/admin/UserManagement";
import SalesReportPage from "./pages/reports/MySalesReportPage";
import SalesPage from "./pages/kasir/SalesPage";
import LowStockPage from "./pages/stock/LowStockPage";
import RoleManagementPage from "./pages/admin/RoleManagement";
import ReportSummaryPage from "./pages/reports/ReportSummaryPage";
import ReportTransactionsPage from "./pages/reports/ReportsTransactions";
import TransactionDetailPage from "./pages/reports/TransactionDetailPage";
import ReportCashierPage from "./pages/reports/ReportCashierPage";
import ReportsStockPage from "./pages/reports/ReportStockPage";
import StockAction from "./pages/stock/StockActionPage";
import LogsPage from "./pages/stock/LogsPage";

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

        <Route 
          path="admin/roles"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <RoleManagementPage />
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
        {/*admin report summary*/}
        <Route
          path="admin/reports/summary"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <ReportSummaryPage />
            </RoleRoute>
          }
        />

        {/*admin report transactions*/}
        <Route
          path="admin/reports/transactions"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <ReportTransactionsPage />
            </RoleRoute>
          }
        />
        {/*admin report transaction detail*/}
        <Route
          path="admin/reports/transactions/:sale"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <TransactionDetailPage />
            </RoleRoute>
          }
        />

        {/*admin report cashier*/}
        <Route
          path="admin/reports/cashier"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <ReportCashierPage />
            </RoleRoute>
          }
        />

        {/*admin report stock */}
        <Route 
          path="admin/reports/stock"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <ReportsStockPage />
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
        {/* GUDANG - STOCK IN */}
        <Route
          path="gudang/stock-in-out"
          element={
            <RoleRoute allowedRoles={["gudang"]}>
              <StockAction/>
            </RoleRoute>
          }
        />
      
        {/* GUDANG - LOGS */}
        <Route
          path="gudang/logs"
          element={
            <RoleRoute allowedRoles={["gudang"]}>
              <LogsPage/>
            </RoleRoute>
          }
        />
      </Route>
    </Routes>
  );
}
