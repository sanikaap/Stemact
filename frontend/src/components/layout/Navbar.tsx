import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";
import clsx from "clsx";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard Overview",
  "/merge-requests": "Merge Requests",
  "/vulnerabilities": "Vulnerabilities",
  "/logs": "Agent Activity Logs",
  "/settings": "Settings",
};

export function Navbar() {
  const { isDark, toggle } = useDarkMode();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const pageTitle = pageTitles[location.pathname] ?? "Stemact";

  return (
    <header className="h-14 sticky top-0 z-40 flex items-center justify-between px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200 hidden md:block">
        {pageTitle}
      </h1>

      <div className="flex items-center gap-3 ml-auto">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search MRs, CVEs..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-56 pl-9 pr-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-brand-400 rounded-lg text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-all duration-150 focus:w-72"
          />
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggle}
          className={clsx(
            "p-2 rounded-lg transition-all duration-150",
            "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800",
          )}
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-150">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 p-1.5 pr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-150"
          >
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=Admin&backgroundColor=6175f7"
              alt="Avatar"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
              Admin
            </span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 animate-slide-in z-50">
              {[
                { icon: User, label: "Profile" },
                { icon: Settings, label: "Settings" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-gray-400" />
                  {label}
                </button>
              ))}
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />
              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
