import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Bell, X, AlertTriangle } from "lucide-react";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  /* ======================
     FETCH LOW STOCK
  ====================== */
  const fetchLowStock = async () => {
    try {
      setLoading(true);
      const res = await api.get("/dashboard/low-stock");

      setItems(res.data.data || []);
      setNotifying((res.data.total || 0) > 0);
    } catch (err) {
      console.error("Failed to load low stock notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };

  return (
    <div className="relative">
      {/* ================= BUTTON ================= */}
      <button
        onClick={handleClick}
        className="relative flex h-11 w-11 items-center justify-center rounded-full
          border border-gray-200 bg-white text-gray-500
          hover:bg-gray-100 hover:text-gray-700
          dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      >
        {notifying && (
          <span className="absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-500">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
          </span>
        )}

        <Bell size={20} />
      </button>

      {/* ================= DROPDOWN ================= */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-4 flex h-[420px] w-[360px] flex-col
          rounded-2xl border border-gray-200 bg-white p-3 shadow-lg
          dark:border-gray-800 dark:bg-gray-900 lg:right-0"
      >
        {/* HEADER */}
        <div className="mb-3 flex items-center justify-between border-b pb-3 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Low Stock Alert
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
          {loading ? (
            <li className="p-4 text-sm text-gray-500">
              Memuat notifikasi...
            </li>
          ) : items.length === 0 ? (
            <li className="p-4 text-sm text-gray-500 text-center">
              Tidak ada stok kritis 🎉
            </li>
          ) : (
            items.map((item) => (
              <li key={item.id}>
                <DropdownItem
                  onItemClick={closeDropdown}
                  className="flex gap-3 border-b p-3 hover:bg-gray-100
                    dark:border-gray-800 dark:hover:bg-white/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <AlertTriangle size={18} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Stok produk{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </span>{" "}
                      tersisa{" "}
                      <span className="font-semibold text-orange-600">
                        {item.stock}
                      </span>
                    </p>

                    <span className="mt-1 text-xs text-gray-500">
                      Batas minimum: {item.low_stock_threshold}
                    </span>
                  </div>
                </DropdownItem>
              </li>
            ))
          )}
        </ul>

        {/* FOOTER */}
        <Link
          to="/admin/products"
          className="mt-3 block rounded-lg border px-4 py-2 text-center text-sm font-medium
            text-gray-700 hover:bg-gray-100
            dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          Lihat Semua Produk
        </Link>
      </Dropdown>
    </div>
  );
}
