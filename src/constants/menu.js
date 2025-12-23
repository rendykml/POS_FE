import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Boxes,
  Archive,
} from "lucide-react";

export const sidebarMenuByRole = {
  admin: {
    main: [
      {
        icon: LayoutDashboard,
        name: "Dashboard",
        path: "/admin",
      },
      {
        icon: Users,
        name: "Users",
        path: "/admin/users",
      },
      {
        icon: Package,
        name: "Products",
        path: "/admin/products",
        
      },
      {
        icon: Boxes,
        name: "Categories",
        path: "/admin/categories",
      },
    ],
    others: [
      {
        icon: BarChart3,
        name: "Reports",
        path: "/admin/sales-report",
      },
    ],
  },

  kasir: {
    main: [
      {
        icon: LayoutDashboard,
        name: "Dashboard",
        path: "/kasir",
      },
      {
        icon: ShoppingCart,
        name: "Sales",
        path: "/kasir/sales",
      },
    ],
    others: [
      {
        icon: BarChart3,
        name: "Sales Report",
        path: "/kasir/sales-report",
      },
    ],
  },

  gudang: {
    main: [
      {
        icon: LayoutDashboard,
        name: "Dashboard",
        path: "/gudang",
      },
      {
        icon: Archive,
        name: "Stock In",
        path: "/gudang/stock-in",
      },
      {
        icon: Archive,
        name: "Stock Out",
        path: "/gudang/stock-out",
      },
    ],
    others: [
      {
        icon: Package,
        name: "Low Stock",
        path: "/gudang/low-stock",
      },
    ],
  },
};
