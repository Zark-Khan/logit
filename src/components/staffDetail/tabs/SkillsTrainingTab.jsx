import React from "react";
import { Box, Typography, Chip } from "@mui/material";

const STATUS_STYLES = {
  CERTIFIED: { bgcolor: "#DCFCE7", color: "#65A30D" },
  "IN PROGRESS": { bgcolor: "#FFEDD5", color: "#F97316" },
};

const COURSES = [
  { title: "Medication Administration", date: "Dec 2025", status: "CERTIFIED" },
  { title: "Manual Handling", date: "May 2026", status: "CERTIFIED" },
  { title: "Dementia Care Plus", date: "In Progress", status: "IN PROGRESS" },
  { title: "Safeguarding Adults", date: "Jan 2026", status: "CERTIFIED" },
];

const CourseCard = ({ title, date, status }) => (
  <Box
    sx={{
      bgcolor: "#F8FAFC",
      borderRadius: "10px",
      px: 1.75,
      py: 1.5,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 0.75,
    }}
  >
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography fontSize="12px" fontWeight={600} color="text.primary">
        {title}
      </Typography>
      <Typography
        fontSize="10px"
        fontWeight={600}
        color="text.light"
        whiteSpace="nowrap"
      >
        {date}
      </Typography>
    </Box>
    <Chip
      label={status}
      size="small"
      sx={{
        ...STATUS_STYLES[status],
        height: 16,
        fontSize: "8px",
        fontWeight: 700,
        borderRadius: "4px",
        "& .MuiChip-label": { px: 0.75 },
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

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 1.5,
        }}
      >
        {COURSES.map((c) => (
          <CourseCard key={c.title} {...c} />
        ))}
      </Box>

      <Box
        sx={{
          mt: 2,
          width: "100%",
          py: 1,
          border: "1px dashed #0D0F12",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          "&:hover": { bgcolor: "rgba(255,255,255,0.6)" },
        }}
      >
        <Typography fontSize="12px" fontWeight={600} color="text.primary">
          +Add New Training Course
        </Typography>
      </Box>
    </Box>
  );
}
