import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const CourseCard = ({ title, date, progress }) => (
  <Box
    sx={{
      flex: "1 1 calc(50% - 16px)", // rough 50% minus gap
      minWidth: "250px",
      bgcolor: "#fff",
      borderRadius: "12px",
      px: 3,
      py: 2.5,
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography fontSize="14px" fontWeight={700} color="text.primary">
        {title}
      </Typography>
      <Typography
        fontSize="10px"
        fontWeight={700}
        color="text.light"
        textTransform="capitalize"
      >
        {date}
      </Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{
        height: 6,
        borderRadius: 3,
        bgcolor: "#E2E8F0",
        "& .MuiLinearProgress-bar": {
          bgcolor: "#8AC642",
          borderRadius: 3,
        },
      }}
    />
  </Box>
);

export default function SkillsTrainingTab({ staff }) {
  return (
    <Box>
      <Typography
        fontSize="20px"
        fontWeight={700}
        color="text.primary"
        mb={0.4}
      >
        Skills & Training
      </Typography>
      <Typography fontSize="14px" color="text.light" mb={3.5}>
        Detailed information and settings for {staff.name}'s skills & training.
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <CourseCard
          title="Medication Administration"
          date="Dec 2025"
          progress={100}
        />
        <CourseCard title="Manual Handling" date="May 2026" progress={100} />
        <CourseCard
          title="Dementia Care Plus"
          date="In Progress"
          progress={80}
        />
        <CourseCard
          title="Safeguarding Adults"
          date="Jan 2026"
          progress={100}
        />
      </Box>

      <Box
        sx={{
          mt: 2,
          width: "100%",
          py: 2.2,
          border: "1px dashed #64748B",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.03)",
            borderColor: "text.primary",
          },
        }}
      >
        <Typography fontSize="14px" fontWeight={700} color="text.primary">
          + Assign New Training Course
        </Typography>
      </Box>
    </Box>
  );
}
