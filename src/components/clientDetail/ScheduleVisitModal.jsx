import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  Avatar,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";

const labelSx = {
  fontSize: "10px",
  fontWeight: 700,
  textTransform: "uppercase",
  color: "text.light",
  mb: 0.8,
  display: "block",
  letterSpacing: 0.5,
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5,
    fontSize: "0.82rem",
    "& fieldset": { borderColor: "#E2E8F0" },
    "&:hover fieldset": { borderColor: "#0EA5E9" },
    "&.Mui-focused fieldset": { borderColor: "#0EA5E9", borderWidth: "1.5px" },
  },
};

const selectSx = {
  borderRadius: 2.5,
  fontSize: "0.82rem",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#0EA5E9" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0EA5E9",
    borderWidth: "1.5px",
  },
};

const STAFF_LIST = [
  { name: "Sarah Thompson", role: "Senior Carer" },
  { name: "James Wilson", role: "Carer" },
  { name: "Michael Chen", role: "Carer" },
];

const VISIT_TASKS = ["Personal Care", "Medication Prompt", "Hydration Check"];

export function ScheduleVisitModal({
  open,
  onClose,
  clientName = "Margaret Hall",
}) {
  const [form, setForm] = useState({
    visitType: "Morning Routine",
    recurrence: "One-off",
    startDate: "02/12/2026",
    startTime: "08:00 A",
    mins: "60",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
          border: "1px solid #E2E8F0",
        },
      }}
    >
      {/* ── Header ── */}
      <DialogTitle sx={{ pb: 0, pt: 3, px: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "10px",
                bgcolor: "#E0F2FE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EventNoteOutlinedIcon sx={{ fontSize: 20, color: "#0EA5E9" }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "text.primary",
                }}
              >
                Schedule Visit
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "text.secondary",
                  fontWeight: 400,
                }}
              >
                Creating visit for{" "}
                <span style={{ color: "#0EA5E9", fontWeight: 700 }}>
                  {clientName}
                </span>
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{ mt: -0.5, color: "text.secondary" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 4, pt: 3, pb: 1 }}>
        {/* ── Visit Type & Recurrence ── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2.5,
            mb: 2.5,
            mt: 2.5,
          }}
        >
          <Box>
            <Typography component="label" sx={labelSx}>
              Visit Type
            </Typography>
            <Select
              fullWidth
              size="small"
              value={form.visitType}
              onChange={set("visitType")}
              IconComponent={KeyboardArrowDownIcon}
              sx={selectSx}
            >
              {[
                "Morning Routine",
                "Evening Routine",
                "Medication Visit",
                "Personal Care",
              ].map((v) => (
                <MenuItem key={v} value={v} sx={{ fontSize: "0.82rem" }}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography component="label" sx={labelSx}>
              Recurrence
            </Typography>
            <Select
              fullWidth
              size="small"
              value={form.recurrence}
              onChange={set("recurrence")}
              IconComponent={KeyboardArrowDownIcon}
              sx={selectSx}
            >
              {["One-off", "Daily", "Weekly", "Fortnightly"].map((v) => (
                <MenuItem key={v} value={v} sx={{ fontSize: "0.82rem" }}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* ── Start Date, Start Time, Mins ── */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 0.6fr",
            gap: 2.5,
            mb: 3.5,
          }}
        >
          <Box>
            <Typography component="label" sx={labelSx}>
              Start Date
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={form.startDate}
              onChange={set("startDate")}
              sx={inputSx}
              InputProps={{
                endAdornment: (
                  <CalendarTodayOutlinedIcon
                    sx={{ fontSize: 16, color: "text.secondary" }}
                  />
                ),
              }}
            />
          </Box>
          <Box>
            <Typography component="label" sx={labelSx}>
              Start Time
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={form.startTime}
              onChange={set("startTime")}
              sx={inputSx}
              InputProps={{
                endAdornment: (
                  <AccessTimeOutlinedIcon
                    sx={{ fontSize: 16, color: "text.secondary" }}
                  />
                ),
              }}
            />
          </Box>
          <Box>
            <Typography component="label" sx={labelSx}>
              Mins
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={form.mins}
              onChange={set("mins")}
              sx={inputSx}
            />
          </Box>
        </Box>

        {/* ── Assign Staff ── */}
        <Typography component="label" sx={labelSx}>
          Assign Staff
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 1.5 }}
        >
          {STAFF_LIST.map((s, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.5,
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                bgcolor: "#fff",
              }}
            >
              <Avatar
                src={`https://ui-avatars.com/api/?name=${s.name}&background=random&size=32`}
                sx={{ width: 36, height: 36 }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                >
                  {s.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "text.secondary",
                    fontWeight: 400,
                  }}
                >
                  {s.role}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Button
          fullWidth
          sx={{
            textTransform: "none",
            fontSize: "12px",
            fontWeight: 700,
            color: "#0EA5E9",
            mb: 3,
            border: "1px dashed #BAE6FD",
            borderRadius: "12px",
            py: 1,
            "&:hover": { bgcolor: "#F0F9FF" },
          }}
        >
          + Find Available Staff
        </Button>

        <Box
          sx={{
            bgcolor: "#F1F5F9",
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            p: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <Typography
              component="label"
              sx={{ ...labelSx, mb: 0, color: "text.primary" }}
            >
              Visit Tasks
            </Typography>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#0EA5E9",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              Customize
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {VISIT_TASKS.map((task) => (
              <Chip
                key={task}
                label={task}
                size="small"
                sx={{
                  bgcolor: "#fff",
                  color: "text.secondary",
                  fontSize: "11px",
                  fontWeight: 600,
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                  height: 28,
                }}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>

      {/* ── Footer ── */}
      <DialogActions
        sx={{
          px: 4,
          py: 3,
          justifyContent: "space-between",
          bgcolor: "rgba(241, 245, 249, 0.5)",
          borderTop: "0.8px solid #E2E8F0",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            fontSize: "0.85rem",
            fontWeight: 700,
            color: "text.primary",
            "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontSize: "0.85rem",
            fontWeight: 700,
            px: 3.5,
            py: 1.2,
            background: "linear-gradient(135deg, #8AC642 0%, #0EA5E9 100%)",
            boxShadow: "0 4px 14px rgba(138, 198, 66, 0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #7AB03B 0%, #0C8FCC 100%)",
            },
            color: "#fff",
          }}
        >
          Confirm & Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
}
