import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import QuickOperations from "../components/dashboard/QuickOperations";
import AddAdminReminder from "../components/dashboard/AddAdminReminder";
import {
  UnassignedAppointments,
  CarerConflicts,
} from "../components/dashboard/AppointmentsConflicts";
import TodaysDiary from "../components/dashboard/TodaysDiary";
import BusinessSnapshot from "../components/dashboard/BusinessSnapshot";
import {
  IncomingMessages,
  ComplianceStatus,
  UpcomingDeadlines,
} from "../components/dashboard/DashboardWidgets";

// ─── System Live badge ────────────────────────────────────────────────────────
function SystemLive() {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "background.paper",
        border: "1px solid #E2E8F0",
        borderRadius: "12px",
        px: 1.65,
        py: 1.68,
        gap: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#8AC642",
          }}
        />
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 500,
            color: "text.primary",
            whiteSpace: "nowrap",
          }}
        >
          SYSTEM LIVE
        </Typography>
      </Box>

      <Box sx={{ height: 16, borderLeft: "1px solid #E2E8F0" }} />

      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        {time}
      </Typography>
    </Box>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  return (
    <Box sx={{ py: 3 }}>
      {/* Page header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={700} color="text.primary">
            Care Management Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back, Alex Marshall. Overview for 3 February.
          </Typography>
        </Box>
        <SystemLive />
      </Box>

      {/* Dashboard Grid Layout */}
      <Grid container spacing={3}>
        {/* Row 1 — Quick Operations + Add Reminder (approx 1.6:1 ratio) */}
        <Grid size={{ xs: 12, md: 8 }}>
          <QuickOperations />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <AddAdminReminder />
        </Grid>

        {/* Row 2 — Unassigned Appointments + Carer Conflicts (1:1 ratio) */}
        <Grid size={{ xs: 12, md: 6 }}>
          <UnassignedAppointments />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CarerConflicts />
        </Grid>

       <Grid size={{ xs: 12, lg: 8 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
 
              <TodaysDiary />
 
              <Grid container spacing={3} sx={{ flex: 1 }}>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
                  <IncomingMessages sx={{ flex: 1 }} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex" }}>
                  <ComplianceStatus sx={{ flex: 1 }} />
                </Grid>
              </Grid>
 
            </Box>
          </Grid>
 
          {/* Right column */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, height: "100%" }}>
              <BusinessSnapshot />
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <UpcomingDeadlines sx={{ flex: 1, height: "100%" }} />
              </Box>
            </Box>
          </Grid>
      </Grid>
    </Box>
  );
}
