import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ChevronDown as ChevronDownIcon } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import { sidebarMenuByRole } from "../constants/menu";
import { useAuth } from "../context/authContext";

import {
  LayoutDashboard,
  Calendar,
  User,
  List,
  Table,
  FileText,
  PieChart,
  Layers,
  Plug,
  ChevronDown,
} from "lucide-react";

/* =========================
   MENU CONFIG
========================= */

/* =========================
   COMPONENT
========================= */
export default function AppSidebar() {
  const { user } = useAuth();
  const role = user?.role;

  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  // 2️⃣ BARU TURUNAN DARI HOOK
  

  // 3️⃣ BOLEH CONDITIONAL RETURN SETELAH SEMUA HOOK
  // if (!role) {
  //   return <div className="p-4 text-gray-400">Loading menu...</div>;
  // }
  console.log("USER:", user);
  console.log("ROLE:", role);
  console.log("MENU CONFIG:", sidebarMenuByRole);
  console.log("MENU ROLE:", sidebarMenuByRole[role]);

  // 4️⃣ LOGIKA BERDASARKAN ROLE
  const navItems = sidebarMenuByRole[role]?.main || [];
  const othersItems = sidebarMenuByRole[role]?.others || [];

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;

    ["mai", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;

      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType, index });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) setOpenSubmenu(null);
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key].scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prev) =>
      prev && prev.type === menuType && prev.index === index
        ? null
        : { type: menuType, index }
    );
  };

  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                <nav.icon size={20} />
              </span>

              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span className="menu-item-text">{nav.name}</span>
                  <ChevronDown
                    size={20}
                    className={`ml-auto w-5 h-5 transition-transform ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "rotate-180 text-brand-500"
                        : ""
                    }`}
                  />
                </>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  <nav.icon size={20} />
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}

          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => (subMenuRefs.current[`${menuType}-${index}`] = el)}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 lg:mt-0 top-0 left-0 h-screen z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        transition-all duration-300
        ${isExpanded || isHovered || isMobileOpen ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="py-8 px-5">
        <Link to="/">
          <img src="/images/logo/logo.svg" alt="Logo" width={150} height={40} />
        </Link>
      </div>

      <div className="overflow-y-auto no-scrollbar">
        <nav className="mb-6 px-5">
          <h2 className="mb-4 ml-2 text-xs uppercase text-gray-400">Menu</h2>
          {renderMenuItems(navItems, "main")}

          <h2 className="mt-8 mb-4 text-xs uppercase text-gray-400">Others</h2>
          {renderMenuItems(othersItems, "others")}
        </nav>
      </div>
    </aside>
  );
}
