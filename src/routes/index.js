import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import AuthPage from "../pages/AuthPage";
import Dashboard from "../pages/Dashboard";
// future pages import here e.g:
import StaffOverview from "../pages/StaffOverview";
import StaffLayout from "../layouts/StaffLayout";
import { AllStaff } from "../pages/AllStaff";
import { WorkforceAvailability } from "../pages/WorkforceAvailabillity.jsx";
import { TimesheetReview } from "../pages/TimesheetReview.jsx";
import { ComplianceLegalAudit } from "../pages/CompliancelegalAudit.jsx";
import { CapabilitySkillsMatrix } from "../pages/TrainingSkills.jsx";
// import Clients    from "../pages/Clients";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      {/* Auth — no navbar */}
      <Route element={<AuthLayout />}>
        <Route path="/auth/*" element={<AuthPage />} />
      </Route>

      {/* Dashboard — shared Navbar via DashboardLayout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/staff" element={<StaffLayout />}>
          <Route index element={<StaffOverview />} />
          <Route path="all-staff" element={<AllStaff />} />
          <Route path="availability" element={<WorkforceAvailability />} />
          <Route path="timesheets" element={<TimesheetReview />} />
          <Route path="compliance" element={<ComplianceLegalAudit />} />
          <Route path="training" element={<CapabilitySkillsMatrix />} />
        </Route>
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}
