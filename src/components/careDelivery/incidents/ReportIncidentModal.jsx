import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Grid,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ShieldAlertIcon } from "../../staffOverview/LineIcons";
import {
  INCIDENT_TYPES,
  STATUS_OPTIONS,
  CURRENT_USER,
  typeLabel,
  formatDateTime,
} from "./incidentData";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const SEVERITY_LEVELS = ["Low", "Medium", "High", "Critical"];
const SEVERITY_COLORS = {
  Low: {
    active: { bgcolor: "#D1FAE5", color: "#059669", border: "#A7F3D0" },
    idle: { bgcolor: "#F8FAFC", color: "#94A3B8", border: "#F1F5F9" },
  },
  Medium: {
    active: { bgcolor: "#FFFBEB", color: "#D97706", border: "#F59E0B" },
    idle: { bgcolor: "#F8FAFC", color: "#94A3B8", border: "#F1F5F9" },
  },
  High: {
    active: { bgcolor: "#FFE4E6", color: "#E11D48", border: "#FECDD3" },
    idle: { bgcolor: "#F8FAFC", color: "#94A3B8", border: "#F1F5F9" },
  },
  Critical: {
    active: { bgcolor: "#EDE9FE", color: "#7C3AED", border: "#DDD6FE" },
    idle: { bgcolor: "#F8FAFC", color: "#94A3B8", border: "#F1F5F9" },
  },
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#F8FAFC",
    "& fieldset": { borderColor: "#F1F5F9" },
  },
  "& input::placeholder": { color: "#94A3B8", opacity: 1, fontWeight: 400 },
};

