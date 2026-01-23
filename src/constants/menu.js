import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  UserStar,
  BarChart3,
  Boxes,
  Archive,
  UsersIcon,
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
        icon: UsersIcon,
        name: "User Management",
        subItems: [
          { name: "Users", path: "/admin/users", pro: false },
          { name: "Roles Access", path: "/admin/roles", pro: false },
        ],
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

      {
        icon: UserStar,
        name: "Suppliers",
        path : "/admin/suppliers",
      }
    ],

    others: [
      {
        icon: BarChart3,
        name: "Reports",
        subItems: [
          {
            name: "Summary",
            path: "/admin/reports/summary",
            pro: false,
          },
          {
            name: "Transactions",
            path: "/admin/reports/transactions",
            pro: false,
          },
          {
            name: "Cashier Report",
            path: "/admin/reports/cashier",
            pro: false,
          },
          {
            name: "Stock Report",
            path: "/admin/reports/stock",
            pro: false,
          },
        ],
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
        name: "Stock In & Out",
        path: "/gudang/stock-in-out",
      },
    
    ],
    others: [
      {
        icon: Package,
        name: "Logs",
        path: "/gudang/logs",
      },
    ],
  },
};
