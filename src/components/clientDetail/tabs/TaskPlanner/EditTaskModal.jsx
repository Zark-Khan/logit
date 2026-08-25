import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

// Only the description is editable here. Title, day, time and type stay fixed
// so editing a task cannot silently move it to another day or change its type;
// those changes go through delete + add instead.
export default function EditTaskModal({ open, task, onClose, onSave }) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open && task) setDescription(task.description || "");
  }, [open, task]);

  if (!task) return null;

  const handleSave = () => {
    onSave(task.id, description.trim());
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: "16px" } }}
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}
      >
        <Typography fontSize="16px" fontWeight={700} color="text.primary">
          Edit description
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography sx={labelSx}>Task</Typography>
          <Box
            sx={{
              bgcolor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: 2.5,
              px: 1.75,
              py: 1.25,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
            }}
          >
            <Typography fontSize="13px" fontWeight={700} color="text.primary">
              {task.title}
            </Typography>
            <Typography fontSize="11px" color="text.light" sx={{ flexShrink: 0 }}>
              {task.day} &middot; {task.time}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography sx={labelSx}>Description</Typography>
          <TextField
            fullWidth
            autoFocus
            size="small"
            multiline
            minRows={3}
            placeholder="What should the carer do?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={inputSx}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={onClose}
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
          onClick={handleSave}
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
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
