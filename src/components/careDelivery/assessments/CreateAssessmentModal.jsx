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
import StepIndicator from "../shared/StepIndicator";
import {
  ASSESSMENT_TYPES,
  ASSESSORS,
  CLIENTS,
  RESPONSES,
  OUTCOME_STATUSES,
  formatDate,
} from "./assessmentData";

const steps = ["DETAILS", "QUESTIONS", "OUTCOME"];
const RISK_LEVELS = ["Low", "Medium", "High"];

const labelSx = {
  fontSize: "10px",
  fontWeight: 700,
  color: "text.grey",
  mb: 1,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
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

const whiteFieldSx = {
  ...fieldSx,
  "& .MuiOutlinedInput-root": {
    ...fieldSx["& .MuiOutlinedInput-root"],
    bgcolor: "#fff",
  },
};

const selectSx = (bg = "#F8FAFC") => ({
  borderRadius: "14px",
  bgcolor: bg,
  fontSize: "14px",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#F1F5F9" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0EA5E9",
    borderWidth: "1px",
  },
});

// Starter questions, matching the design
let nextId = 1;
const newQuestion = (question = "", answer = "Yes") => ({
  id: nextId++,
  question,
  answer,
  notes: "",
});

const initialForm = () => ({
  client: "",
  type: "",
  date: new Date().toISOString().slice(0, 10),
  assessor: "",
  questions: [
    newQuestion("Can the client walk 50m without assistance?", "Yes"),
    newQuestion("Has the client had a fall in the last 6 months?", "No"),
  ],
  risk: "Low",
  score: "",
  status: "Completed",
});

function SimpleSelect({ value, onChange, options, placeholder, label, bg }) {
  return (
    <Select
      fullWidth
      displayEmpty
      value={value}
      onChange={(e) => onChange(e.target.value)}
      IconComponent={KeyboardArrowDownIcon}
      inputProps={{ "aria-label": label }}
      sx={selectSx(bg)}
      renderValue={(v) =>
        v || (
          <Typography component="span" color="#84919A" fontSize="14px">
            {placeholder}
          </Typography>
        )
      }
    >
      {options.map((o) => (
        <MenuItem key={o} value={o} sx={{ fontSize: "14px" }}>
          {o}
        </MenuItem>
      ))}
    </Select>
  );
}

