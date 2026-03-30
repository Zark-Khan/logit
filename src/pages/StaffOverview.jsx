import {
  Box,
  Grid,
  Stack,
} from "@mui/material";

// Components
import AppointmentStatsCard from "../components/staffOverview/AppointmentStatsCard";
import TrainingSummaryCard from "../components/staffOverview/TrainingSummaryCard";
import CallCareCard from "../components/staffOverview/CallCareCard";
import DiarySummaryCard from "../components/staffOverview/DiarySummaryCard";
import ChecklistSummaryCard from "../components/staffOverview/ChecklistSummaryCard";
import OpenDiaryCasesCard from "../components/staffOverview/OpenDiaryCasesCard";


export default function StaffOverview() {

  return (
    <Box sx={{ py: 3 }}>

      {/* Grid */}
      <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
        {/* Row 1 — Left two stacked, CallCare stretches to match */}
        <Grid size={{ xs: 12, md: 8 }} sx={{ display: "flex" }}>
          <Stack spacing={3} sx={{ width: "100%" }}>
            <AppointmentStatsCard />
            <TrainingSummaryCard />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
          <CallCareCard sx={{ height: "100%", width: "100%" }} />
        </Grid>

        {/* Row 2 — DiarySummary (8) & Checklist (4) same height */}
        <Grid size={{ xs: 12, md: 8 }} sx={{ display: "flex" }}>
          <DiarySummaryCard sx={{ height: "100%", width: "100%" }} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
          <ChecklistSummaryCard sx={{ height: "100%", width: "100%" }} />
        </Grid>

        {/* Full width */}
        <Grid size={{ xs: 12 }}>
          <OpenDiaryCasesCard />
        </Grid>
      </Grid>
    </Box>
  );
}
