import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useAuth } from "../../context/authContext";
import { ChevronDown, LogOut } from "lucide-react";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const handleLogout = () => {
    closeDropdown();
    logout();
    navigate("/login", { replace: true });
  };

  if (!user) return null; // safety

  return (
    <div className="relative">
      {/* TOGGLE */}
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/images/profile.jpg" alt="User" />
        </span>

        <span className="mr-1 font-medium text-sm">
          {user.username}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-4 w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-800 dark:bg-gray-900"
      >
        {/* USER INFO */}
        <div className="mb-3">
          <span className="block font-medium text-gray-700 dark:text-gray-300">
            {user.username} ganteng wow
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Rendykamaluddin@gmail.com
          </span>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-white/5"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </Dropdown>
    </div>
  );
}
