import { useState } from "react";
import {
  GitMerge,
  Tag,
  Lock,
  GitBranch,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Filter,
} from "lucide-react";
import { agentLogs, type LogActionType } from "../data/mockData";
import clsx from "clsx";

const actionConfig: Record<
  LogActionType,
  { label: string; icon: typeof GitMerge; color: string; iconColor: string }
> = {
  risk_score_posted: {
    label: "Risk Score Posted",
    icon: MessageSquare,
    color:
      "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    iconColor:
      "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40",
  },
  mr_labeled: {
    label: "MR Labeled",
    icon: Tag,
    color:
      "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
    iconColor:
      "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/40",
  },
  merge_blocked: {
    label: "Merge Blocked",
    icon: Lock,
    color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40",
  },
  fix_branch_created: {
    label: "Fix Branch Created",
    icon: GitBranch,
    color:
      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    iconColor:
      "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40",
  },
  fix_mr_created: {
    label: "Fix MR Created",
    icon: GitMerge,
    color:
      "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800",
    iconColor:
      "text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/40",
  },
};

const resultConfig = {
  success: { icon: CheckCircle2, color: "text-green-500" },
  warning: { icon: AlertTriangle, color: "text-yellow-500" },
  error: { icon: XCircle, color: "text-red-500" },
};

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return { date, time };
}

export function AgentLogsPage() {
  const [actionFilter, setActionFilter] = useState<LogActionType | "all">(
    "all",
  );
  const [resultFilter, setResultFilter] = useState<
    "all" | "success" | "warning" | "error"
  >("all");

  const filtered = agentLogs.filter((log) => {
    if (actionFilter !== "all" && log.actionType !== actionFilter) return false;
    if (resultFilter !== "all" && log.result !== resultFilter) return false;
    return true;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          Agent Activity Logs
        </h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Real-time activity timeline from the Stemact agent
        </p>
      </div>

      {/* Filters + stats */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex flex-wrap gap-2">
          {Object.entries(actionConfig).map(([key, { label, iconColor }]) => {
            const count = agentLogs.filter((l) => l.actionType === key).length;
            return (
              <button
                key={key}
                onClick={() =>
                  setActionFilter(
                    actionFilter === (key as LogActionType)
                      ? "all"
                      : (key as LogActionType),
                  )
                }
                className={clsx(
                  "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-medium transition-all duration-150",
                  actionFilter === key
                    ? `${iconColor} border-current`
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300",
                )}
              >
                {label}
                <span className="text-[10px] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={resultFilter}
            onChange={(e) =>
              setResultFilter(
                e.target.value as "all" | "success" | "warning" | "error",
              )
            }
            className="input text-xs w-auto py-1.5"
          >
            <option value="all">All Results</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500">
        {filtered.length} events
      </p>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

        <div className="space-y-3">
          {filtered.map((log) => {
            const action = actionConfig[log.actionType];
            const result = resultConfig[log.result];
            const ActionIcon = action.icon;
            const ResultIcon = result.icon;
            const { date, time } = formatTimestamp(log.timestamp);

            return (
              <div key={log.id} className="relative flex gap-4 animate-fade-in">
                {/* Icon */}
                <div
                  className={clsx(
                    "relative z-10 w-12 h-12 flex items-center justify-center rounded-xl border shrink-0",
                    action.color,
                  )}
                >
                  <ActionIcon
                    className={clsx("w-5 h-5", action.iconColor.split(" ")[0])}
                  />
                </div>

                {/* Content card */}
                <div className="flex-1 card p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                        {action.label}
                      </span>
                      <ResultIcon
                        className={clsx("w-3.5 h-3.5", result.color)}
                      />
                      <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">
                        {log.project}
                      </span>
                      {log.mrId !== "MR-N/A" && (
                        <span className="text-xs font-mono text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-1.5 py-0.5 rounded">
                          {log.mrId}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {time}
                      </p>
                      <p className="text-xs text-gray-300 dark:text-gray-600">
                        {date}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1.5">
                    {log.message}
                  </p>
                  {log.details && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 border-t border-gray-100 dark:border-gray-800 pt-1.5">
                      {log.details}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400 dark:text-gray-500 text-sm">
            No log entries match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
