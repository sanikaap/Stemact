import { useState } from "react";
import { Save, Plus, X, Info } from "lucide-react";
import toast from "react-hot-toast";
import { defaultSettings, type Settings } from "../data/mockData";

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex-1 min-w-0 mr-4">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {label}
        </p>
        {description && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {description}
          </p>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shrink-0 ${
          checked ? "bg-brand-600" : "bg-gray-200 dark:bg-gray-700"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({ ...defaultSettings });
  const [newPath, setNewPath] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved successfully!", {
        style: {
          background: "#18181b",
          color: "#f1f5f9",
          border: "1px solid #27272a",
          borderRadius: "10px",
          fontSize: "13px",
        },
        iconTheme: { primary: "#6175f7", secondary: "#fff" },
      });
    }, 600);
  };

  const addPath = () => {
    const p = newPath.trim();
    if (p && !settings.highRiskPaths.includes(p)) {
      setSettings((s) => ({ ...s, highRiskPaths: [...s.highRiskPaths, p] }));
    }
    setNewPath("");
  };

  const removePath = (path: string) => {
    setSettings((s) => ({
      ...s,
      highRiskPaths: s.highRiskPaths.filter((p) => p !== path),
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          Settings
        </h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Configure Stemact agent behavior and risk thresholds
        </p>
      </div>

      {/* Risk Threshold */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            Risk Threshold
          </h2>
          <Info className="w-3.5 h-3.5 text-gray-400" />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
          MRs with a risk score at or above this value will trigger agent
          actions.
        </p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Threshold
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-lg font-bold tabular-nums ${
                  settings.riskThreshold >= 85
                    ? "text-red-500"
                    : settings.riskThreshold >= 65
                      ? "text-orange-500"
                      : settings.riskThreshold >= 40
                        ? "text-yellow-500"
                        : "text-green-500"
                }`}
              >
                {settings.riskThreshold}
              </span>
              <span className="text-xs text-gray-400">/100</span>
            </div>
          </div>

          <div className="relative">
            <input
              type="range"
              min={0}
              max={100}
              value={settings.riskThreshold}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  riskThreshold: Number(e.target.value),
                }))
              }
              className="w-full h-2 appearance-none bg-gray-200 dark:bg-gray-700 rounded-full outline-none cursor-pointer accent-brand-600"
              style={{
                background: `linear-gradient(to right, #6175f7 ${settings.riskThreshold}%, #e5e7eb ${settings.riskThreshold}%)`,
              }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-300 dark:text-gray-600">
                0 — Always act
              </span>
              <span className="text-xs text-gray-300 dark:text-gray-600">
                100 — Never act
              </span>
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            {[50, 65, 75, 85].map((preset) => (
              <button
                key={preset}
                onClick={() =>
                  setSettings((s) => ({ ...s, riskThreshold: preset }))
                }
                className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                  settings.riskThreshold === preset
                    ? "bg-brand-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
          Automation
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
          Control which actions the agent takes automatically.
        </p>

        <Toggle
          checked={settings.autoBlockHighRisk}
          onChange={(v) => setSettings((s) => ({ ...s, autoBlockHighRisk: v }))}
          label="Auto-block high risk merges"
          description="Automatically apply a merge block to MRs exceeding the risk threshold."
        />
        <Toggle
          checked={settings.autoCreateFixBranches}
          onChange={(v) =>
            setSettings((s) => ({ ...s, autoCreateFixBranches: v }))
          }
          label="Auto-create fix branches"
          description="Create a fix branch when a new vulnerability is detected in a dependency."
        />
        <Toggle
          checked={settings.requireSecurityScanPass}
          onChange={(v) =>
            setSettings((s) => ({ ...s, requireSecurityScanPass: v }))
          }
          label="Require security scan pass"
          description="Block merges until all security pipeline jobs have passed."
        />
      </div>

      {/* High risk paths */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
          High Risk Paths
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
          MRs that touch files in these paths receive an elevated risk score.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {settings.highRiskPaths.map((path) => (
            <div
              key={path}
              className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg border border-orange-200 dark:border-orange-800"
            >
              {path}
              <button
                onClick={() => removePath(path)}
                className="text-orange-400 hover:text-orange-600 dark:hover:text-orange-200 ml-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. secrets/, database/"
            value={newPath}
            onChange={(e) => setNewPath(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addPath();
            }}
            className="input text-xs flex-1"
          />
          <button
            onClick={addPath}
            disabled={!newPath.trim()}
            className="btn-secondary text-xs py-2 px-3 gap-1 disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Settings
        </button>
        <button
          onClick={() => setSettings({ ...defaultSettings })}
          className="btn-ghost text-xs"
        >
          Reset to defaults
        </button>
      </div>
    </div>
  );
}
