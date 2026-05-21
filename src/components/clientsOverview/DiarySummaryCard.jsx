import React from "react";
import { Box, Typography } from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { GradCard, Label } from "../staffOverview/StaffCommon";

export default function DiarySummaryCard({ sx = {} }) {
  const rows = [
    { initials: "TW", label: "THIS WEEK", pct: "4", detail: "Notes" },
    { initials: "LW", label: "LAST WEEK", pct: "7", detail: "Notes" },
    { initials: "LM", label: "LAST MONTH", pct: "24", detail: "Notes" },
  ];

  return (
    <GradCard
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "40px",
        p: 3,
        color: "#fff",
        background: "linear-gradient(135deg, #9A6EFF 0%, #57CBFF 100%)",
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
          Diary Summary
        </Typography>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            bgcolor: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MenuBookOutlinedIcon sx={{ fontSize: 20 }} />
        </Box>
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
        Recent client notes
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
              <Typography fontWeight={700} fontSize="14px">
                {r.initials}
              </Typography>
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
            </Box>
          </Box>
        ))}
      </Box>

      {/* SECOND SOFT LAYER */}
      <Box
        component="svg"
        viewBox="0 0 400 150"
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
          d="M0,140 C150,150 350,120 400,135 L400,150 L0,150 Z"
          fill="rgba(255,255,255,0.18)"
        />
      </Box>
    </GradCard>
  );
}
