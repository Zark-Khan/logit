import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Radio,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

export const VISIT_TYPES = [
  "Personal Care",
  "Medication",
  "Morning Routine",
  "Evening Routine",
  "Domestic Help",
  "Palliative",
];

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    bgcolor: "#F8FAFC",
    fontSize: "14px",
    "& fieldset": { borderColor: "#E2E8F0" },
    "&:hover fieldset": { borderColor: "#CBD5E1" },
    "&.Mui-focused fieldset": { borderColor: "#0EA5E9", borderWidth: "1px" },
  },
  "& .MuiOutlinedInput-input": { py: 1.5 },
};

const selectSx = {
  borderRadius: "12px",
  bgcolor: "#F8FAFC",
  fontSize: "14px",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#CBD5E1" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0EA5E9",
    borderWidth: "1px",
  },
  "& .MuiSelect-select": { py: 1.5 },
};

const labelSx = {
  fontSize: "11px",
  fontWeight: 700,
  color: "#475569",
  textTransform: "uppercase",
  letterSpacing: 0.3,
  mb: 1,
};

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

// True when [start, start+duration) overlaps any of this staff member's shifts
const hasConflict = (staffId, start, duration, shifts) => {
  const a = toMinutes(start);
  const b = a + duration;
  return shifts.some((s) => {
    if (s.staffId !== staffId) return false;
    const sa = toMinutes(s.start);
    const sb = sa + parseInt(s.duration, 10);
    return a < sb && sa < b;
  });
};

const initialDetails = (defaultDate) => ({
  client: "",
  visitType: "Personal Care",
  date: defaultDate,
  start: "08:00",
  duration: 60,
  instructions: "",
});

function Field({ label, children }) {
  return (
    <Box>
      <Typography sx={labelSx}>{label}</Typography>
      {children}
    </Box>
  );
}

/**
 * Two-step "Create New Shift" dialog: care details, then staff matching.
 * `candidates`: [{ id, name, skill, distance }]
 * `shifts`: existing roster shifts, used to flag clashes.
 * `onCreate(shift)` receives { staffId, client, start, duration, type, instructions, date }.
 */
