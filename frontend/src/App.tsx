import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import { AuthLayout } from "./layouts/AuthLayout";
import { AppLayout } from "./layouts/AppLayout";

import { LandingPage } from "./pages/LandingPage";
import { PortalSelectPage } from "./pages/PortalSelectPage";
import { InvestigatorLoginPage } from "./pages/InvestigatorLoginPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AnalystLoginPage } from "./pages/AnalystLoginPage";

import { DashboardPage } from "./pages/DashboardPage";
import { InvestigatePage } from "./pages/InvestigatePage";
import { GraphPage } from "./pages/GraphPage";
import { CasesPage } from "./pages/CasesPage";
import { CaseDetailPage } from "./pages/CaseDetailPage";
import { NewCasePage } from "./pages/NewCasePage";
import { VaspsPage } from "./pages/VaspsPage";
import { ClustersPage } from "./pages/ClustersPage";
import { AlertsPage } from "./pages/AlertsPage";
import { CrossChainPage } from "./pages/CrossChainPage";
import { IntelligencePage } from "./pages/IntelligencePage";
import { ReportsPage } from "./pages/ReportsPage";
import { SearchPage } from "./pages/SearchPage";
import { AdminPage } from "./pages/AdminPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Dedicated Role-Specific Login Portals */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <PortalSelectPage />
            </AuthLayout>
          }
        />
        <Route
          path="/login/investigator"
          element={
            <AuthLayout>
              <InvestigatorLoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/login/admin"
          element={
            <AuthLayout>
              <AdminLoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/login/analyst"
          element={
            <AuthLayout>
              <AnalystLoginPage />
            </AuthLayout>
          }
        />

        {/* Protected Application Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/investigate" element={<InvestigatePage />} />
          <Route path="/graph" element={<GraphPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/new" element={<NewCasePage />} />
          <Route path="/cases/:id" element={<CaseDetailPage />} />
          <Route path="/vasps" element={<VaspsPage />} />
          <Route path="/clusters" element={<ClustersPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/cross-chain" element={<CrossChainPage />} />
          <Route path="/intelligence" element={<IntelligencePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
