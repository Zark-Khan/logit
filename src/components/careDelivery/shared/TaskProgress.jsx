import React from "react";
import { Box, Typography } from "@mui/material";

export default function TaskProgress({ tasks }) {
  const [completed, total] = tasks.split("/").map(Number);
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const isFull = completed === total && total > 0;
  const isPartial = completed > 0 && completed < total;

  let background;
  if (isFull) {
    background = "#10B981";
  } else if (isPartial) {
    background = `linear-gradient(to right, #3B82F6 ${percentage}%, #ffffff ${percentage}%)`;
  } else {
    background = "#ffffff";
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          width: 9.5,
          height: 6,
          borderRadius: "4px",
          background: background,
          border: isFull ? "none" : "1px solid #E2E8F0",
        }}
      />
      <Typography fontSize="13px" fontWeight={700} color="text.grey">
        {tasks}
      </Typography>
    </Box>
  );
}
