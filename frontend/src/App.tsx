import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext";
import { AppLayout } from "./components/layout/AppLayout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MergeRequestsPage } from "./pages/MergeRequestsPage";
import { VulnerabilitiesPage } from "./pages/VulnerabilitiesPage";
import { AgentLogsPage } from "./pages/AgentLogsPage";
import { SettingsPage } from "./pages/SettingsPage";

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="merge-requests" element={<MergeRequestsPage />} />
            <Route path="vulnerabilities" element={<VulnerabilitiesPage />} />
            <Route path="logs" element={<AgentLogsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </DarkModeProvider>
  );
}

export default App;
