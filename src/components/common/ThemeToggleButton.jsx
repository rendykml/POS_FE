import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center h-11 w-11 rounded-full
        border border-gray-200 bg-white text-gray-500
        hover:bg-gray-100 hover:text-gray-700
        dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white
        transition-colors"
      aria-label="Toggle theme"
    >
      {/* DARK MODE ICON */}
      <Moon
        size={20}
        className={`absolute transition-all ${
          theme === "dark"
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0"
        }`}
      />

      {/* LIGHT MODE ICON */}
      <Sun
        size={20}
        className={`absolute transition-all ${
          theme === "light"
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0"
        }`}
      />
    </button>
  );
}
