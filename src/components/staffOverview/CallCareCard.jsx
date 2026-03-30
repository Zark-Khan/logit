import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import { GradCard, Label } from "./StaffCommon";

export default function CallCareCard({ sx = {} }) {
  const rows = [
    {
      icon: <FlashOnOutlinedIcon sx={{ fontSize: 21 }} />,
      label: "THIS WEEK",
      pct: "57%",
      detail: "(28/51)",
      avg: "Avg Lateness: 4 mins",
    },
    {
      icon: <AccessTimeOutlinedIcon sx={{ fontSize: 21 }} />,
      label: "LAST WEEK",
      pct: "100%",
      detail: "(56/56)",
      avg: "Avg Lateness: 0 mins",
    },
    {
      icon: <NightlightOutlinedIcon sx={{ fontSize: 21 }} />,
      label: "LAST MONTH",
      pct: "100%",
      detail: "(72/72)",
      avg: "Avg Lateness: 0 mins",
    },
  ];

  return (
    <GradCard
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "24px",
        p: 3,
        color: "#fff",
        background: "linear-gradient(135deg, #34A9A7 0%, #60D4D2 100%)",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 0.5,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography fontWeight={600} fontSize="20px">
          Call &amp; Care Monitoring
        </Typography>
        <Chip
          label="FULL REPORT"
          size="small"
          sx={{
            bgcolor: "rgba(255,255,255,0.25)",
            color: "text.paper",
            fontSize: "10px",
            fontWeight: 700,
            px: 0.7,
            py: 1.7,
          }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: "12px",
          opacity: 0.7,
          mb: 2,
          textTransform: "uppercase",
          fontWeight: 400,
        }}
      >
        Last updated: just now
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {rows.map((r, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 42,
                bgcolor: "rgba(255,255,255,0.18)", // base tint
                backdropFilter: "blur(12px)", // THIS is the figma blur
                WebkitBackdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {r.icon}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Label
                sx={{ fontSize: "10px", color: "text.paper", fontWeight: 700 }}
              >
                {r.label}
              </Label>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "text.paper",
                  }}
                >
                  {r.pct}
                </Typography>
                <Typography
                  sx={{ fontSize: "14px", opacity: 0.75, color: "text.paper" }}
                >
                  {r.detail}
                </Typography>
              </Box>
              <Typography
                sx={{ fontSize: "10px", opacity: 0.7, color: "text.paper" }}
              >
                {r.avg}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* SECOND SOFT LAYER */}
      <Box
        component="svg"
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        sx={{
          position: "absolute",
          bottom: "0%",
          left: 0,
          width: "100%",
          height: "300%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <path
          d="M0,140 C150,150 350,120 500,135 L500,150 L0,150 Z"
          fill="rgba(255,255,255,0.18)"
        />
      </Box>
    </GradCard>
  );
}
