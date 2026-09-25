import React from "react";
import { Box, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Title + subtitle with the "< Back to Medication" link used by every sub-view
export default function MedicationViewHeader({ title, subtitle, onBack }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 2,
        mb: 3,
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          {title}
        </Typography>
        <Typography fontSize="14px" color="text.light" sx={{ mt: 0.3 }}>
          {subtitle}
        </Typography>
      </Box>
      <Box
        component="button"
        type="button"
        onClick={onBack}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.25,
          flexShrink: 0,
          mt: 0.75,
          p: 0,
          border: "none",
          bgcolor: "transparent",
          color: "primary.main",
          cursor: "pointer",
          fontFamily: "inherit",
          "&:hover": { color: "#0284c7" },
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: 18 }} />
        <Typography fontSize="13px" fontWeight={700}>
          Back to Medication
        </Typography>
      </Box>
    </Box>
  );
}
