import clsx from "clsx";

interface StatusBadgeProps {
  status:
    | "safe"
    | "review"
    | "blocked"
    | "open"
    | "merged"
    | "closed"
    | "fixed"
    | "pending";
  size?: "sm" | "md";
}

const statusStyles: Record<string, string> = {
  safe: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-800",
  review:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-200 dark:ring-yellow-800",
  blocked:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-800",
  open: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-800",
  merged:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 ring-1 ring-purple-200 dark:ring-purple-800",
  closed:
    "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 ring-1 ring-gray-200 dark:ring-gray-700",
  fixed:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-800",
  pending:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 ring-1 ring-orange-200 dark:ring-orange-800",
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium rounded-full capitalize",
        statusStyles[status] ?? statusStyles.closed,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
      )}
    >
      {status}
    </span>
  );
}