export default function CreateAssessmentModal({ open, onClose, onCreate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
  const updateQuestion = (id, patch) =>
    setForm((f) => ({
      ...f,
      questions: f.questions.map((q) => (q.id === id ? { ...q, ...patch } : q)),
    }));

  const answered = form.questions.filter((q) => q.question.trim());
  const canContinue = [
    Boolean(form.client && form.type && form.date && form.assessor),
    answered.length > 0,
    true,
  ][activeStep];
  const isLast = activeStep === steps.length - 1;

  const reset = () => {
    setActiveStep(0);
    setForm(initialForm());
  };
  const handleClose = () => {
    reset();
    onClose();
  };

  const handleComplete = () => {
    onCreate?.({
      title: form.type,
      client: form.client,
      date: formatDate(form.date),
      score: form.score.trim() || "—",
      riskLevel: `${form.risk.toUpperCase()} RISK`,
      status: form.status.toUpperCase(),
      assessedBy: form.assessor,
      details: answered.map(({ question, answer, notes }) => ({
        question: question.trim(),
        answer,
        notes: notes.trim(),
      })),
    });
    reset();
  };

  const renderDetails = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography sx={labelSx}>Select client</Typography>
        <SimpleSelect
          value={form.client}
          onChange={set("client")}
          options={CLIENTS}
          placeholder="Choose a client..."
          label="Select client"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography sx={labelSx}>Assessment type</Typography>
        <SimpleSelect
          value={form.type}
          onChange={set("type")}
          options={ASSESSMENT_TYPES}
          placeholder="Choose a type..."
          label="Assessment type"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography sx={labelSx}>Assessment date</Typography>
        <TextField
          fullWidth
          type="date"
          value={form.date}
          onChange={(e) => set("date")(e.target.value)}
          inputProps={{ "aria-label": "Assessment date" }}
          sx={fieldSx}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Typography sx={labelSx}>Assessor</Typography>
        <SimpleSelect
          value={form.assessor}
          onChange={set("assessor")}
          options={ASSESSORS}
          placeholder="Choose an assessor..."
          label="Assessor"
        />
      </Grid>
    </Grid>
  );

  const renderQuestions = () => (
    <Box>
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
          sx={{ letterSpacing: "0.05em" }}
        >
          ASSESSMENT QUESTIONS
        </Typography>
        <Button
          onClick={() => set("questions")([...form.questions, newQuestion()])}
          startIcon={<AddIcon sx={{ fontSize: 16 }} />}
          sx={{
            p: 0,
            minWidth: 0,
            fontSize: "12px",
            fontWeight: 700,
            color: "#0EA5E9",
            textTransform: "none",
            "& .MuiButton-startIcon": { mr: 0.5 },
            "&:hover": { bgcolor: "transparent", color: "#0284C7" },
          }}
        >
          Add Question
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {form.questions.map((q, i) => (
          <Box
            key={q.id}
            sx={{
              p: 2.25,
              borderRadius: "20px",
              bgcolor: "#F8FAFC",
              border: "1px solid #F1F5F9",
            }}
          >
            <Box
              sx={{ display: "flex", gap: 1.5, alignItems: "flex-end", mb: 2 }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography sx={labelSx}>Question {i + 1}</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter the question..."
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(q.id, { question: e.target.value })
                  }
                  inputProps={{ "aria-label": `Question ${i + 1}` }}
                  sx={whiteFieldSx}
                />
              </Box>
              <Box sx={{ width: 150 }}>
                <Typography sx={labelSx}>Response</Typography>
                <Select
                  fullWidth
                  size="small"
                  value={q.answer}
                  onChange={(e) =>
                    updateQuestion(q.id, { answer: e.target.value })
                  }
                  IconComponent={KeyboardArrowDownIcon}
                  inputProps={{ "aria-label": `Response to question ${i + 1}` }}
                  sx={selectSx("#fff")}
                >
                  {RESPONSES.map((r) => (
                    <MenuItem key={r} value={r} sx={{ fontSize: "14px" }}>
                      {r}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <IconButton
                aria-label={`Remove question ${i + 1}`}
                disabled={form.questions.length === 1}
                onClick={() =>
                  set("questions")(
                    form.questions.filter((item) => item.id !== q.id),
                  )
                }
                sx={{
                  color: "#EF4444",
                  mb: 0.25,
                  "&:hover": { bgcolor: "#FEF2F2" },
                }}
              >
                <DeleteOutlineIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
            <Typography sx={labelSx}>Notes / Observations</Typography>
            <TextField
              fullWidth
              multiline
              minRows={2}
              placeholder="Add any specific observations..."
              value={q.notes}
              onChange={(e) => updateQuestion(q.id, { notes: e.target.value })}
              inputProps={{ "aria-label": `Notes for question ${i + 1}` }}
              sx={{
                ...whiteFieldSx,
                "& .MuiOutlinedInput-root": {
                  ...whiteFieldSx["& .MuiOutlinedInput-root"],
                  p: 1.5,
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );

  const renderOutcome = () => (
    <Box>
      <Box
        sx={{
          p: 2.5,
          borderRadius: "20px",
          bgcolor: "#F8FAFC",
          border: "1px solid #F1F5F9",
        }}
      >
        <Typography sx={labelSx}>Risk level outcome</Typography>
        <Box
          sx={{ display: "flex", gap: 1.25, mb: 2.5 }}
          role="radiogroup"
          aria-label="Risk level outcome"
        >
          {RISK_LEVELS.map((level) => {
            const selected = form.risk === level;
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
                  border: "none",
                  borderRadius: "12px",
                  fontFamily: "inherit",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  bgcolor: selected ? "#0EA5E9" : "#fff",
                  color: selected ? "#fff" : "text.primary",
                  boxShadow: selected
                    ? "0 4px 10px rgba(14,165,233,0.3)"
                    : "none",
                  transition: "all 0.15s",
                }}
              >
                {level}
              </Box>
            );
          })}
        </Box>

        <Typography sx={labelSx}>Outcome score / summary</Typography>
        <TextField
          fullWidth
          placeholder="e.g. 18/30 - Moderate Risk"
          value={form.score}
          onChange={(e) => set("score")(e.target.value)}
          inputProps={{ "aria-label": "Outcome score or summary" }}
          sx={{ ...whiteFieldSx, mb: 2.5 }}
        />

        <Typography sx={labelSx}>Status</Typography>
        <SimpleSelect
          value={form.status}
          onChange={set("status")}
          options={OUTCOME_STATUSES}
          label="Status"
          bg="#fff"
        />
      </Box>

      <Box
        sx={{
          mt: 2.5,
          p: 2,
          borderRadius: "14px",
          bgcolor: "#EFF6FF",
          border: "1px solid #DBEAFE",
          display: "flex",
          gap: 1.5,
          alignItems: "flex-start",
        }}
      >
        <InfoOutlinedIcon sx={{ color: "#1D4ED8", fontSize: 18, mt: 0.2 }} />
        <Typography fontSize="12px" color="#1D4ED8" sx={{ lineHeight: 1.5 }}>
          Assessments should be reviewed regularly. A high risk outcome will
          automatically flag this client for immediate care plan review.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="new-assessment-title"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 680,
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
        id="new-assessment-title"
        fontSize="20px"
        fontWeight={700}
        mb={0.5}
      >
        New Assessment
      </Typography>
      <Typography fontSize="12px" color="text.light" mb={3}>
        Complete professional assessment for client care needs.
      </Typography>
      <Divider sx={{ borderColor: "#F1F5F9", mx: -4 }} />
      <StepIndicator steps={steps} activeStep={activeStep} />

      <Box sx={{ flex: 1, overflowY: "auto", mx: -4, px: 4, pt: 0.5, pb: 3 }}>
        {activeStep === 0 && renderDetails()}
        {activeStep === 1 && renderQuestions()}
        {activeStep === 2 && renderOutcome()}
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
            color: "text.primary",
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
          onClick={isLast ? handleComplete : () => setActiveStep((s) => s + 1)}
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
          {isLast ? "Complete Assessment" : "Next"}
        </Button>
      </Box>
    </Dialog>
  );
}
