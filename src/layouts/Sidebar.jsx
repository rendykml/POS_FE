import * as Icons from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { menuByRole } from "../constants/menu";

export default function Sidebar() {
  const role = useAuthStore((state) => state.role);
  const menus = menuByRole[role] || [];
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5">
      <h1 className="text-xl font-bold mb-8">POS System</h1>

      <nav className="space-y-2">
        {menus.map((item, i) => {
          const LucideIcon = Icons[item.icon];

          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={i}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer 
                ${isActive ? "bg-cyan-600" : "hover:bg-gray-700"}`}
            >
              <LucideIcon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
