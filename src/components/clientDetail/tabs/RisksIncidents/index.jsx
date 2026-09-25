import React from "react";
import { Box, Typography, Grid, Paper, Chip, Button } from "@mui/material";
import { TriangleAlertIcon, RouteIcon } from "../../../staffOverview/LineIcons";

const RISKS = [
  {
    title: "Fall Risk Assessment",
    description:
      "Score: 12 (Moderate). Previous minor fall in hallway recorded April 14th.",
    action: "Full assessment",
    icon: <TriangleAlertIcon size={18} />,
    iconColor: "#EA580C",
    iconBg: "#FFEDD5",
    border: "1px solid #FDE7C7",
  },
  {
    title: "Medication Risk",
    description:
      "Complex medication regime. Requires supervision at every dose.",
    action: "Review protocol",
    icon: <RouteIcon size={18} />,
    iconColor: "#0EA5E9",
    iconBg: "#E0F2FE",
    border: "1px solid #F1F5F9",
  },
];

const INCIDENTS = [
  {
    title: "Minor Skin Tear (Left Arm)",
    date: "14 May 2024",
    reporter: "Sarah T.",
    status: "CLOSED",
  },
];

function RiskCard({ risk }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        bgcolor: "#fff",
        height: "100%",
        border: risk.border,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.75, mb: 1.75 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            flexShrink: 0,
            borderRadius: "50%",
            bgcolor: risk.iconBg,
            color: risk.iconColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {risk.icon}
        </Box>
        <Typography fontWeight={700} fontSize="16px" color="text.primary">
          {risk.title}
        </Typography>
      </Box>
      <Typography fontSize="13px" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.6 }}>
        {risk.description}
      </Typography>
      <Button
        disableRipple
        sx={{
          p: 0,
          minWidth: 0,
          fontWeight: 700,
          fontSize: "11px",
          color: "#0EA5E9",
          letterSpacing: 0.2,
          "&:hover": { bgcolor: "transparent", color: "#0284C7" },
        }}
      >
        {risk.action}
      </Button>
    </Paper>
  );
}

export default function RisksIncidentsTab({ client }) {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography fontWeight={700} fontSize="20px" color="text.primary">
          Risks & Incidents
        </Typography>
        <Typography fontSize="14px" color="text.light" sx={{ mt: 0.5 }}>
          Manage information and care delivery for{" "}
          {client?.name || "Margaret Hall"}.
        </Typography>
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {RISKS.map((risk) => (
          <Grid key={risk.title} size={{ xs: 12, md: 6 }}>
            <RiskCard risk={risk} />
          </Grid>
        ))}
      </Grid>

      <Typography
        fontWeight={700}
        fontSize="15px"
        color="text.primary"
        sx={{ mb: 2 }}
      >
        Recent Incident History
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {INCIDENTS.map((incident) => (
          <Paper
            key={incident.title}
            elevation={0}
            sx={{
              px: 2.5,
              py: 2,
              borderRadius: "12px",
              bgcolor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              border: "1px solid #F1F5F9",
            }}
          >
            <Box>
              <Typography fontWeight={700} fontSize="14px" color="text.primary">
                {incident.title}
              </Typography>
              <Typography fontSize="11px" color="text.secondary" sx={{ mt: 0.25 }}>
                {incident.date} • Reported by {incident.reporter}
              </Typography>
            </Box>
            <Chip
              label={incident.status}
              size="small"
              sx={{
                bgcolor: "#FEE2E2",
                color: "#EF4444",
                fontWeight: 700,
                fontSize: "9px",
                borderRadius: "4px",
                height: 20,
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
