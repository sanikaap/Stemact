// Mock data for Stemact SaaS Dashboard

export type RiskLevel = "low" | "medium" | "high" | "critical";
export type MRStatus = "safe" | "review" | "blocked";
export type Severity = "critical" | "high" | "medium" | "low";
export type VulnStatus = "fixed" | "pending";
export type LogActionType =
  | "risk_score_posted"
  | "mr_labeled"
  | "merge_blocked"
  | "fix_branch_created"
  | "fix_mr_created";

// ── Stats ──────────────────────────────────────────────────────────────────
export interface DashboardStats {
  totalMRsScanned: number;
  highRiskMRs: number;
  vulnerabilitiesDetected: number;
  fixMRsGenerated: number;
  mergeBlocksApplied: number;
}

export const dashboardStats: DashboardStats = {
  totalMRsScanned: 1284,
  highRiskMRs: 47,
  vulnerabilitiesDetected: 213,
  fixMRsGenerated: 38,
  mergeBlocksApplied: 22,
};

// ── Risk trend (7 days) ────────────────────────────────────────────────────
export interface RiskTrendPoint {
  date: string;
  score: number;
}

export const riskTrend: RiskTrendPoint[] = [
  { date: "Feb 12", score: 42 },
  { date: "Feb 13", score: 58 },
  { date: "Feb 14", score: 37 },
  { date: "Feb 15", score: 71 },
  { date: "Feb 16", score: 55 },
  { date: "Feb 17", score: 63 },
  { date: "Feb 18", score: 48 },
];

// ── Severity distribution ──────────────────────────────────────────────────
export interface SeverityDistribution {
  name: Severity;
  value: number;
  color: string;
}

export const severityDistribution: SeverityDistribution[] = [
  { name: "critical", value: 14, color: "#ef4444" },
  { name: "high", value: 38, color: "#f97316" },
  { name: "medium", value: 89, color: "#eab308" },
  { name: "low", value: 72, color: "#22c55e" },
];

// ── Merge Requests ─────────────────────────────────────────────────────────
export interface MergeRequest {
  id: string;
  title: string;
  author: string;
  avatarUrl: string;
  project: string;
  riskScore: number;
  riskLevel: RiskLevel;
  blastRadius: "Low" | "Medium" | "High";
  labels: string[];
  status: MRStatus;
  createdAt: string;
  updatedAt: string;
  riskReasons: string[];
  affectedFiles: string[];
  suggestedAction: string;
  gitlabUrl: string;
}

