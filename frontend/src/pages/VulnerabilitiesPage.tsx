import { useState } from "react";
import { ExternalLink, GitMerge, Package, ShieldCheck } from "lucide-react";
import { SeverityBadge } from "../components/ui/SeverityBadge";
import { StatusBadge } from "../components/ui/StatusBadge";
import {
  vulnerabilities,
  fixMRs,
  type Severity,
  type VulnStatus,
} from "../data/mockData";
import clsx from "clsx";

export function VulnerabilitiesPage() {
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all");
  const [statusFilter, setStatusFilter] = useState<VulnStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = vulnerabilities.filter((v) => {
    if (severityFilter !== "all" && v.severity !== severityFilter) return false;
    if (statusFilter !== "all" && v.status !== statusFilter) return false;
    if (
      search &&
      !v.cveId.toLowerCase().includes(search.toLowerCase()) &&
      !v.packageName.toLowerCase().includes(search.toLowerCase()) &&
      !v.project.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const criticalCount = vulnerabilities.filter(
    (v) => v.severity === "critical",
  ).length;
  const highCount = vulnerabilities.filter((v) => v.severity === "high").length;
  const pendingCount = vulnerabilities.filter(
    (v) => v.status === "pending",
  ).length;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-start gap-4 justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Vulnerabilities
          </h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Detected from pipeline scans
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2.5 py-1.5 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5" />
            {criticalCount} Critical
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2.5 py-1.5 rounded-lg">
            {highCount} High
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-2.5 py-1.5 rounded-lg">
            {pendingCount} Pending fix
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <input
            type="text"
            placeholder="Search CVE, package, project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input text-xs"
          />
        </div>
        <select
          value={severityFilter}
          onChange={(e) =>
            setSeverityFilter(e.target.value as Severity | "all")
          }
          className="input text-xs w-auto py-2"
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as VulnStatus | "all")
          }
          className="input text-xs w-auto py-2"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="fixed">Fixed</option>
        </select>
      </div>

      {/* Vulnerabilities table */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Detected Vulnerabilities
            <span className="ml-2 text-xs font-normal text-gray-400">
              ({filtered.length} / {vulnerabilities.length})
            </span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40">
                {[
                  "CVE ID",
                  "Package",
                  "Installed",
                  "Fix Version",
                  "Severity",
                  "Status",
                  "Project",
                  "Related MR",
                ].map((h) => (
                  <th
                    key={h}
                    className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-gray-400 text-sm"
                  >
                    No vulnerabilities match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">
                        {v.cveId}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-gray-400" />
                        <span className="font-mono text-xs text-gray-700 dark:text-gray-300">
                          {v.packageName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs text-gray-400 line-through">
                        {v.installedVersion}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs text-green-600 dark:text-green-400 font-semibold">
                        {v.fixedVersion}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <SeverityBadge severity={v.severity} size="sm" />
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={v.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded">
                        {v.project}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {v.relatedMRId ? (
                        <span className="text-xs font-mono text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20 px-2 py-0.5 rounded">
                          {v.relatedMRId}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300 dark:text-gray-600">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Auto Fix MRs section */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <GitMerge className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Auto Fix MRs Generated
            </h2>
            <span className="text-xs font-medium px-2 py-0.5 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded-full">
              {fixMRs.length}
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 ml-6">
            Automatically created by the Stemact agent to patch vulnerabilities
          </p>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
          {fixMRs.map((mr) => (
            <div
              key={mr.id}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
            >
              <div
                className={clsx(
                  "w-2 h-2 rounded-full shrink-0",
                  mr.status === "merged"
                    ? "bg-purple-500"
                    : mr.status === "open"
                      ? "bg-green-500"
                      : "bg-gray-400",
                )}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {mr.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded mr-2">
                    {mr.project}
                  </span>
                  {new Date(mr.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <StatusBadge
                status={mr.status as "open" | "merged" | "closed"}
                size="sm"
              />
              <a
                href={mr.gitlabUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
