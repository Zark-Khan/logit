import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { GradCard, BigStat } from "./StaffCommon";

const stats = [
  {
    label: "This Week",
    value: { hours: "165h", minutes: "30m" },
    sub: { appointments: "54 Appointments", carers: "7 Carers working" },
  },
  {
    label: "Last Week",
    value: { hours: "110h" },
    sub: { appointments: "80 Appointments", carers: "8 Carers working" },
  },
  {
    label: "Last Month",
    value: { hours: "429h" },
    sub: { appointments: "173 Appointments", carers: "7 Carers working" },
  },
];

export default function AppointmentStatsCard() {
  return (
    <GradCard
      gradient="linear-gradient(135deg, #33DCE7 0%, #56A6FF 100%)"
      sx={{ width: "100%" }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Typography fontWeight={600} fontSize="20px">
          Appointment Stats
        </Typography>
        <Chip
          label="LIVE DATA"
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

      {/* Stats row */}
      <Box sx={{ display: "flex", gap: 15 }}>
        {stats.map((stat, idx) => (
          <BigStat
            key={idx}
            label={stat.label}
            value={stat.value}
            sub={stat.sub}
          />
        ))}
      </Box>
    </GradCard>
  );
}