export const mergeRequests: MergeRequest[] = [
  {
    id: "MR-1041",
    title: "feat: migrate auth service to OAuth2 PKCE flow",
    author: "alex.torres",
    avatarUrl:
      "https://api.dicebear.com/7.x/initials/svg?seed=AT&backgroundColor=6175f7",
    project: "core/auth-service",
    riskScore: 94,
    riskLevel: "critical",
    blastRadius: "High",
    labels: ["security", "auth", "breaking-change"],
    status: "blocked",
    createdAt: "2026-02-17T09:14:00Z",
    updatedAt: "2026-02-18T11:02:00Z",
    riskReasons: [
      "Modifies authentication critical path",
      "Touches 3 high-risk directories (auth/, k8s/, terraform/)",
      "Removes existing session validation middleware",
      "No unit tests for new PKCE handler",
    ],
    affectedFiles: [
      "auth/handlers/oauth.go",
      "auth/middleware/session.go",
      "k8s/auth-service-deployment.yaml",
      "terraform/modules/iam/main.tf",
      "auth/config/providers.go",
    ],
    suggestedAction:
      "Block merge. Require security review and additional test coverage before proceeding.",
    gitlabUrl:
      "https://gitlab.example.com/core/auth-service/-/merge_requests/1041",
  },
  {
    id: "MR-998",
    title: "fix: patch SQL injection in payments query builder",
    author: "priya.sharma",
    avatarUrl:
      "https://api.dicebear.com/7.x/initials/svg?seed=PS&backgroundColor=ec4899",
    project: "core/payments",
    riskScore: 87,
    riskLevel: "high",
    blastRadius: "High",
    labels: ["security", "hotfix", "payments"],
    status: "review",
    createdAt: "2026-02-16T15:30:00Z",
    updatedAt: "2026-02-18T08:45:00Z",
    riskReasons: [
      "Directly modifies payment processing SQL layer",
      "Touches payments/ high-risk path",
      "Changes query sanitization logic",
    ],
    affectedFiles: [
      "payments/db/query_builder.py",
      "payments/models/transaction.py",
      "payments/tests/test_queries.py",
    ],
    suggestedAction:
      "Require senior engineer review. Auto-fix MR has been generated for CVE-2025-4421.",
    gitlabUrl: "https://gitlab.example.com/core/payments/-/merge_requests/998",
  },
  {
    id: "MR-1055",
    title: "chore: update Terraform AWS provider to v5.40",
    author: "james.okonkwo",
    avatarUrl:
      "https://api.dicebear.com/7.x/initials/svg?seed=JO&backgroundColor=10b981",
    project: "infra/terraform",
    riskScore: 72,
    riskLevel: "high",
    blastRadius: "Medium",
    labels: ["infrastructure", "terraform"],
    status: "review",
    createdAt: "2026-02-15T11:00:00Z",
    updatedAt: "2026-02-17T16:20:00Z",
    riskReasons: [
      "Modifies terraform/ infrastructure definitions",
      "Provider upgrade may have breaking changes",
      "Affects 4 AWS modules",
    ],
    affectedFiles: [
      "terraform/providers.tf",
      "terraform/modules/vpc/main.tf",
      "terraform/modules/iam/main.tf",
      "terraform/modules/eks/main.tf",
    ],
    suggestedAction:
      "Review changelog for breaking changes. Run terraform plan in staging before merge.",
    gitlabUrl:
      "https://gitlab.example.com/infra/terraform/-/merge_requests/1055",
  },
  {
    id: "MR-1021",
    title: "feat: add rate limiting to API gateway middleware",
    author: "sarah.chen",
    avatarUrl:
      "https://api.dicebear.com/7.x/initials/svg?seed=SC&backgroundColor=f59e0b",
    project: "core/api-gateway",
    riskScore: 61,
    riskLevel: "medium",
    blastRadius: "Medium",
    labels: ["performance", "security"],
    status: "review",
    createdAt: "2026-02-14T09:22:00Z",
    updatedAt: "2026-02-16T14:10:00Z",
    riskReasons: [
      "Modifies request pipeline affecting all services",
      "New Redis dependency introduced",
    ],
    affectedFiles: [
      "api-gateway/middleware/rate_limit.go",
      "api-gateway/config/redis.go",
      "k8s/api-gateway-config.yaml",
    ],
    suggestedAction:
      "Load test in staging environment. Monitor Redis connection pool behavior.",
    gitlabUrl:
      "https://gitlab.example.com/core/api-gateway/-/merge_requests/1021",
  },
  {
    id: "MR-1067",
    title: "refactor: extract shared UI components to design-system package",
    author: "lena.kovacs",
    avatarUrl:
      "https://api.dicebear.com/7.x/initials/svg?seed=LK&backgroundColor=8b5cf6",
    project: "frontend/web-app",
    riskScore: 23,
    riskLevel: "low",
    blastRadius: "Low",
    labels: ["refactor", "frontend"],
    status: "safe",
    createdAt: "2026-02-13T13:45:00Z",
    updatedAt: "2026-02-14T09:30:00Z",
    riskReasons: ["Minor frontend refactoring with no security implications"],
    affectedFiles: [
      "frontend/src/components/Button.tsx",
      "frontend/src/components/Input.tsx",
      "packages/design-system/index.ts",
    ],
    suggestedAction: "Safe to merge. No security concerns detected.",
    gitlabUrl:
      "https://gitlab.example.com/frontend/web-app/-/merge_requests/1067",
  },
  {
    id: "MR-1072",
    title: "feat: implement Kubernetes pod autoscaling policies",
    author: "marcus.bell",
    avatarUrl:
      "https://api.dicebear.com/7.x/initials/svg?seed=MB&backgroundColor=06b6d4",
    project: "infra/k8s",
    riskScore: 78,
    riskLevel: "high",
    blastRadius: "High",
    labels: ["infrastructure", "k8s", "scaling"],
    status: "blocked",
    createdAt: "2026-02-18T07:00:00Z",
    updatedAt: "2026-02-18T10:15:00Z",
    riskReasons: [
      "Touches k8s/ high-risk path",
      "Modifies production scaling policies",
      "Could cause resource contention",
    ],
    affectedFiles: [
      "k8s/hpa/payments-hpa.yaml",
      "k8s/hpa/auth-hpa.yaml",
      "k8s/resources/limits.yaml",
    ],
    suggestedAction:
      "Block merge pending infrastructure team sign-off. Test in staging cluster first.",
    gitlabUrl: "https://gitlab.example.com/infra/k8s/-/merge_requests/1072",
  },
  {
    id: "MR-1080",
    title: "docs: update API documentation for v2 endpoints",
    author: "nina.petrov",
    avatarUrl:
      "https://api.dicebear.com/7.x/initials/svg?seed=NP&backgroundColor=14b8a6",
    project: "core/api-gateway",
    riskScore: 5,
    riskLevel: "low",
    blastRadius: "Low",
    labels: ["documentation"],
    status: "safe",
    createdAt: "2026-02-18T08:00:00Z",
    updatedAt: "2026-02-18T08:30:00Z",
    riskReasons: ["Documentation only change"],
    affectedFiles: ["docs/api/v2/README.md", "docs/api/v2/endpoints.yaml"],
    suggestedAction: "Safe to merge immediately.",
    gitlabUrl:
      "https://gitlab.example.com/core/api-gateway/-/merge_requests/1080",
  },
  {
    id: "MR-1033",
    title: "fix: resolve memory leak in notification worker",
    author: "tomasz.wiśniewski",
    avatarUrl:
      "https://api.dicebear.com/7.x/initials/svg?seed=TW&backgroundColor=f43f5e",
    project: "services/notifications",
    riskScore: 35,
    riskLevel: "low",
    blastRadius: "Low",
    labels: ["bug", "performance"],
    status: "safe",
    createdAt: "2026-02-12T10:00:00Z",
    updatedAt: "2026-02-13T15:40:00Z",
    riskReasons: ["Low-risk service, fix is well-tested"],
    affectedFiles: [
      "services/notifications/worker.js",
      "services/notifications/queue.js",
    ],
    suggestedAction: "Safe to merge. Memory fix is isolated.",
    gitlabUrl:
      "https://gitlab.example.com/services/notifications/-/merge_requests/1033",
  },
];

