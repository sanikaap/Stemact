import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  GitMerge,
  ShieldAlert,
  Activity,
  Settings,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/merge-requests", label: "Merge Requests", icon: GitMerge },
  { to: "/vulnerabilities", label: "Vulnerabilities", icon: ShieldAlert },
  { to: "/logs", label: "Agent Logs", icon: Activity },
  { to: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  isCollapsed?: boolean;
}

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <aside
      className={clsx(
        "h-screen sticky top-0 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 shrink-0",
        isCollapsed ? "w-16" : "w-60",
      )}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-4 cursor-pointer group"
        onClick={() => navigate("/dashboard")}
      >
        <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
            <path d="M8 22L16 10L24 22H8Z" fill="white" fillOpacity="0.9" />
            <circle cx="16" cy="18" r="3" fill="#a4bcfd" />
          </svg>
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <span className="text-sm font-bold text-gray-900 dark:text-gray-100 block leading-tight">
              Stemact
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 block">
              Release Safety Officer
            </span>
          </div>
        )}
      </div>

      <div className="h-px bg-gray-100 dark:bg-gray-800 mx-3" />

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative",
                isActive
                  ? "bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800",
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-brand-600 rounded-full" />
                )}
                <Icon
                  className={clsx(
                    "w-4 h-4 shrink-0",
                    isActive ? "text-brand-600 dark:text-brand-400" : "",
                  )}
                />
                {!isCollapsed && <span className="truncate">{label}</span>}
                {!isCollapsed && isActive && (
                  <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Agent active
            </span>
          </div>
          <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">
            v0.9.4-beta
          </p>
        </div>
      )}
    </aside>
  );
}
