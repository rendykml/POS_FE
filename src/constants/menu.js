export const menuByRole = {
  admin: [
    { name: "Dashboard", icon: "LayoutDashboard", path: "/admin" },
    { name: "User Management", icon: "Users", path: "/admin/users" },
    { name: "Role & Menu Access", icon: "ShieldCheck", path: "/admin/rbac" },
    { name: "Produk", icon: "Package", path: "/admin/products" },
    { name: "Kategori", icon: "Tags", path: "/admin/categories" },
    { name: "Stok Masuk", icon: "PackagePlus", path: "/admin/stock-in" },
    { name: "Stok Keluar", icon: "PackageMinus", path: "/admin/stock-out" },
    { name: "Laporan Penjualan", icon: "FileBarChart", path: "/admin/reports" },
  ],

  kasir: [
    { name: "Dashboard", icon: "LayoutDashboard", path: "/kasir" },
    { name: "Transaksi Penjualan", icon: "ShoppingCart", path: "/kasir/sales" },
    { name: "Riwayat Transaksi", icon: "History", path: "/kasir/history" },
    { name: "Laporan Penjualan", icon: "FileBarChart", path: "/kasir/reports" },
  ],

  gudang: [
    { name: "Dashboard", icon: "LayoutDashboard", path: "/gudang" },
    { name: "Produk", icon: "PackageSearch", path: "/gudang/products" },
    { name: "Stok Menipis", icon: "Bell", path: "/gudang/low-stock" },
    { name: "Stok Masuk", icon: "PackagePlus", path: "/gudang/stock-in" },
    { name: "Stok Keluar", icon: "PackageMinus", path: "/gudang/stock-out" },
  ],
};