// ── Vulnerabilities ────────────────────────────────────────────────────────
export interface Vulnerability {
  id: string;
  cveId: string;
  packageName: string;
  installedVersion: string;
  fixedVersion: string;
  severity: Severity;
  status: VulnStatus;
  description: string;
  relatedMRId?: string;
  project: string;
  detectedAt: string;
}

export const vulnerabilities: Vulnerability[] = [
  {
    id: "v-001",
    cveId: "CVE-2025-4421",
    packageName: "psycopg2",
    installedVersion: "2.9.3",
    fixedVersion: "2.9.9",
    severity: "critical",
    status: "pending",
    description:
      "SQL injection vulnerability via unsanitized cursor.execute() parameters.",
    relatedMRId: "MR-998",
    project: "core/payments",
    detectedAt: "2026-02-16T10:00:00Z",
  },
  {
    id: "v-002",
    cveId: "CVE-2025-3819",
    packageName: "golang.org/x/crypto",
    installedVersion: "v0.17.0",
    fixedVersion: "v0.21.0",
    severity: "high",
    status: "pending",
    description: "Timing attack in SSH handshake implementation.",
    relatedMRId: "MR-1041",
    project: "core/auth-service",
    detectedAt: "2026-02-17T14:20:00Z",
  },
  {
    id: "v-003",
    cveId: "CVE-2024-9910",
    packageName: "lodash",
    installedVersion: "4.17.20",
    fixedVersion: "4.17.21",
    severity: "medium",
    status: "fixed",
    description: "Prototype pollution in lodash merge function.",
    project: "frontend/web-app",
    detectedAt: "2026-02-10T08:00:00Z",
  },
  {
    id: "v-004",
    cveId: "CVE-2025-1102",
    packageName: "express",
    installedVersion: "4.18.1",
    fixedVersion: "4.19.2",
    severity: "high",
    status: "pending",
    description: "Path traversal vulnerability in static file serving.",
    project: "core/api-gateway",
    detectedAt: "2026-02-14T11:30:00Z",
  },
  {
    id: "v-005",
    cveId: "CVE-2024-8234",
    packageName: "aws-sdk",
    installedVersion: "2.1450.0",
    fixedVersion: "2.1500.0",
    severity: "medium",
    status: "fixed",
    description: "Credential exposure via debug logging in S3 client.",
    project: "infra/terraform",
    detectedAt: "2026-02-08T09:15:00Z",
  },
  {
    id: "v-006",
    cveId: "CVE-2025-6677",
    packageName: "pyjwt",
    installedVersion: "2.6.0",
    fixedVersion: "2.8.0",
    severity: "critical",
    status: "pending",
    description: "Algorithm confusion attack allowing token forgery.",
    relatedMRId: "MR-1041",
    project: "core/auth-service",
    detectedAt: "2026-02-18T06:00:00Z",
  },
  {
    id: "v-007",
    cveId: "CVE-2024-7712",
    packageName: "pillow",
    installedVersion: "9.5.0",
    fixedVersion: "10.0.1",
    severity: "low",
    status: "fixed",
    description: "Buffer overflow in TIFF image parsing.",
    project: "services/media",
    detectedAt: "2026-02-05T13:00:00Z",
  },
  {
    id: "v-008",
    cveId: "CVE-2025-2201",
    packageName: "redis",
    installedVersion: "4.5.4",
    fixedVersion: "4.6.0",
    severity: "medium",
    status: "pending",
    description: "Unauthenticated command injection via RESP3 protocol.",
    project: "core/api-gateway",
    detectedAt: "2026-02-15T17:00:00Z",
  },
];

