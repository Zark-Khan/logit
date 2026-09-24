import React from "react";
import { Box, Typography } from "@mui/material";
import { FlaskIcon } from "../staffOverview/LineIcons";
import { GradCard, Label } from "../staffOverview/StaffCommon";

export default function MedicationStatsCard({ sx = {} }) {
  return (
    <GradCard
      gradient="linear-gradient(180deg, #F43F5E 0%, #FB7185 100%)"
      sx={{ width: "100%", ...sx }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Typography fontWeight={600} fontSize="20px">
          Medication Stats
        </Typography>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FlaskIcon size={16} />
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        {[
          { label: "This Week" },
          { label: "Last Week" },
          { label: "Last Month" },
        ].map((stat, idx) => (
          <Box
            key={idx}
            sx={{
              flex: 1,
              pl: idx !== 0 ? 4 : 0,
              borderLeft:
                idx !== 0 ? "1px solid rgba(255,255,255,0.25)" : "none",
              ml: idx !== 0 ? 4 : 0,
            }}
          >
            <Label
              sx={{
                fontSize: "10px",
                color: "#fff",
                fontWeight: 700,
                mb: 0.5,
                display: "block",
              }}
            >
              {stat.label}
            </Label>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.9)",
                mt: 0.5,
              }}
            >
              No outcomes submitted
            </Typography>
          </Box>
        ))}
      </Box>
    </GradCard>
  );
}
