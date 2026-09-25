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
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ShieldAlertIcon } from "../../staffOverview/LineIcons";
import StepIndicator from "../shared/StepIndicator";
import {
  CLIENT_OPTIONS,
  PRIORITIES,
  REVIEW_CYCLES,
  TIMES_OF_DAY,
  addMonthsLabel,
  initialsOf,
} from "./carePlanData";

const steps = ["BASIC INFO", "GOALS", "ROUTINE", "RISK"];

const labelSx = {
  fontSize: "10px",
  fontWeight: 700,
  color: "text.grey",
  mb: 1,
  letterSpacing: "0.05em",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    bgcolor: "#F8FAFC",
    fontSize: "14px",
    "& fieldset": { borderColor: "#F1F5F9" },
    "&:hover fieldset": { borderColor: "#E2E8F0" },
    "&.Mui-focused fieldset": { borderColor: "#0EA5E9", borderWidth: "1px" },
  },
  "& input::placeholder, & textarea::placeholder": {
    color: "#84919A",
    opacity: 1,
  },
};

const selectSx = {
  borderRadius: "14px",
  bgcolor: "#F8FAFC",
  fontSize: "14px",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#F1F5F9" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0EA5E9",
    borderWidth: "1px",
  },
};

const RISK_ACTIVE = {
  Low: { bg: "#10B981", shadow: "rgba(16,185,129,0.3)" },
  Medium: { bg: "#F59E0B", shadow: "rgba(245,158,11,0.3)" },
  High: { bg: "#E11D48", shadow: "rgba(225,29,72,0.3)" },
};

let nextId = 1;
const newGoal = () => ({ id: nextId++, text: "", priority: "Medium" });
const newTask = () => ({ id: nextId++, title: "", time: "Morning" });

const initialForm = () => ({
  client: "",
  planName: "",
  effectiveDate: new Date().toISOString().slice(0, 10),
  reviewCycle: "6 Months",
  goals: [newGoal()],
  routine: [newTask()],
  risk: "Medium",
  riskNotes: "",
});

function SectionHeader({ title, actionLabel, onAction }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography
        fontSize="14px"
        fontWeight={700}
        color="text.primary"
        sx={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
      >
        {title}
      </Typography>
      <Button
        onClick={onAction}
        startIcon={<AddIcon sx={{ fontSize: 16 }} />}
        sx={{
          p: 0,
          minWidth: 0,
          fontSize: "12px",
          fontWeight: 700,
          color: "#2563EB",
          textTransform: "none",
          "& .MuiButton-startIcon": { mr: 0.5 },
          "&:hover": { bgcolor: "transparent", color: "#1D4ED8" },
        }}
      >
        {actionLabel}
      </Button>
    </Box>
  );
}

function RemoveButton({ label, onClick }) {
  return (
    <IconButton
      size="small"
      aria-label={label}
      onClick={onClick}
      sx={{
        color: "#CBD5E1",
        "&:hover": { color: "#EF4444", bgcolor: "#FEF2F2" },
      }}
    >
      <DeleteOutlineIcon sx={{ fontSize: 18 }} />
    </IconButton>
  );
}

