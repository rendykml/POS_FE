import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Bell, X } from "lucide-react";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={handleClick}
        className="relative flex items-center justify-center h-11 w-11 rounded-full
          border border-gray-200 bg-white text-gray-500
          hover:bg-gray-100 hover:text-gray-700
          dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        {/* NOTIFICATION DOT */}
        {notifying && (
          <span className="absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
          </span>
        )}

        <Bell size={20} />
      </button>

      {/* DROPDOWN */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-4 flex h-[480px] w-[350px] flex-col
          rounded-2xl border border-gray-200 bg-white p-3 shadow-lg
          dark:border-gray-800 dark:bg-gray-900 sm:w-[361px] lg:right-0"
      >
        {/* HEADER */}
        <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Notification
          </h5>

          <button
            onClick={toggleDropdown}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* LIST */}
        <ul className="flex flex-col overflow-y-auto custom-scrollbar">
          {/* ITEM */}
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex gap-3 border-b border-gray-100 p-3 hover:bg-gray-100
                dark:border-gray-800 dark:hover:bg-white/5"
            >
              <img
                src="/images/user/user-02.jpg"
                alt="User"
                className="h-10 w-10 rounded-full"
              />

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-white">
                    Terry Franci
                  </span>{" "}
                  requests permission to change{" "}
                  <span className="font-medium text-gray-800 dark:text-white">
                    Project - Nganter App
                  </span>
                </p>

                <span className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Project</span>
                  <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                  <span>5 min ago</span>
                </span>
              </div>
            </DropdownItem>
          </li>

          {/* DUPLICATE ITEM (contoh lain, data nanti bisa dari API) */}
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex gap-3 border-b border-gray-100 p-3 hover:bg-gray-100
                dark:border-gray-800 dark:hover:bg-white/5"
            >
              <img
                src="/images/user/user-03.jpg"
                alt="User"
                className="h-10 w-10 rounded-full"
              />

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-white">
                    Alena Franci
                  </span>{" "}
                  requested update on{" "}
                  <span className="font-medium text-gray-800 dark:text-white">
                    Project - Nganter App
                  </span>
                </p>

                <span className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Project</span>
                  <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                  <span>8 min ago</span>
                </span>
              </div>
            </DropdownItem>
          </li>
        </ul>

        {/* FOOTER */}
        <Link
          to="/"
          className="mt-3 block rounded-lg border border-gray-300 bg-white px-4 py-2
            text-center text-sm font-medium text-gray-700 hover:bg-gray-100
            dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          View All Notifications
        </Link>
      </Dropdown>
    </div>
  );
}
