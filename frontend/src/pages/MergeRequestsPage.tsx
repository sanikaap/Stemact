import { useState } from "react";
import {
  Search,
  Filter,
  ExternalLink,
  FileCode2,
  AlertCircle,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { RiskBadge } from "../components/ui/RiskBadge";
import { StatusBadge } from "../components/ui/StatusBadge";
import { Modal } from "../components/ui/Modal";
import {
  mergeRequests,
  type MergeRequest,
  type RiskLevel,
  type MRStatus,
} from "../data/mockData";
import clsx from "clsx";

type SortField = "riskScore" | "createdAt";
type SortDir = "asc" | "desc";

const blastColors: Record<string, string> = {
  Low: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20",
  Medium:
    "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20",
  High: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20",
};

export function MergeRequestsPage() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");
  const [statusFilter, setStatusFilter] = useState<MRStatus | "all">("all");
  const [sortField, setSortField] = useState<SortField>("riskScore");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedMR, setSelectedMR] = useState<MergeRequest | null>(null);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const filtered = mergeRequests
    .filter((mr) => {
      if (
        search &&
        !mr.title.toLowerCase().includes(search.toLowerCase()) &&
        !mr.project.toLowerCase().includes(search.toLowerCase()) &&
        !mr.author.toLowerCase().includes(search.toLowerCase()) &&
        !mr.id.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (riskFilter !== "all" && mr.riskLevel !== riskFilter) return false;
      if (statusFilter !== "all" && mr.status !== statusFilter) return false;
      return true;
    })
    .sort((a, b) => {
      const dir = sortDir === "desc" ? -1 : 1;
      if (sortField === "riskScore") return (a.riskScore - b.riskScore) * dir;
      return (
        (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
        dir
      );
    });

  const SortIcon = ({ field }: { field: SortField }) =>
    sortField === field ? (
      sortDir === "desc" ? (
        <ChevronDown className="w-3 h-3" />
      ) : (
        <ChevronUp className="w-3 h-3" />
      )
    ) : (
      <ChevronDown className="w-3 h-3 opacity-30" />
    );

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div>
          <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Merge Requests
          </h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {mergeRequests.length} MRs tracked · {filtered.length} shown
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, project, author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-9 text-xs"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value as RiskLevel | "all")}
            className="input text-xs w-auto py-2"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as MRStatus | "all")
            }
            className="input text-xs w-auto py-2"
          >
            <option value="all">All Statuses</option>
            <option value="blocked">Blocked</option>
            <option value="review">Review</option>
            <option value="safe">Safe</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40">
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  MR Title
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Author
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Project
                </th>
                <th
                  className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 select-none"
                  onClick={() => toggleSort("riskScore")}
                >
                  <span className="flex items-center gap-1">
                    Risk Score <SortIcon field="riskScore" />
                  </span>
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Blast Radius
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Labels
                </th>
                <th
                  className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 select-none"
                  onClick={() => toggleSort("createdAt")}
                >
                  <span className="flex items-center gap-1">
                    Created <SortIcon field="createdAt" />
                  </span>
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-12 text-center text-gray-400 dark:text-gray-500 text-sm"
                  >
                    No merge requests match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((mr) => (
                  <tr
                    key={mr.id}
                    className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedMR(mr)}
                  >
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-[260px] text-sm">
                          {mr.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{mr.id}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={mr.avatarUrl}
                          alt={mr.author}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {mr.author}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded">
                        {mr.project}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <RiskBadge score={mr.riskScore} />
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={clsx(
                          "text-xs font-medium px-2 py-0.5 rounded",
                          blastColors[mr.blastRadius],
                        )}
                      >
                        {mr.blastRadius}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {mr.labels.slice(0, 2).map((l) => (
                          <span
                            key={l}
                            className="text-xs px-1.5 py-0.5 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded"
                          >
                            {l}
                          </span>
                        ))}
                        {mr.labels.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{mr.labels.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(mr.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMR(mr);
                        }}
                        className="text-xs px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-all active:scale-95"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MR Detail Modal */}
      <Modal
        isOpen={!!selectedMR}
        onClose={() => setSelectedMR(null)}
        title={selectedMR ? `${selectedMR.id} — Details` : ""}
        size="xl"
      >
        {selectedMR && (
          <div className="space-y-5">
            {/* Title + status */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  {selectedMR.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {selectedMR.project} · by {selectedMR.author}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <RiskBadge score={selectedMR.riskScore} />
                <StatusBadge status={selectedMR.status} />
              </div>
            </div>

            {/* Risk breakdown */}
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
                Risk Score Breakdown
              </h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-2 rounded-full flex-1 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className={clsx(
                      "h-full rounded-full transition-all",
                      selectedMR.riskScore >= 85
                        ? "bg-red-500"
                        : selectedMR.riskScore >= 65
                          ? "bg-orange-500"
                          : selectedMR.riskScore >= 40
                            ? "bg-yellow-500"
                            : "bg-green-500",
                    )}
                    style={{ width: `${selectedMR.riskScore}%` }}
                  />
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100 tabular-nums">
                  {selectedMR.riskScore}
                  <span className="text-sm font-normal text-gray-400">
                    /100
                  </span>
                </span>
              </div>
              <ul className="space-y-1.5">
                {selectedMR.riskReasons.map((r, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Affected files */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-blue-500" />
                Affected Files ({selectedMR.affectedFiles.length})
              </h4>
              <div className="space-y-1">
                {selectedMR.affectedFiles.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-xs font-mono text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested action */}
            <div className="rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/20 p-4">
              <h4 className="text-xs font-semibold text-brand-700 dark:text-brand-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Suggested Action
              </h4>
              <p className="text-sm text-brand-700 dark:text-brand-300">
                {selectedMR.suggestedAction}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={selectedMR.gitlabUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Open in GitLab <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedMR(null)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
