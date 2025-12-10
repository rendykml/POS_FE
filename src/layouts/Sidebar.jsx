import { useRBACStore } from "../store/rbacStore";
import { useAuthStore } from "../store/authStore";
import * as Icons from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const role = useAuthStore((s) => s.role);
  const permissions = useRBACStore((s) => s.permissions);

  if (!permissions[role]) return null;

  const allowedMenus = Object.entries(permissions[role])
    .filter(([_, perm]) => perm.read)
    .map(([key]) => key);

  const menuConfig = {
    dashboard: { name: "Dashboard", icon: "Home", path: `/${role}` },
    products: { name: "Produk", icon: "Package", path: "/admin/products" },
    categories: { name: "Kategori", icon: "Tags", path: "/admin/categories" },
    stock_in: { name: "Stok Masuk", icon: "PackagePlus", path: `/${role}/stock-in` },
    stock_out: { name: "Stok Keluar", icon: "PackageMinus", path: `/${role}/stock-out` },
    sales: { name: "Transaksi", icon: "ShoppingCart", path: "/kasir/sales" },
    sales_report: { name: "Laporan Penjualan", icon: "FileBarChart", path: `/${role}/sales-report` },
    rbac: { name: "RBAC", icon: "ShieldCheck", path: "/admin/rbac" },
  };

  return (
    <aside className="w-64 bg-gray-900 text-white p-5">
      <nav>
        {allowedMenus.map((menuKey) => {
          const item = menuConfig[menuKey];
          if (!item) return null;

          const Icon = Icons[item.icon];

          return (
            <NavLink
              key={menuKey}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded hover:bg-gray-700"
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
