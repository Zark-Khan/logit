import React from "react";
import { Box, Typography, Chip, LinearProgress } from "@mui/material";
import { GradCard } from "./StaffCommon";

export default function OpenDiaryCasesCard() {
  return (
    <GradCard gradient="linear-gradient(135deg, rgba(14, 165, 233, 1) 0%, rgba(138, 198, 66, 1) 100%)">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 0.5,
        }}
      >
        <Box>
          <Typography fontWeight={600} fontSize="16px">
            Open Diary Cases
          </Typography>
          <Typography sx={{ fontSize: "12px", mt: 2 }}>
            Check the latest cases for today!
          </Typography>
        </Box>
        <Chip
          label="3 Active"
          size="small"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.3)",
            color: "#fff",
            fontSize: "10px",
            borderRadius: "40px",
            fontWeight: 700,
            px: 0.25,
          }}
        />
      </Box>

      {/* Progress bar */}
      <Box sx={{ mt: 2 }}>
        <LinearProgress
          variant="determinate"
          value={35}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.25)",
            "& .MuiLinearProgress-bar": {
              bgcolor: "#fff",
              borderRadius: 3,
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.8 }}>
          <Typography
            sx={{
              fontSize: "10px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Priority: High
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Today
          </Typography>
        </Box>
      </Box>
    </GradCard>
  );
}
