import React from "react";
import { Box } from "@mui/material";

export default function StatusBadge({ status, label }) {
  const configs = {
    COMPLETED: { bg: "#ECFDF5", color: "#059669" },
    ONGOING: { bg: "#EFF6FF", color: "#2563EB" },
    MISSED: { bg: "#FFF1F2", color: "#E11D48" },
    LATE: { bg: "#FFFBEB", color: "#D97706" },
    UPCOMING: { bg: "#F1F5F9", color: "#475569" },
    GIVEN: { bg: "#ECFDF5", color: "#059669" },
    ACTIVE: { bg: "#ECFDF5", color: "#059669" },
    "REVIEW REQUIRED": { bg: "#FFF1F2", color: "#E11D48" },
    DRAFT: { bg: "#F1F5F9", color: "#475569" },
    "HIGH RISK": { bg: "#FFF1F2", color: "#E11D48" },
    "MEDIUM RISK": { bg: "#FFFBEB", color: "#D97706" },
    "LOW RISK": { bg: "#ECFDF5", color: "#059669" },
  };

  const config = configs[status?.toUpperCase()] || configs.UPCOMING;

  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: "24px",
        bgcolor: config.bg,
        color: config.color,
        fontSize: "10px",
        fontWeight: 700,
        width: "fit-content",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
      }}
    >
      {label || status}
    </Box>
  );
}