// ── Auto Fix MRs ───────────────────────────────────────────────────────────
export interface FixMR {
  id: string;
  title: string;
  targetVuln: string;
  project: string;
  status: "open" | "merged" | "closed";
  createdAt: string;
  gitlabUrl: string;
}

export const fixMRs: FixMR[] = [
  {
    id: "FIX-MR-201",
    title: "fix(auto): bump psycopg2 2.9.3 → 2.9.9 [CVE-2025-4421]",
    targetVuln: "CVE-2025-4421",
    project: "core/payments",
    status: "open",
    createdAt: "2026-02-16T10:30:00Z",
    gitlabUrl: "https://gitlab.example.com/core/payments/-/merge_requests/201",
  },
  {
    id: "FIX-MR-202",
    title:
      "fix(auto): bump golang.org/x/crypto v0.17.0 → v0.21.0 [CVE-2025-3819]",
    targetVuln: "CVE-2025-3819",
    project: "core/auth-service",
    status: "open",
    createdAt: "2026-02-17T14:45:00Z",
    gitlabUrl:
      "https://gitlab.example.com/core/auth-service/-/merge_requests/202",
  },
  {
    id: "FIX-MR-198",
    title: "fix(auto): bump lodash 4.17.20 → 4.17.21 [CVE-2024-9910]",
    targetVuln: "CVE-2024-9910",
    project: "frontend/web-app",
    status: "merged",
    createdAt: "2026-02-10T09:00:00Z",
    gitlabUrl:
      "https://gitlab.example.com/frontend/web-app/-/merge_requests/198",
  },
  {
    id: "FIX-MR-203",
    title: "fix(auto): bump pyjwt 2.6.0 → 2.8.0 [CVE-2025-6677]",
    targetVuln: "CVE-2025-6677",
    project: "core/auth-service",
    status: "open",
    createdAt: "2026-02-18T06:30:00Z",
    gitlabUrl:
      "https://gitlab.example.com/core/auth-service/-/merge_requests/203",
  },
  {
    id: "FIX-MR-195",
    title: "fix(auto): bump aws-sdk 2.1450.0 → 2.1500.0 [CVE-2024-8234]",
    targetVuln: "CVE-2024-8234",
    project: "infra/terraform",
    status: "merged",
    createdAt: "2026-02-08T10:00:00Z",
    gitlabUrl:
      "https://gitlab.example.com/infra/terraform/-/merge_requests/195",
  },
];

// ── Agent Activity Logs ────────────────────────────────────────────────────
export interface AgentLog {
  id: string;
  timestamp: string;
  project: string;
  mrId: string;
  actionType: LogActionType;
  result: "success" | "warning" | "error";
  message: string;
  details?: string;
}