export default function CreateShiftModal({
  open,
  onClose,
  onCreate,
  clients,
  candidates,
  shifts,
  defaultDate,
}) {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState(() => initialDetails(defaultDate));
  const [staffId, setStaffId] = useState(null);
  const set = (key) => (value) => setDetails((d) => ({ ...d, [key]: value }));

  const duration = Number(details.duration);
  const detailsValid =
    details.client && details.date && details.start && duration > 0;

  const matches = candidates.map((c) => ({
    ...c,
    conflict: detailsValid && hasConflict(c.id, details.start, duration, shifts),
  }));

  const reset = () => {
    setStep(1);
    setDetails(initialDetails(defaultDate));
    setStaffId(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const goToMatching = () => {
    // Pre-select the first available match, like the design
    const firstFree = matches.find((m) => !m.conflict);
    setStaffId((current) =>
      matches.some((m) => m.id === current && !m.conflict)
        ? current
        : firstFree?.id ?? null
    );
    setStep(2);
  };

  const handleSave = () => {
    onCreate({
      staffId,
      client: details.client,
      start: details.start,
      duration: `${duration}m`,
      type: details.visitType.toUpperCase(),
      instructions: details.instructions,
      date: details.date,
    });
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="create-shift-title"
      PaperProps={{ sx: { borderRadius: "28px", overflow: "hidden" } }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          px: 3.5,
          py: 2.5,
          bgcolor: "#F8FAFC",
          borderBottom: "1px solid #F1F5F9",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              bgcolor: "#0EA5E9",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AddIcon />
          </Box>
          <Box>
            <Typography id="create-shift-title" fontSize="20px" fontWeight={700}>
              Create New Shift
            </Typography>
            <Typography fontSize="13px" color="text.secondary">
              {step === 1
                ? "Step 1 of 2: Care Details"
                : "Step 2 of 2: Smart Staff Matching"}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleClose} aria-label="Close" sx={{ color: "#94A3B8" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Body */}
      <Box sx={{ px: 3.5, py: 3 }}>
        {step === 1 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Field label="Service user">
                <Select
                  fullWidth
                  displayEmpty
                  value={details.client}
                  onChange={(e) => set("client")(e.target.value)}
                  IconComponent={KeyboardArrowDownIcon}
                  inputProps={{ "aria-label": "Service user" }}
                  sx={selectSx}
                  renderValue={(v) =>
                    v || (
                      <Typography component="span" color="#94A3B8" fontSize="14px">
                        Select Client...
                      </Typography>
                    )
                  }
                >
                  {clients.map((c) => (
                    <MenuItem key={c} value={c} sx={{ fontSize: "14px" }}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </Field>
              <Field label="Visit type">
                <Select
                  fullWidth
                  value={details.visitType}
                  onChange={(e) => set("visitType")(e.target.value)}
                  IconComponent={KeyboardArrowDownIcon}
                  inputProps={{ "aria-label": "Visit type" }}
                  sx={selectSx}
                >
                  {VISIT_TYPES.map((t) => (
                    <MenuItem key={t} value={t} sx={{ fontSize: "14px" }}>
                      {t}
                    </MenuItem>
                  ))}
                </Select>
              </Field>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
                gap: 2,
              }}
            >
              <Field label="Date">
                <TextField
                  fullWidth
                  type="date"
                  value={details.date}
                  onChange={(e) => set("date")(e.target.value)}
                  inputProps={{ "aria-label": "Date" }}
                  sx={fieldSx}
                />
              </Field>
              <Field label="Start time">
                <TextField
                  fullWidth
                  type="time"
                  value={details.start}
                  onChange={(e) => set("start")(e.target.value)}
                  inputProps={{ "aria-label": "Start time" }}
                  sx={fieldSx}
                />
              </Field>
              <Field label="Duration (mins)">
                <TextField
                  fullWidth
                  type="number"
                  value={details.duration}
                  onChange={(e) => set("duration")(e.target.value)}
                  inputProps={{ min: 15, step: 15, "aria-label": "Duration in minutes" }}
                  sx={fieldSx}
                />
              </Field>
            </Box>

            <Field label="Instructions for carer">
              <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder="E.g. Access via back door, patient may be sleeping..."
                value={details.instructions}
                onChange={(e) => set("instructions")(e.target.value)}
                inputProps={{ "aria-label": "Instructions for carer" }}
                sx={{
                  ...fieldSx,
                  "& .MuiOutlinedInput-root": {
                    ...fieldSx["& .MuiOutlinedInput-root"],
                    p: 1.75,
                  },
                  "& .MuiOutlinedInput-input": { p: 0 },
                }}
              />
            </Field>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {/* Recommendation banner */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2.25,
                mb: 1,
                borderRadius: "14px",
                bgcolor: "#F0F9FF",
                border: "1px solid #E0F2FE",
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  borderRadius: "50%",
                  bgcolor: "#0EA5E9",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShieldOutlinedIcon sx={{ fontSize: 22 }} />
              </Box>
              <Box>
                <Typography fontSize="14px" fontWeight={700}>
                  Smart Recommendation Engine
                </Typography>
                <Typography fontSize="12px" color="text.secondary">
                  Showing staff based on <b>Availability</b>, <b>Distance</b>, and{" "}
                  <b>Skills</b>.
                </Typography>
              </Box>
            </Box>

            {matches.map((m) => {
              const selected = staffId === m.id;
              return (
                <Box
                  key={m.id}
                  role="radio"
                  aria-checked={selected}
                  aria-disabled={m.conflict}
                  tabIndex={m.conflict ? -1 : 0}
                  onClick={() => !m.conflict && setStaffId(m.id)}
                  onKeyDown={(e) => {
                    if (!m.conflict && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      setStaffId(m.id);
                    }
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    px: 2.25,
                    py: 1.75,
                    borderRadius: "14px",
                    border: "1px solid",
                    borderColor: selected ? "#0EA5E9" : "#F1F5F9",
                    bgcolor: selected ? "#0EA5E9" : m.conflict ? "#F8FAFC" : "#fff",
                    color: selected ? "#fff" : "text.primary",
                    opacity: m.conflict ? 0.6 : 1,
                    cursor: m.conflict ? "not-allowed" : "pointer",
                    transition: "background-color 0.15s ease, border-color 0.15s ease",
                    "&:hover": m.conflict || selected ? {} : { borderColor: "#BAE6FD" },
                    "&:focus-visible": { outline: "2px solid #0EA5E9", outlineOffset: 2 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 38,
                      height: 38,
                      fontSize: "14px",
                      fontWeight: 700,
                      bgcolor: selected ? "rgba(255,255,255,0.2)" : "#F1F5F9",
                      color: selected ? "#fff" : "#64748B",
                    }}
                  >
                    {m.name[0]}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography fontSize="15px" fontWeight={700} noWrap>
                      {m.name}
                    </Typography>
                    <Typography
                      fontSize="12px"
                      sx={{ color: selected ? "rgba(255,255,255,0.85)" : "text.secondary" }}
                    >
                      {m.skill} • {m.distance} away
                    </Typography>
                  </Box>
                  {m.conflict ? (
                    <Typography
                      fontSize="10px"
                      fontWeight={700}
                      color="#F87171"
                      sx={{ letterSpacing: 1 }}
                    >
                      SHIFT CONFLICT
                    </Typography>
                  ) : (
                    <Radio
                      checked={selected}
                      tabIndex={-1}
                      inputProps={{ "aria-hidden": true }}
                      sx={{
                        p: 0.5,
                        color: "#CBD5E1",
                        "&.Mui-checked": { color: "#fff" },
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3.5,
          py: 2.5,
          bgcolor: "#F8FAFC",
          borderTop: "1px solid #F1F5F9",
        }}
      >
        <Button
          onClick={step === 1 ? handleClose : () => setStep(1)}
          sx={{
            color: "#64748B",
            fontWeight: 700,
            fontSize: "15px",
            textTransform: "none",
            "&:hover": { bgcolor: "transparent", color: "text.primary" },
          }}
        >
          {step === 1 ? "Cancel" : "Go Back"}
        </Button>
        <Button
          variant="contained"
          disabled={step === 1 ? !detailsValid : !staffId}
          onClick={step === 1 ? goToMatching : handleSave}
          sx={{
            bgcolor: "#0EA5E9",
            color: "#fff",
            fontWeight: 700,
            fontSize: "15px",
            textTransform: "none",
            borderRadius: "12px",
            px: 4,
            py: 1.25,
            boxShadow: "0 8px 20px rgba(14,165,233,0.3)",
            "&:hover": { bgcolor: "#0284c7" },
            "&.Mui-disabled": { bgcolor: "#BAE6FD", color: "#fff" },
          }}
        >
          {step === 1 ? "Continue to Matching" : "Confirm & Save Shift"}
        </Button>
      </Box>
    </Dialog>
  );
}
