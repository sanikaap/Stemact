import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GitMerge,
  ShieldAlert,
  AlertTriangle,
  GitBranch,
  Lock,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { StatsCard } from "../components/ui/StatsCard";
import { RiskBadge } from "../components/ui/RiskBadge";
import { StatusBadge } from "../components/ui/StatusBadge";
import { CardSkeleton, TableSkeleton } from "../components/ui/Skeleton";
import {
  dashboardStats,
  riskTrend,
  severityDistribution,
  mergeRequests,
} from "../data/mockData";

const recentHighRisk = mergeRequests
  .filter((mr) => mr.riskScore >= 65)
  .slice(0, 5);

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const statsItems = [
    {
      title: "Total MRs Scanned",
      value: dashboardStats.totalMRsScanned,
      icon: <GitMerge className="w-5 h-5" />,
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      trend: { value: 12, label: "vs last week" },
    },
    {
      title: "High Risk MRs",
      value: dashboardStats.highRiskMRs,
      icon: <AlertTriangle className="w-5 h-5" />,
      iconBg: "bg-orange-50 dark:bg-orange-900/20",
      iconColor: "text-orange-600 dark:text-orange-400",
      trend: { value: 5, label: "vs last week" },
    },
    {
      title: "Vulnerabilities Detected",
      value: dashboardStats.vulnerabilitiesDetected,
      icon: <ShieldAlert className="w-5 h-5" />,
      iconBg: "bg-red-50 dark:bg-red-900/20",
      iconColor: "text-red-600 dark:text-red-400",
      trend: { value: -8, label: "vs last week" },
    },
    {
      title: "Fix MRs Generated",
      value: dashboardStats.fixMRsGenerated,
      icon: <GitBranch className="w-5 h-5" />,
      iconBg: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400",
      trend: { value: -3, label: "vs last week" },
    },
    {
      title: "Merge Blocks Applied",
      value: dashboardStats.mergeBlocksApplied,
      icon: <Lock className="w-5 h-5" />,
      iconBg: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      trend: { value: 2, label: "vs last week" },
    },
  ];

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {statsItems.map((item) => (
            <StatsCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={item.icon}
              iconBg={item.iconBg}
              iconColor={item.iconColor}
              trend={item.trend}
            />
          ))}
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Risk Score Trend */}
        <div className="card p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Risk Score Trend
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                Average risk score over last 7 days
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-600 dark:text-brand-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>7-day average</span>
            </div>
          </div>
          {loading ? (
            <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={riskTrend}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="text-gray-100 dark:text-gray-800"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "currentColor" }}
                  className="text-gray-400"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "currentColor" }}
                  className="text-gray-400"
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--tooltip-bg, #fff)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#6175f7"
                  strokeWidth={2.5}
                  dot={{ fill: "#6175f7", r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Severity Distribution */}
        <div className="card p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Vulnerability Severity
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              Distribution by severity level
            </p>
          </div>
          {loading ? (
            <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={severityDistribution}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {severityDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number, name: string) => [value, name]}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ fontSize: 11, textTransform: "capitalize" }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent High Risk MRs */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Recent High Risk Merge Requests
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              MRs with risk score ≥ 65
            </p>
          </div>
          <button
            onClick={() => navigate("/merge-requests")}
            className="flex items-center gap-1.5 text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium transition-colors"
          >
            View all <ExternalLink className="w-3 h-3" />
          </button>
        </div>
        {loading ? (
          <TableSkeleton rows={4} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  {[
                    "MR Title",
                    "Project",
                    "Risk Score",
                    "Status",
                    "Last Updated",
                  ].map((h) => (
                    <th
                      key={h}
                      className="py-3 px-5 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentHighRisk.map((mr) => (
                  <tr
                    key={mr.id}
                    onClick={() => navigate("/merge-requests")}
                    className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate max-w-xs">
                          {mr.title}
                        </span>
                        <span className="text-xs text-gray-400 mt-0.5">
                          {mr.id}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                        {mr.project}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <RiskBadge score={mr.riskScore} />
                    </td>
                    <td className="py-3.5 px-5">
                      <StatusBadge status={mr.status} />
                    </td>
                    <td className="py-3.5 px-5 text-xs text-gray-400 dark:text-gray-500">
                      {formatDate(mr.updatedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
