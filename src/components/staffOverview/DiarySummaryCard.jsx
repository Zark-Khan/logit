import React from "react";
import { Box, Typography } from "@mui/material";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import { GradCard, Label } from "./StaffCommon";

export default function DiarySummaryCard({ sx = {} }) {
  return (
    <GradCard
      gradient="linear-gradient(135deg, #5198E7 0%, #2B8DFF 100%)"
      sx={{ width: "100%", ...sx }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3.5 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BookOutlinedIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography fontWeight={600} fontSize="20px">
          Diary Summary
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: "12px", width: "100%" }}>
        {[
          { label: "This Week", value: "12", sub: "Entries" },
          { label: "Last Week", value: "18", sub: "Entries" },
          { label: "Last Month", value: "65", sub: "Entries" },
        ].map((s, i) => (
          <Box
            key={i}
            sx={{
              flex: 1,
              p: 2.5,
              borderRadius: 6,
              bgcolor: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.25)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Label
              sx={{ fontSize: "10px", color: "text.paper", fontWeight: 700 }}
            >
              {s.label}
            </Label>

            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: 700,
                lineHeight: 1.1,
                mt: 0.3,
                color: "text.paper",
              }}
            >
              {s.value}
            </Typography>

            <Typography
              sx={{
                fontSize: "10px",
                color: "text.paper",
                fontWeight: 500,
                opacity: 0.8,
              }}
            >
              {s.sub}
            </Typography>
          </Box>
        ))}
      </Box>
    </GradCard>
  );
}
