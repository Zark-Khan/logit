import React, { useState } from "react";
import { Box, Typography, Paper, TextField, Button, InputAdornment } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

export default function AddAdminReminder() {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");

  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 5, border: "1px solid #8AC64278 ", height: "100%" , background:"rgba(235, 255, 212, 0.23)"}}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            bgcolor: "rgba(232, 255, 204, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EditIcon sx={{ fontSize: 15, color: "success.main" }} />
        </Box>
        <Typography variant="body1" fontWeight={700}>
          Add Admin Reminder
        </Typography>
      </Box>

      {/* Task input */}
      <TextField
        fullWidth
        placeholder="Task description..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        size="small"
        sx={{
          mb: 1.5,
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            "& fieldset": { border: "1px solid #9CA3AF" },
            "&:hover fieldset": { borderColor: "#9CA3AF" },
            "&.Mui-focused fieldset": { borderColor: "#9CA3AF", borderWidth: "1px" },
          },
        }}
      />

      {/* Time + Save row */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          placeholder="--:-- --"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccessTimeOutlinedIcon fontSize="small" sx={{ color: "text.disabled" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            "& fieldset": { border: "1px solid #9CA3AF" },
            "&:hover fieldset": { borderColor: "#9CA3AF" },
            "&.Mui-focused fieldset": { borderColor: "#9CA3AF", borderWidth: "1px" },
          },
          }}
        />
        <Button
          disableElevation
          sx={{
            px: 2.5, py: 0.9, borderRadius: "12px", fontWeight: 600,
            fontSize: "0.8rem", textTransform: "none", color: "#fff",
            backgroundColor: "success.main",
          }}
        >
          Save
        </Button>
      </Box>

      {/* Active reminders */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2,
        pt: 2, borderTop: "1px solid #E9EDF0" }}>
        <Typography variant="body2" color="text.light" sx={{ textTransform: "uppercase", fontWeight: 700 }}>
          Active Reminders
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography variant="body2" fontWeight={700} color="text.primary">12 TODAY</Typography>
        </Box>
      </Box>
    </Paper>
  );
}
