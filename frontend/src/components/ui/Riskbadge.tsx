import clsx from "clsx";

type RiskLevel = "low" | "medium" | "high" | "critical";

interface RiskBadgeProps {
  score?: number;
  level?: RiskLevel;
  showScore?: boolean;
  size?: "sm" | "md";
}

function getRiskLevel(score: number): RiskLevel {
  if (score >= 85) return "critical";
  if (score >= 65) return "high";
  if (score >= 40) return "medium";
  return "low";
}

const levelStyles: Record<RiskLevel, string> = {
  critical:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-800",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 ring-1 ring-orange-200 dark:ring-orange-800",
  medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-200 dark:ring-yellow-800",
  low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-800",
};

const dotStyles: Record<RiskLevel, string> = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

export function RiskBadge({
  score,
  level,
  showScore = true,
  size = "md",
}: RiskBadgeProps) {
  const resolvedLevel: RiskLevel =
    level ?? (score !== undefined ? getRiskLevel(score) : "low");

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 font-medium rounded-full",
        levelStyles[resolvedLevel],
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
      )}
    >
      <span
        className={clsx(
          "rounded-full shrink-0",
          dotStyles[resolvedLevel],
          size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2",
        )}
      />
      {showScore && score !== undefined
        ? `${score}/100`
        : resolvedLevel.charAt(0).toUpperCase() + resolvedLevel.slice(1)}
    </span>
  );
}
