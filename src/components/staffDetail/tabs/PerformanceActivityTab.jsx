import React from "react";
import { Box, Typography } from "@mui/material";

const StatCard = ({ label, value, sub, subColor }) => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "start",
      gap: 0.5,
      bgcolor: "#fff",
      border: "1px solid #fff", // Removing visible border to match design closely or keeping white
      borderRadius: "8px",
      px: 3,
      py: 2,
    }}
  >
    <Typography
      fontSize="10px"
      fontWeight={700}
      color="text.grey"
      textTransform="uppercase"
      letterSpacing="0.06em"
      mb={1}
    >
      {label}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Typography
        fontSize="28px"
        fontWeight={700}
        color="text.primary"
        lineHeight={1}
      >
        {value}
      </Typography>
      <Typography
        fontSize="10px"
        fontWeight={700}
        color={subColor}
        textTransform="uppercase"
        letterSpacing="0.06em"
      >
        {sub}
      </Typography>
    </Box>
  </Box>
);

export default function PerformanceActivityTab({ staff }) {
  return (
    <Box>
      <Typography
        fontSize="20px"
        fontWeight={700}
        color="text.primary"
        mb={0.4}
      >
        Performance & Activity
      </Typography>
      <Typography fontSize="14px" color="text.light" mb={3.5}>
        Detailed information and settings for {staff.name}'s performance &
        activity.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        <StatCard
          label="VISIT COMPLETION RATE"
          value="99.2%"
          sub="TOP 5%"
          subColor="#22C55E"
        />
        <StatCard
          label="CHECK-IN PUNCTUALITY"
          value="94%"
          sub="ON AVERAGE"
          subColor="#F97316"
        />
      </Box>

      <Typography
        fontSize="14px"
        fontWeight={700}
        color="text.primary"
        mb={1.5}
      >
        Supervisor Notes
      </Typography>

      <Box
        sx={{
          bgcolor: "#fff",
          borderLeft: "4px solid #0EA5E9",
          p: 2.5,
          pl: 3,
        }}
      >
        <Typography
          fontSize="14px"
          fontStyle="italic"
          color="text.primary"
          mb={1}
          fontWeight={500}
        >
          "Sarah consistently receives high praise for her palliative care
          support. She is very thorough with digital documentation."
        </Typography>
        <Typography fontSize="11px" color="text.secondary" fontWeight={600}>
          — Alex Marshall, March 2024
        </Typography>
      </Box>
    </Box>
  );
}
