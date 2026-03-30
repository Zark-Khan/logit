import React from "react";
import { Box, Typography } from "@mui/material";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { GradCard } from "./StaffCommon";

export default function ChecklistSummaryCard({ sx = {} }) {
  return (
    <GradCard
      gradient="linear-gradient(135deg, rgba(99, 102, 241, 1) 0%, rgba(165, 180, 252, 1) 100%)"
      sx={{ width: "100%", ...sx }}
    >
      <Typography fontWeight={600} fontSize="20px" mb={2.5}>
        Checklist Summary
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {[
          {
            icon: <ChecklistOutlinedIcon sx={{ fontSize: 15 }} />,
            value: 0,
            label: "Expired / Required",
          },
          {
            icon: <AssignmentOutlinedIcon sx={{ fontSize: 15 }} />,
            value: 0,
            label: "Expiring Within 1 Month",
          },
        ].map((row, i) => (
          <Box key={i} sx={{ display: "flex", gap: 2.5 }}>
            <Box
              sx={{
                width: 50.67,
                height: 50.67,
                borderRadius: "19px",
                bgcolor: "rgba(255,255,255,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {row.icon}
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1.5 }}>
              <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
                {row.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {row.label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </GradCard>
  );
}
