import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Shield, ArrowRight } from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("admin@stemact.io");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-gray-950">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-gray-900 p-12 flex-col justify-between">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(97,117,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(97,117,247,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
                <path d="M8 22L16 10L24 22H8Z" fill="white" fillOpacity="0.9" />
                <circle cx="16" cy="18" r="3" fill="#c7d7fe" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl">Stemact</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            AI-powered release safety
            <br />
            for GitLab teams.
          </h2>
          <p className="text-brand-200 text-base leading-relaxed">
            Automatically score merge requests, detect vulnerabilities, and
            block risky deployments before they reach production.
          </p>
        </div>
        <div className="relative z-10 space-y-4">
          {[
            { icon: "🛡️", text: "Risk scoring on every MR" },
            { icon: "🤖", text: "Auto-generated fix branches" },
            { icon: "🔒", text: "Intelligent merge blocking" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <span className="text-lg">{icon}</span>
              <span className="text-brand-100 text-sm">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">Stemact</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Sign in</h1>
            <p className="text-gray-400 text-sm">
              Access your release safety dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-gray-800 border border-gray-700 focus:border-brand-500 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-all"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-10 bg-gray-800 border border-gray-700 focus:border-brand-500 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPw ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 accent-brand-500"
                  defaultChecked
                />
                <span className="text-xs text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-70 text-white font-medium rounded-lg text-sm transition-all duration-150 active:scale-[0.98] mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            No account?{" "}
            <button className="text-brand-400 hover:text-brand-300 transition-colors">
              Request access
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
