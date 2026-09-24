import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { GradCard } from "../staffOverview/StaffCommon";

export default function OpenDiaryCasesCard({ sx = {} }) {
  return (
    <GradCard
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "40px",
        p: 3,
        color: "#fff",
        background: "linear-gradient(135deg, #2F80ED 0%, #38A8F8 100%)",
        width: "100%",
        ...sx,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 1.5,
        }}
      >
        <Typography fontWeight={600} fontSize="16px">
          Open Diary Cases
        </Typography>
        <Chip
          label="No Active Cases"
          size="small"
          sx={{
            bgcolor: "rgba(255,255,255,0.35)",
            color: "#fff",
            fontSize: "9px",
            fontWeight: 700,
            height: 20,
            borderRadius: "6px",
            letterSpacing: 0.3,
          }}
        />
      </Box>

      {/* Subtitle */}
      <Typography
        sx={{
          fontSize: "11px",
          color: "rgba(255,255,255,0.9)",
          fontWeight: 400,
          mb: 2.5,
        }}
      >
        All client diary cases are currently resolved.
      </Typography>

      {/* Progress bar */}
      <Box
        sx={{
          width: "100%",
          height: 4,
          borderRadius: 3,
          bgcolor: "rgba(255,255,255,0.25)",
          mb: 1.25,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 3,
            bgcolor: "#fff",
          }}
        />
      </Box>

      {/* Bottom status row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          Status: Clear
        </Typography>
        <Typography
          sx={{
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          Today
        </Typography>
      </Box>
    </GradCard>
  );
}