const labelSx = {
  fontSize: "10px",
  fontWeight: 700,
  color: "#64748B",
  mb: 1,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

const STEP_SUBTITLES = [
  "Step 1 of 3: Incident Details",
  "Step 2 of 3: Description & Witnesses",
  "Step 3 of 3: Actions & Outcome",
];

const FOLLOW_UP_OPTIONS = ["Yes", "No"];

const initialForm = () => ({
  type: "",
  client: "",
  dateTime: "",
  location: "",
  description: "",
  immediateActions: "",
  status: "Open",
});

export default function ReportIncidentModal({ open, onClose, onSubmit }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [severity, setSeverity] = useState("Medium");
  const [witnesses, setWitnesses] = useState([]);
  const [followUp, setFollowUp] = useState("No");
  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const reset = () => {
    setStep(0);
    setForm(initialForm());
    setSeverity("Medium");
    setWitnesses([]);
    setFollowUp("No");
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  const handleNext = () => setStep((s) => Math.min(s + 1, 2));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));
  const addWitness = () => setWitnesses((w) => [...w, ""]);
  const updateWitness = (i, val) =>
    setWitnesses((w) => w.map((x, idx) => (idx === i ? val : x)));
  const removeWitness = (i) =>
    setWitnesses((w) => w.filter((_, idx) => idx !== i));

  // Each step needs its essentials before continuing
  const canContinue = [
    Boolean(form.type && form.client.trim() && form.dateTime),
    Boolean(form.description.trim()),
    true,
  ][step];

  const handleSubmit = () => {
    const when = formatDateTime(form.dateTime);
    onSubmit?.({
      title: `${typeLabel(form.type)}: ${form.client.trim()}`,
      reportedBy: CURRENT_USER,
      time: when,
      status: form.status.toUpperCase(),
      type: form.type,
      severity: severity.toUpperCase(),
      followUp: followUp === "Yes" ? "REQUIRED" : "NONE",
      description: form.description.trim(),
      location: form.location.trim(),
      witnesses: witnesses.map((w) => w.trim()).filter(Boolean),
      immediateActions: form.immediateActions.trim(),
      logs: [{ time: when, text: `Incident reported by ${CURRENT_USER}` }],
    });
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 672,
          borderRadius: "24px",
          boxShadow: "0px 24px 48px -12px rgba(16, 24, 40, 0.18)",
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, pb: 2, bgcolor: "#fff" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "16px",
                bgcolor: "#FFFBEB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ color: "#D97706", display: "flex" }}>
                <ShieldAlertIcon size={22} />
              </Box>
            </Box>
            <Box>
              <Typography fontSize="20px" fontWeight={700} color="text.primary">
                Report New Incident
              </Typography>
              <Typography fontSize="12px" color="#64748B" fontWeight={400}>
                {STEP_SUBTITLES[step]}
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={handleClose}
            aria-label="Close"
            sx={{ color: "#94A3B8" }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#F1F5F9" }} />

      {/* Step 1: Incident Details */}
      {step === 0 && (
        <Box sx={{ p: 3, backgroundColor: "#ffffff" }}>
          <Grid container spacing={2.5}>
            {/* Incident Type */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                sx={labelSx}
                fontSize={"10px"}
                fontWeight={700}
                color="text.grey"
              >
                Incident Type
              </Typography>
              <TextField
                select
                fullWidth
                {...field("type")}
                SelectProps={{ displayEmpty: true }}
                inputProps={{ "aria-label": "Incident type" }}
                sx={inputSx}
              >
                <MenuItem value="" disabled>
                  Select Type
                </MenuItem>
                {INCIDENT_TYPES.map((t) => (
                  <MenuItem key={t.key} value={t.key}>
                    {t.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Client Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                sx={labelSx}
                fontSize={"10px"}
                fontWeight={700}
                color="text.grey"
              >
                Client Name
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g. Arthur Morgan"
                {...field("client")}
                inputProps={{ "aria-label": "Client name" }}
                sx={inputSx}
              />
            </Grid>

            {/* Date & Time */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                sx={labelSx}
                fontSize={"10px"}
                fontWeight={700}
                color="text.grey"
              >
                Date & Time
              </Typography>
              <TextField
                fullWidth
                type="datetime-local"
                {...field("dateTime")}
                inputProps={{ "aria-label": "Date and time" }}
                InputProps={{
                  startAdornment: (
                    <CalendarTodayOutlinedIcon
                      sx={{ color: "#94A3B8", fontSize: 18, mr: 1 }}
                    />
                  ),
                }}
                sx={{
                  ...inputSx,
                  "& input[type='datetime-local']::-webkit-calendar-picker-indicator":
                    { opacity: 0.5, cursor: "pointer" },
                }}
              />
            </Grid>

            {/* Location */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                sx={labelSx}
                fontSize={"10px"}
                fontWeight={700}
                color="text.grey"
              >
                Location
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g. Living Room"
                {...field("location")}
                inputProps={{ "aria-label": "Location" }}
                InputProps={{
                  startAdornment: (
                    <LocationOnOutlinedIcon
                      sx={{ color: "#94A3B8", fontSize: 18, mr: 1 }}
                    />
                  ),
                }}
                sx={inputSx}
              />
            </Grid>

            {/* Severity Level */}
            <Grid size={{ xs: 12 }}>
              <Typography
                sx={labelSx}
                fontSize={"10px"}
                fontWeight={700}
                color="text.grey"
              >
                Severity Level
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                {SEVERITY_LEVELS.map((level) => {
                  const isActive = severity === level;
                  const styles = isActive
                    ? SEVERITY_COLORS[level].active
                    : SEVERITY_COLORS[level].idle;
                  return (
                    <Box
                      key={level}
                      component="button"
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSeverity(level)}
                      sx={{
                        fontFamily: "inherit",
                        flex: 1,
                        py: 1,
                        borderRadius: "10px",
                        border: "1.5px solid",
                        borderColor: styles.border,
                        bgcolor: styles.bgcolor,
                        color: styles.color,
                        fontSize: "12px",
                        fontWeight: 700,
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        userSelect: "none",
                      }}
                    >
                      {level}
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Step 2: Description & Witnesses */}
      {step === 1 && (
        <Box sx={{ p: 3, backgroundColor: "#ffffff" }}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
              <Typography
                sx={labelSx}
                fontSize={"10px"}
                fontWeight={700}
                color="text.grey"
              >
                Incident Description
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={4}
                placeholder="Provide a detailed account of what happened..."
                {...field("description")}
                inputProps={{ "aria-label": "Incident description" }}
                sx={{
                  ...inputSx,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    backgroundColor: "#F8FAFC",
                    alignItems: "flex-start",
                    "& fieldset": { borderColor: "#F1F5F9" },
                  },
                  "& textarea::placeholder": {
                    color: "#94A3B8",
                    opacity: 1,
                    fontWeight: 400,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1.5,
                }}
              >
                <Typography
                  sx={labelSx}
                  fontSize={"10px"}
                  fontWeight={700}
                  color="text.grey"
                  mb={0}
                >
                  Witnesses
                </Typography>
                <Button
                  onClick={addWitness}
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#E11D48",
                    textTransform: "none",
                    p: 0,
                    minWidth: 0,
                  }}
                >
                  + Add Witness
                </Button>
              </Box>
              {witnesses.length === 0 ? (
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    border: "1px dashed #E2E8F0",
                    borderRadius: "16px",
                    py: 2.5,
                    textAlign: "center",
                  }}
                >
                  <Typography fontSize="12px" color="#94A3B8" fontWeight={400}>
                    No witnesses recorded
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  {witnesses.map((w, i) => (
                    <Box
                      key={i}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <TextField
                        fullWidth
                        autoFocus={i === witnesses.length - 1 && !w}
                        value={w}
                        onChange={(e) => updateWitness(i, e.target.value)}
                        placeholder={`Witness ${i + 1} name`}
                        inputProps={{ "aria-label": `Witness ${i + 1} name` }}
                        sx={inputSx}
                      />
                      <IconButton
                        aria-label={`Remove witness ${i + 1}`}
                        onClick={() => removeWitness(i)}
                        sx={{
                          color: "#CBD5E1",
                          "&:hover": { color: "#EF4444", bgcolor: "#FEF2F2" },
                        }}
                      >
                        <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Step 3: Actions & Outcome */}
      {step === 2 && (
        <Box sx={{ p: 3, backgroundColor: "#ffffff" }}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
              <Typography sx={labelSx}>Immediate Actions Taken</Typography>
              <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder="What was done immediately following the incident?"
                {...field("immediateActions")}
                inputProps={{ "aria-label": "Immediate actions taken" }}
                sx={{
                  ...inputSx,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#F8FAFC",
                    alignItems: "flex-start",
                    "& fieldset": { borderColor: "#F1F5F9" },
                  },
                  "& textarea::placeholder": {
                    color: "#94A3B8",
                    opacity: 1,
                    fontWeight: 400,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                sx={labelSx}
                fontSize={"10px"}
                fontWeight={700}
                color="text.grey"
              >
                Current Status
              </Typography>
              <TextField
                select
                fullWidth
                {...field("status")}
                inputProps={{ "aria-label": "Current status" }}
                sx={inputSx}
              >
                {STATUS_OPTIONS.map((o) => (
                  <MenuItem key={o} value={o}>
                    {o}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography
                sx={labelSx}
                fontSize={"10px"}
                fontWeight={700}
                color="text.grey"
              >
                Follow-Up Required?
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                {FOLLOW_UP_OPTIONS.map((opt) => (
                  <Box
                    key={opt}
                    component="button"
                    type="button"
                    aria-pressed={followUp === opt}
                    onClick={() => setFollowUp(opt)}
                    sx={{
                      fontFamily: "inherit",
                      flex: 1,
                      height: "56px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "16px",
                      border: "1.5px solid",
                      borderColor: followUp === opt ? "#10B981" : "#F1F5F9",
                      bgcolor: followUp === opt ? "#ECFDF5" : "#F8FAFC",
                      color: followUp === opt ? "#059669" : "#94A3B8",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      userSelect: "none",
                    }}
                  >
                    {opt}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  p: 2,
                  borderRadius: "12px",
                  bgcolor: "#EFF6FF",
                  border: "1px solid #BFDBFE",
                }}
              >
                <InfoOutlinedIcon
                  sx={{
                    color: "#3B82F6",
                    fontSize: 18,
                    flexShrink: 0,
                    mt: 0.1,
                  }}
                />
                <Typography
                  fontSize="12px"
                  color="#1D4ED8"
                  fontWeight={400}
                  sx={{ lineHeight: 1.6 }}
                >
                  By saving this report, you confirm that all information
                  provided is accurate to the best of your knowledge. This
                  report will be logged for review by the safeguarding lead.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      <Divider sx={{ borderColor: "#F1F5F9" }} />

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 3,
          bgcolor: "#fff",
        }}
      >
        <Button
          onClick={step === 0 ? handleClose : handleBack}
          startIcon={step === 0 ? null : <ChevronLeftIcon />}
          sx={{
            bgcolor: "#F1F5F9",
            color: "text.primary",
            borderRadius: "16px",
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "14px",
            "&:hover": { bgcolor: "#E2E8F0" },
          }}
        >
          {step === 0 ? "Cancel" : "Back"}
        </Button>
        <Button
          onClick={step < 2 ? handleNext : handleSubmit}
          disabled={!canContinue}
          sx={{
            "&.Mui-disabled": { bgcolor: "#BAE6FD", color: "#fff" },
            "&:hover": { bgcolor: "#0284C7" },
            bgcolor: "#0EA5E9",
            color: "#fff",
            borderRadius: "16px",
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "14px",
            boxShadow: "none",
          }}
        >
          {step < 2 ? "Continue" : "Submit Report"}
        </Button>
      </Box>
    </Dialog>
  );
}
