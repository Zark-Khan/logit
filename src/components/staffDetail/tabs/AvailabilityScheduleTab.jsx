import React from "react";
import { Box, Typography } from "@mui/material";

const DAYS = [
  { name: "Mon", available: true, time: "09:00 - 17:00" },
  { name: "Tue", available: true, time: "09:00 - 17:00" },
  { name: "Wed", available: true, time: "09:00 - 17:00" },
  { name: "Thu", available: true, time: "09:00 - 17:00" },
  { name: "Fri", available: true, time: "09:00 - 17:00" },
  { name: "Sat", available: false, time: "Unavailable" },
  { name: "Sun", available: false, time: "Unavailable" },
];

export default function AvailabilityScheduleTab({ staff }) {
  return (
    <Box>
      <Typography
        fontSize="20px"
        fontWeight={700}
        color="text.primary"
        mb={0.4}
      >
        Availability & Schedule
      </Typography>
      <Typography fontSize="14px" color="text.light" mb={3.5}>
        Detailed information and settings for {staff.name}'s availability &
        schedule.
      </Typography>

      <Typography
        fontSize="14px"
        fontWeight={700}
        color="text.primary"
        mb={1.5}
      >
        Weekly Availability Matrix
      </Typography>

      <Box sx={{ display: "flex", gap: 1.5, mb: 3.5, width: "100%" }}>
        {DAYS.map((day) => (
          <Box
            key={day.name}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography fontSize="10px" color="text.primary" fontWeight={600}>
              {day.name}
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: 110,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: day.available ? "#F0FDF4" : "#fff",
                border: day.available
                  ? "1px solid #BBF7D0"
                  : "1px solid #F1F5F9",
                borderRadius: "8px",
              }}
            >
              <Typography
                sx={{
                  writingMode: "vertical-rl",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: day.available ? "#16A34A" : "#CBD5E1",
                  letterSpacing: "0.05em",
                }}
              >
                {day.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          bgcolor: "#FFF7ED",
          border: "1px solid #FFEDD5",
          borderRadius: "12px",
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <Typography
          fontSize="12px"
          fontWeight={700}
          color="#EA580C"
          textTransform="uppercase"
        >
          Upcoming Blackout Dates
        </Typography>
        <Typography fontSize="14px" fontWeight={400} color="#9A3412">
          12 June - 15 June (Family Wedding)
        </Typography>
      </Box>
    </Box>
  );
}