export default function CreateCarePlanModal({ open, onClose, onCreate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const updateItem = (listKey, id, patch) =>
    setForm((f) => ({
      ...f,
      [listKey]: f[listKey].map((it) =>
        it.id === id ? { ...it, ...patch } : it,
      ),
    }));
  const removeItem = (listKey, id) =>
    setForm((f) => ({
      ...f,
      [listKey]: f[listKey].filter((it) => it.id !== id),
    }));

  const filledGoals = form.goals.filter((g) => g.text.trim());
  const filledTasks = form.routine.filter((t) => t.title.trim());

  // Each step needs its essentials before moving on
  const canContinue = [
    Boolean(form.client && form.effectiveDate),
    filledGoals.length > 0,
    filledTasks.length > 0,
    true,
  ][activeStep];

  const reset = () => {
    setActiveStep(0);
    setForm(initialForm());
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleCreate = () => {
    onCreate?.({
      name: form.client,
      initials: initialsOf(form.client),
      planName: form.planName.trim() || "Standard Care Plan",
      nextReview: addMonthsLabel(form.effectiveDate, form.reviewCycle),
      lastReview: "N/A",
      risk: form.risk,
      status: "ACTIVE",
      goalsList: filledGoals.map((g, i) => ({
        ...g,
        id: i + 1,
        text: g.text.trim(),
      })),
      routine: filledTasks.map((t, i) => ({
        ...t,
        id: i + 1,
        title: t.title.trim(),
      })),
      riskNotes: form.riskNotes.trim(),
    });
    reset();
  };

  const isLast = activeStep === steps.length - 1;

  const renderBasicInfo = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography sx={labelSx}>SELECT CLIENT</Typography>
        <Select
          fullWidth
          displayEmpty
          value={form.client}
          onChange={(e) => set("client")(e.target.value)}
          IconComponent={KeyboardArrowDownIcon}
          inputProps={{ "aria-label": "Select client" }}
          sx={selectSx}
          renderValue={(v) =>
            v || (
              <Typography component="span" color="#84919A" fontSize="14px">
                Choose a client...
              </Typography>
            )
          }
        >
          {CLIENT_OPTIONS.map((c) => (
            <MenuItem key={c} value={c} sx={{ fontSize: "14px" }}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography sx={labelSx}>PLAN NAME</Typography>
        <TextField
          fullWidth
          placeholder="Standard Care Plan"
          value={form.planName}
          onChange={(e) => set("planName")(e.target.value)}
          inputProps={{ "aria-label": "Plan name" }}
          sx={fieldSx}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography sx={labelSx}>EFFECTIVE DATE</Typography>
        <TextField
          fullWidth
          type="date"
          value={form.effectiveDate}
          onChange={(e) => set("effectiveDate")(e.target.value)}
          inputProps={{ "aria-label": "Effective date" }}
          sx={fieldSx}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography sx={labelSx}>REVIEW CYCLE</Typography>
        <Select
          fullWidth
          value={form.reviewCycle}
          onChange={(e) => set("reviewCycle")(e.target.value)}
          IconComponent={KeyboardArrowDownIcon}
          inputProps={{ "aria-label": "Review cycle" }}
          sx={selectSx}
        >
          {REVIEW_CYCLES.map((c) => (
            <MenuItem key={c} value={c} sx={{ fontSize: "14px" }}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );

  const renderGoals = () => (
    <Box>
      <SectionHeader
        title="Care Goals & Outcomes"
        actionLabel="Add Goal"
        onAction={() => set("goals")([...form.goals, newGoal()])}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {form.goals.map((goal, i) => (
          <Box
            key={goal.id}
            sx={{
              p: 2,
              borderRadius: "20px",
              border: "1px solid #F1F5F9",
              bgcolor: "#F8FAFC",
              display: "flex",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "10px",
                border: "1px solid #F1F5F9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                color: "#94A3B8",
                flexShrink: 0,
                bgcolor: "#fff",
              }}
            >
              {i + 1}
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                placeholder="Describe the goal (e.g. Improve mobility to walk 50m independently)"
                value={goal.text}
                onChange={(e) =>
                  updateItem("goals", goal.id, { text: e.target.value })
                }
                inputProps={{ "aria-label": `Goal ${i + 1}` }}
                sx={{
                  ...fieldSx,
                  "& .MuiOutlinedInput-root": {
                    ...fieldSx["& .MuiOutlinedInput-root"],
                    bgcolor: "#fff",
                    p: 1.75,
                  },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mt: 1.5,
                }}
              >
                <Typography fontSize="10px" fontWeight={700} color="#94A3B8">
                  PRIORITY:
                </Typography>
                <Box
                  sx={{ display: "flex", gap: 0.75 }}
                  role="radiogroup"
                  aria-label="Priority"
                >
                  {PRIORITIES.map((p) => {
                    const selected = goal.priority === p;
                    return (
                      <Box
                        key={p}
                        component="button"
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() =>
                          updateItem("goals", goal.id, { priority: p })
                        }
                        sx={{
                          px: 1.75,
                          py: 0.5,
                          border: "none",
                          borderRadius: "8px",
                          fontFamily: "inherit",
                          fontSize: "10px",
                          fontWeight: 700,
                          cursor: "pointer",
                          bgcolor: selected ? "primary.main" : "#fff",
                          color: selected ? "#fff" : "#94A3B8",
                          transition: "all 0.15s",
                        }}
                      >
                        {p}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
            {form.goals.length > 1 && (
              <RemoveButton
                label={`Remove goal ${i + 1}`}
                onClick={() => removeItem("goals", goal.id)}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );

  const renderRoutine = () => (
    <Box>
      <SectionHeader
        title="Daily Routine & Tasks"
        actionLabel="Add Task"
        onAction={() => set("routine")([...form.routine, newTask()])}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {form.routine.map((task, i) => (
          <Box
            key={task.id}
            sx={{
              p: 2,
              borderRadius: "20px",
              border: "1px solid #F1F5F9",
              bgcolor: "#F8FAFC",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <TextField
              fullWidth
              placeholder="Task title (e.g. Morning Personal Care)"
              value={task.title}
              onChange={(e) =>
                updateItem("routine", task.id, { title: e.target.value })
              }
              inputProps={{ "aria-label": `Task ${i + 1} title` }}
              sx={{
                ...fieldSx,
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  ...fieldSx["& .MuiOutlinedInput-root"],
                  bgcolor: "#fff",
                  borderRadius: "12px",
                },
              }}
            />
            <Select
              value={task.time}
              onChange={(e) =>
                updateItem("routine", task.id, { time: e.target.value })
              }
              IconComponent={KeyboardArrowDownIcon}
              inputProps={{ "aria-label": `Task ${i + 1} time of day` }}
              sx={{
                ...selectSx,
                bgcolor: "#fff",
                borderRadius: "12px",
                minWidth: 130,
                fontSize: "12px",
                fontWeight: 700,
                color: "#64748B",
              }}
            >
              {TIMES_OF_DAY.map((t) => (
                <MenuItem key={t} value={t} sx={{ fontSize: "13px" }}>
                  {t}
                </MenuItem>
              ))}
            </Select>
            {form.routine.length > 1 && (
              <RemoveButton
                label={`Remove task ${i + 1}`}
                onClick={() => removeItem("routine", task.id)}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );

  const renderRisk = () => (
    <Box>
      <Box
        sx={{
          p: 3,
          borderRadius: "20px",
          border: "1px solid #FEF08A",
          bgcolor: "#FFFBEB",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2.5,
            color: "#D97706",
          }}
        >
          <ShieldAlertIcon size={20} />
          <Typography fontSize="16px" fontWeight={700} color="#1E293B">
            Risk Assessment Summary
          </Typography>
        </Box>

        <Typography
          sx={{ ...labelSx, color: "#D97706", textTransform: "uppercase" }}
        >
          Overall Risk Level
        </Typography>
        <Box
          sx={{ display: "flex", gap: 1.25, mb: 2.5 }}
          role="radiogroup"
          aria-label="Overall risk level"
        >
          {PRIORITIES.map((level) => {
            const selected = form.risk === level;
            const active = RISK_ACTIVE[level];
            return (
              <Box
                key={level}
                component="button"
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => set("risk")(level)}
                sx={{
                  flex: 1,
                  py: 1.25,
                  border: selected ? "none" : "1px solid #F1F5F9",
                  borderRadius: "10px",
                  fontFamily: "inherit",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  bgcolor: selected ? active.bg : "#fff",
                  color: selected ? "#fff" : "#64748B",
                  boxShadow: selected
                    ? `0px 4px 10px ${active.shadow}`
                    : "none",
                  transition: "all 0.15s",
                }}
              >
                {level}
              </Box>
            );
          })}
        </Box>

        <Typography
          sx={{ ...labelSx, color: "#D97706", textTransform: "uppercase" }}
        >
          Key Risk Notes
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Identify key risks (e.g. Fall risk, dysphagia, skin integrity) and mitigation strategies..."
          value={form.riskNotes}
          onChange={(e) => set("riskNotes")(e.target.value)}
          inputProps={{ "aria-label": "Key risk notes" }}
          sx={{
            ...fieldSx,
            "& .MuiOutlinedInput-root": {
              ...fieldSx["& .MuiOutlinedInput-root"],
              bgcolor: "#fff",
              p: 1.75,
            },
          }}
        />
      </Box>

      <Box
        sx={{
          mt: 2.5,
          p: 2,
          borderRadius: "14px",
          bgcolor: "#EFF6FF",
          display: "flex",
          gap: 1.5,
          alignItems: "flex-start",
        }}
      >
        <InfoOutlinedIcon sx={{ color: "#1D4ED8", fontSize: 18, mt: 0.2 }} />
        <Typography fontSize="12px" color="#1D4ED8" sx={{ lineHeight: 1.5 }}>
          By creating this care plan, you are confirming that a full assessment
          has been completed and the proposed care is safe and appropriate for
          the client.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="create-care-plan-title"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 720,
          borderRadius: "32px",
          p: 4,
          boxShadow:
            "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        aria-label="Close"
        sx={{ position: "absolute", right: 24, top: 24, color: "#94A3B8" }}
      >
        <CloseIcon sx={{ fontSize: 20 }} />
      </IconButton>

      <Typography
        id="create-care-plan-title"
        fontSize="20px"
        fontWeight={700}
        mb={0.5}
      >
        Create New Care Plan
      </Typography>
      <Typography fontSize="12px" color="text.light" mb={3}>
        Define goals, routines, and risk mitigation for your client.
      </Typography>
      <Divider sx={{ borderColor: "#F1F5F9", mx: -4 }} />
      <StepIndicator steps={steps} activeStep={activeStep} />

      <Box sx={{ flex: 1, overflowY: "auto", mx: -4, px: 4, pt: 0.5, pb: 3 }}>
        {activeStep === 0 && renderBasicInfo()}
        {activeStep === 1 && renderGoals()}
        {activeStep === 2 && renderRoutine()}
        {activeStep === 3 && renderRisk()}
      </Box>
      <Divider sx={{ borderColor: "#F1F5F9", mx: -4 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          onClick={
            activeStep === 0 ? handleClose : () => setActiveStep((s) => s - 1)
          }
          startIcon={activeStep !== 0 ? <ChevronLeftIcon /> : null}
          sx={{
            bgcolor: "#F1F5F9",
            color: "text.light",
            borderRadius: "14px",
            px: 3.5,
            py: 1.25,
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { bgcolor: "#E2E8F0" },
          }}
        >
          {activeStep === 0 ? "Cancel" : "Back"}
        </Button>
        <Button
          onClick={isLast ? handleCreate : () => setActiveStep((s) => s + 1)}
          disabled={!canContinue}
          endIcon={!isLast ? <ChevronRightIcon /> : null}
          sx={{
            bgcolor: "#0EA5E9",
            color: "#fff",
            borderRadius: "14px",
            px: 3.5,
            py: 1.25,
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "0 6px 16px rgba(14,165,233,0.25)",
            "&:hover": { bgcolor: "#0284C7" },
            "&.Mui-disabled": {
              bgcolor: "#F1F5F9",
              color: "#94A3B8",
              boxShadow: "none",
            },
          }}
        >
          {isLast ? "Create Care Plan" : "Next"}
        </Button>
      </Box>
    </Dialog>
  );
}
