import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import HistoryIcon from "@mui/icons-material/HistoryOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function TasksHistory({ history }) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: "16px",
        border: "1px solid #F1F5F9",
        p: 2.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <HistoryIcon sx={{ fontSize: 16, color: "#0EA5E9" }} />
        <Typography fontSize="14px" fontWeight={700} color="text.primary">
          Tasks history
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "#F1F5F9", mb: 2 }} />

      {history.map((group) => (
        <Box key={group.date} sx={{ mb: 2.5, "&:last-of-type": { mb: 0 } }}>
          <Typography fontSize="12px" fontWeight={700} color="text.primary" mb={1}>
            {group.date}
          </Typography>
          {group.entries.map((entry, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 0.3, mb: 0.6 }}>
              <ArrowRightIcon sx={{ fontSize: 14, color: "#8AC642", mt: "1px", flexShrink: 0 }} />
              <Typography fontSize="11px" color="text.light" sx={{ lineHeight: 1.5 }}>
                {entry.action} task {entry.task}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
