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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DAYS, TIME_GROUPS, TASK_TYPES } from "./taskPlannerData";

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

const emptyForm = {
  title: "",
  description: "",
  day: DAYS[0],
  time: TIME_GROUPS[0],
  type: TASK_TYPES[0],
};

export default function AddTaskModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(emptyForm);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleClose = () => {
    setForm(emptyForm);
    onClose();
  };

  const handleAdd = () => {
    if (!form.title.trim()) return;
    onAdd({ ...form, title: form.title.trim(), description: form.description.trim() });
    setForm(emptyForm);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: "16px" } }}
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}
      >
        <Typography fontSize="16px" fontWeight={700} color="text.primary">
          Add task
        </Typography>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography sx={labelSx}>Task title</Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. Prompt with food and fluid intake"
            value={form.title}
            onChange={set("title")}
            sx={inputSx}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography sx={labelSx}>Description</Typography>
          <TextField
            fullWidth
            size="small"
            multiline
            minRows={3}
            placeholder="What should the carer do?"
            value={form.description}
            onChange={set("description")}
            sx={inputSx}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={labelSx}>Day</Typography>
            <Select fullWidth size="small" value={form.day} onChange={set("day")} sx={selectSx}>
              {DAYS.map((d) => (
                <MenuItem key={d} value={d} sx={{ fontSize: "0.82rem" }}>
                  {d}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={labelSx}>Time of day</Typography>
            <Select fullWidth size="small" value={form.time} onChange={set("time")} sx={selectSx}>
              {TIME_GROUPS.map((t) => (
                <MenuItem key={t} value={t} sx={{ fontSize: "0.82rem" }}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box>
          <Typography sx={labelSx}>Task type</Typography>
          <Select fullWidth size="small" value={form.type} onChange={set("type")} sx={selectSx}>
            {TASK_TYPES.map((t) => (
              <MenuItem key={t} value={t} sx={{ fontSize: "0.82rem" }}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={handleClose}
          sx={{
            textTransform: "none",
            fontSize: "13px",
            fontWeight: 700,
            color: "text.grey",
            borderRadius: "10px",
            px: 2.5,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={!form.title.trim()}
          sx={{
            bgcolor: "#0EA5E9",
            textTransform: "none",
            fontSize: "13px",
            fontWeight: 700,
            borderRadius: "10px",
            px: 3,
            boxShadow: "none",
            "&:hover": { bgcolor: "#0C92CE" },
          }}
        >
          Add task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
