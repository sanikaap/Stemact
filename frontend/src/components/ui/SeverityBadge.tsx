import clsx from "clsx";
import type { Severity } from "../../data/mockData";

interface SeverityBadgeProps {
  severity: Severity;
  size?: "sm" | "md";
}

const severityStyles: Record<Severity, string> = {
  critical:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-800",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 ring-1 ring-orange-200 dark:ring-orange-800",
  medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-200 dark:ring-yellow-800",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-800",
};

export function SeverityBadge({ severity, size = "md" }: SeverityBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center font-semibold rounded-full uppercase tracking-wide",
        severityStyles[severity],
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
      )}
    >
      {severity}
    </span>
  );
}
