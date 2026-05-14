import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { GradCard, BigStat } from "../staffOverview/StaffCommon";

const stats = [
  {
    label: "This Week",
    value: { hours: "98h", minutes: "45m" },
    sub: { appointments: "41 Appointments", carers: "5 Active clients" },
  },
  {
    label: "Last Week",
    value: { hours: "167h" },
    sub: { appointments: "43 Appointments", carers: "8 Active clients" },
  },
  {
    label: "Last Month",
    value: { hours: "429h" },
    sub: { appointments: "130 Appointments", carers: "15 Active clients" },
  },
];

export default function AppointmentStatsCard() {
  return (
    <GradCard
      gradient="linear-gradient(135deg, #35ABAB 0% ,#57CFCE 100%)"
      sx={{ width: "100%", pb: 4 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Typography fontWeight={600} fontSize="20px">
          Appointment Stats
        </Typography>
        <Chip
          label="CLIENT ACTIVITY"
          size="small"
          sx={{
            bgcolor: "rgba(255,255,255,0.25)",
            color: "#fff",
            fontSize: "12px",
            fontWeight: 700,
            height: 20,
            letterSpacing: 0.5,
          }}
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        {stats.map((stat, idx) => (
          <Box
            key={idx}
            sx={{
              flex: 1,
              pl: idx !== 0 ? 4 : 0,
              borderLeft: idx !== 0 ? "1px solid rgba(255,255,255,0.25)" : "none",
              ml: idx !== 0 ? 4 : 0,
            }}
          >
            <BigStat
              label={stat.label}
              value={stat.value}
              sub={stat.sub}
            />
          </Box>
        ))}
      </Box>
    </GradCard>
  );
}