export const agentLogs: AgentLog[] = [
  {
    id: "log-001",
    timestamp: "2026-02-18T11:02:14Z",
    project: "core/auth-service",
    mrId: "MR-1041",
    actionType: "merge_blocked",
    result: "success",
    message: "Merge blocked due to critical risk score (94)",
    details: "Risk threshold: 80. Score: 94. Blocking label applied.",
  },
  {
    id: "log-002",
    timestamp: "2026-02-18T10:58:01Z",
    project: "core/auth-service",
    mrId: "MR-1041",
    actionType: "risk_score_posted",
    result: "success",
    message: "Risk score 94/100 posted to MR comment",
    details: "Analysis completed in 2.3s. Found 4 risk factors.",
  },
  {
    id: "log-003",
    timestamp: "2026-02-18T10:55:30Z",
    project: "core/auth-service",
    mrId: "MR-1041",
    actionType: "mr_labeled",
    result: "success",
    message: "Label 'stemact::blocked' applied",
  },
  {
    id: "log-004",
    timestamp: "2026-02-18T06:30:00Z",
    project: "core/auth-service",
    mrId: "MR-1041",
    actionType: "fix_mr_created",
    result: "success",
    message: "Auto-fix MR created for CVE-2025-6677",
    details: "FIX-MR-203 opened targeting main branch.",
  },
  {
    id: "log-005",
    timestamp: "2026-02-18T06:28:10Z",
    project: "core/auth-service",
    mrId: "MR-1041",
    actionType: "fix_branch_created",
    result: "success",
    message: "Fix branch 'stemact/fix/cve-2025-6677' created",
  },
  {
    id: "log-006",
    timestamp: "2026-02-18T07:10:00Z",
    project: "infra/k8s",
    mrId: "MR-1072",
    actionType: "merge_blocked",
    result: "success",
    message: "Merge blocked due to high risk score (78)",
  },
  {
    id: "log-007",
    timestamp: "2026-02-18T07:08:44Z",
    project: "infra/k8s",
    mrId: "MR-1072",
    actionType: "risk_score_posted",
    result: "success",
    message: "Risk score 78/100 posted to MR comment",
  },
  {
    id: "log-008",
    timestamp: "2026-02-17T14:45:00Z",
    project: "core/auth-service",
    mrId: "MR-N/A",
    actionType: "fix_mr_created",
    result: "success",
    message: "Auto-fix MR created for CVE-2025-3819",
    details: "FIX-MR-202 opened targeting main branch.",
  },
  {
    id: "log-009",
    timestamp: "2026-02-17T14:22:00Z",
    project: "core/auth-service",
    mrId: "MR-N/A",
    actionType: "fix_branch_created",
    result: "success",
    message: "Fix branch 'stemact/fix/cve-2025-3819' created",
  },
  {
    id: "log-010",
    timestamp: "2026-02-17T09:16:00Z",
    project: "core/auth-service",
    mrId: "MR-1041",
    actionType: "risk_score_posted",
    result: "warning",
    message: "Initial scan completed — webhook delay of 3.1s detected",
    details: "Pipeline webhook latency exceeded threshold.",
  },
  {
    id: "log-011",
    timestamp: "2026-02-16T15:45:00Z",
    project: "core/payments",
    mrId: "MR-998",
    actionType: "mr_labeled",
    result: "success",
    message: "Label 'stemact::review-required' applied",
  },
  {
    id: "log-012",
    timestamp: "2026-02-16T10:30:00Z",
    project: "core/payments",
    mrId: "MR-998",
    actionType: "fix_mr_created",
    result: "success",
    message: "Auto-fix MR created for CVE-2025-4421",
    details: "FIX-MR-201 opened targeting main branch.",
  },
  {
    id: "log-013",
    timestamp: "2026-02-15T11:05:00Z",
    project: "infra/terraform",
    mrId: "MR-1055",
    actionType: "risk_score_posted",
    result: "success",
    message: "Risk score 72/100 posted to MR comment",
  },
  {
    id: "log-014",
    timestamp: "2026-02-14T09:25:00Z",
    project: "core/api-gateway",
    mrId: "MR-1021",
    actionType: "risk_score_posted",
    result: "success",
    message: "Risk score 61/100 posted to MR comment",
  },
  {
    id: "log-015",
    timestamp: "2026-02-10T09:00:00Z",
    project: "frontend/web-app",
    mrId: "MR-N/A",
    actionType: "fix_mr_created",
    result: "success",
    message: "Auto-fix MR created for CVE-2024-9910",
    details: "FIX-MR-198 merged successfully.",
  },
];

// ── Settings defaults ──────────────────────────────────────────────────────
export interface Settings {
  riskThreshold: number;
  autoBlockHighRisk: boolean;
  autoCreateFixBranches: boolean;
  requireSecurityScanPass: boolean;
  highRiskPaths: string[];
}

export const defaultSettings: Settings = {
  riskThreshold: 75,
  autoBlockHighRisk: true,
  autoCreateFixBranches: true,
  requireSecurityScanPass: false,
  highRiskPaths: ["auth/", "payments/", "terraform/", "k8s/"],
};
