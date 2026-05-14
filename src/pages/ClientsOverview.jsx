import { Box, Grid, Stack } from "@mui/material";
import AppointmentStatsCard from "../components/clientsOverview/AppointmentStatsCard";
import MedicationStatsCard from "../components/clientsOverview/MedicationStatsCard";
import ChecklistSummaryCard from "../components/clientsOverview/ChecklistSummaryCard";
import DiarySummaryCard from "../components/clientsOverview/DiarySummaryCard";
import OpenDiaryCasesCard from "../components/clientsOverview/OpenDiaryCasesCard";

export default function ClientsOverview() {
  return (
    <Box sx={{ py: 3 }}>
      <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
        {/* ROW 1: Appointment + Medication (Left) == Diary Summary (Right) */}
        <Grid size={{ xs: 12, md: 8 }} sx={{ display: "flex" }}>
          <Stack spacing={3} sx={{ width: "100%" }}>
            <AppointmentStatsCard />
            <MedicationStatsCard />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
          <DiarySummaryCard sx={{ height: "auto", flexGrow: 1, display: 'flex', flexDirection: 'column' }} />
        </Grid>

        {/* ROW 2: Checklist Summary (Left) == Open Diary Cases (Right) */}
        <Grid size={{ xs: 12, md: 8 }} sx={{ display: "flex" }}>
          <ChecklistSummaryCard sx={{ height: "auto", flexGrow: 1, display: 'flex', flexDirection: 'column' }} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
          <OpenDiaryCasesCard sx={{ height: "auto", flexGrow: 1, display: 'flex', flexDirection: 'column' }} />
        </Grid>
      </Grid>
    </Box>
  );
}
