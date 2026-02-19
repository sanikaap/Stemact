import clsx from "clsx";
import type { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  iconColor?: string;
  iconBg?: string;
  trend?: { value: number; label: string };
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  iconColor,
  iconBg,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={clsx(
        "card p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100 tabular-nums">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
        <div
          className={clsx(
            "p-2.5 rounded-lg",
            iconBg ?? "bg-brand-50 dark:bg-brand-900/20",
          )}
        >
          <span
            className={clsx(
              "w-5 h-5 block",
              iconColor ?? "text-brand-600 dark:text-brand-400",
            )}
          >
            {icon}
          </span>
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className={clsx(
              "font-medium",
              trend.value >= 0 ? "text-red-500" : "text-green-500",
            )}
          >
            {trend.value >= 0 ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-gray-400 dark:text-gray-500">
            {trend.label}
          </span>
        </div>
      )}
    </div>
  );
}
