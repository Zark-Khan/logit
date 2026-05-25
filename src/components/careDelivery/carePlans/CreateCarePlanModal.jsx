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
import CheckIcon from "@mui/icons-material/Check";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const steps = ["BASIC INFO", "GOALS", "ROUTINE", "RISK"];

export default function CreateCarePlanModal({ open, onClose }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  // Common Stepper Component
  const renderStepper = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 6,
        py: 2.5,
        px: 4,
        mx: -4,
        bgcolor: "#F8FAFC",
        position: "relative",
      }}
    >
      {steps.map((label, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;

        return (
          <React.Fragment key={label}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: isCompleted
                    ? "#10B981"
                    : isActive
                      ? "#0EA5E9"
                      : "#E2E8F0",
                  color: isCompleted || isActive ? "#fff" : "#64748B",
                  fontSize: "12px",
                  fontWeight: 700,
                  boxShadow: isActive
                    ? "0px 4px 10px rgba(14, 165, 233, 0.3)"
                    : "none",
                }}
              >
                {isCompleted ? <CheckIcon sx={{ fontSize: 16 }} /> : index + 1}
              </Box>
              <Typography
                fontSize="11px"
                fontWeight={700}
                color={isActive ? "text.primary" : "#64748B"}
                sx={{ letterSpacing: "0.05em" }}
              >
                {label}
              </Typography>
            </Box>
            {index < steps.length - 1 && (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: 40, height: "1px", bgcolor: "#CBD5E1" }} />
              </Box>
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );

  const renderBasicInfo = () => (
    <Box
      sx={{
        "& input::placeholder": { color: "#84919A", opacity: 1 },
        "& .MuiSelect-select": { color: "#84919A" },
      }}
    >
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="text.grey"
            mb={1}
            sx={{ letterSpacing: "0.05em" }}
          >
            SELECT CLIENT
          </Typography>
          <TextField
            select
            fullWidth
            defaultValue=""
            SelectProps={{ displayEmpty: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                bgcolor: "#F8FAFC",
                "& fieldset": { borderColor: "#F1F5F9" },
              },
            }}
          >
            <MenuItem value="" disabled>
              Choose a client...
            </MenuItem>
            <MenuItem value="1">Arthur Morgan</MenuItem>
            <MenuItem value="2">Sadie Adler</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="text.grey"
            mb={1}
            sx={{ letterSpacing: "0.05em" }}
          >
            PLAN NAME
          </Typography>
          <TextField
            fullWidth
            placeholder="Standard Care Plan"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                bgcolor: "#F8FAFC",
                "& fieldset": { borderColor: "#F1F5F9" },
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="text.grey"
            mb={1}
            sx={{ letterSpacing: "0.05em" }}
          >
            EFFECTIVE DATE
          </Typography>
          <TextField
            fullWidth
            placeholder="03/25/2026"
            InputProps={{
              startAdornment: (
                <CalendarTodayOutlinedIcon
                  sx={{ color: "#84919A", fontSize: 18, mr: 1 }}
                />
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                bgcolor: "#F8FAFC",
                "& fieldset": { borderColor: "#F1F5F9" },
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="#94A3B8"
            mb={1}
            sx={{ letterSpacing: "0.05em" }}
          >
            REVIEW CYCLE
          </Typography>
          <TextField
            fullWidth
            placeholder="6 Months"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                bgcolor: "#F8FAFC",
                "& fieldset": { borderColor: "#F1F5F9" },
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderGoals = () => (
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
          color="text.primary"
          sx={{ letterSpacing: "0.05em" }}
        >
          CARE GOALS & OUTCOMES
        </Typography>
        <Typography
          fontSize="12px"
          fontWeight={700}
          color="#2563EB"
          sx={{ cursor: "pointer" }}
        >
          + Add Goal
        </Typography>
      </Box>

      <Box
        sx={{
          p: 2.5,
          borderRadius: "24px",
          border: "1px solid #F1F5F9",
          bgcolor: "#F8FAFC",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "12px",
              border: "1px solid #F1F5F9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "#94A3B8",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              flexShrink: 0,
              backgroundColor: "#FFFFFF",
            }}
          >
            1
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Describe the goal (e.g. Improve mobility to walk 50m independently)"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  "& fieldset": { borderColor: "#F1F5F9" },
                  p: 2,
                },
                "& textarea::placeholder": { color: "#84919A", opacity: 1 },
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              <Typography fontSize="10px" fontWeight={700} color="#94A3B8">
                PRIORITY:
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {["Low", "Medium", "High"].map((p) => (
                  <Box
                    key={p}
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: "8px",
                      fontSize: "10px",
                      fontWeight: 700,
                      cursor: "pointer",
                      bgcolor: p === "Medium" ? "primary.main" : "#ffffff",
                      color: p === "Medium" ? "#fff" : "#94A3B8",
                      transition: "all 0.2s",
                    }}
                  >
                    {p}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  const renderRoutine = () => (
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
          color="text.primary"
          sx={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
        >
          Daily Routine & Tasks
        </Typography>
        <Typography
          fontSize="12px"
          fontWeight={700}
          color="#2563EB"
          sx={{ cursor: "pointer" }}
        >
          + Add Task
        </Typography>
      </Box>

      <Box
        sx={{
          p: 2.5,
          borderRadius: "24px",
          border: "1px solid #F1F5F9",
          bgcolor: "#F8FAFC",
          display: "flex",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Task title (e.g. Morning Personal Care)"
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: "#fff",
              "& fieldset": { borderColor: "#F1F5F9" },
            },
            "& input::placeholder": { color: "#84919A", opacity: 1 },
          }}
        />
        <Box
          sx={{
            px: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            border: "1px solid #F1F5F9",
            bgcolor: "#fff",
            fontSize: "12px",
            fontWeight: 700,
            color: "#64748B",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Morning
        </Box>
      </Box>
    </Box>
  );

  const renderRisk = () => (
    <Box>
      <Box
        sx={{
          p: 3,
          borderRadius: "24px",
          border: "1px solid #FEF08A",
          bgcolor: "#FFFBEB",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <GppMaybeOutlinedIcon sx={{ color: "#D97706", fontSize: 24 }} />
          <Typography fontSize="16px" fontWeight={700} color="#1E293B">
            Risk Assessment Summary
          </Typography>
        </Box>

        <Typography
          fontSize="10px"
          fontWeight={700}
          color="#D97706"
          mb={1}
          sx={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
        >
          Overall Risk Level
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 3,
            p: 0.5,
            bgcolor: "#fff",
            borderRadius: "12px",
            border: "1px solid #F1F5F9",
          }}
        >
          {["Low", "Medium", "High"].map((level) => (
            <Box
              key={level}
              sx={{
                flex: 1,
                py: 1,
                textAlign: "center",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                bgcolor: level === "Medium" ? "#F59E0B" : "transparent",
                color: level === "Medium" ? "#fff" : "#64748B",
                boxShadow:
                  level === "Medium"
                    ? "0px 2px 4px rgba(245, 158, 11, 0.3)"
                    : "none",
                transition: "all 0.2s",
              }}
            >
              {level}
            </Box>
          ))}
        </Box>

        <Typography
          fontSize="10px"
          fontWeight={700}
          color="#D97706"
          mb={1}
          sx={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
        >
          Key Risk Notes
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Identify key risks (e.g. Fall risk, dysphagia, skin integrity) and mitigation strategies..."
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              bgcolor: "#fff",
              "& fieldset": { borderColor: "#F1F5F9" },
              p: 2,
            },
            "& textarea::placeholder": { color: "#84919A", opacity: 1 },
          }}
        />
      </Box>

      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: "16px",
          bgcolor: "#EFF6FF",
          display: "flex",
          gap: 1.5,
          alignItems: "flex-start",
        }}
      >
        <InfoOutlinedIcon sx={{ color: "#1D4ED8", fontSize: 20, mt: 0.2 }} />
        <Typography
          fontSize="12px"
          color="#1D4ED8"
          fontWeight={400}
          sx={{ lineHeight: 1.5 }}
        >
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
      onClose={onClose}
      maxWidth="md"
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
        onClick={onClose}
        sx={{ position: "absolute", right: 24, top: 24, color: "#94A3B8" }}
      >
        <CloseIcon sx={{ fontSize: 20 }} />
      </IconButton>

      <Typography
        fontSize="20px"
        fontWeight={700}
        color="text.primary"
        mb={0.5}
      >
        Create New Care Plan
      </Typography>
      <Typography fontSize="12px" color="text.light" mb={4}>
        Define goals, routines, and risk mitigation for your client.
      </Typography>
      <Divider sx={{ borderColor: "#F1F5F9", mx: -4 }} />
      {renderStepper()}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mx: -4,
          px: 4,
          pt: 1,
          pb: 3,
        }}
      >
        {activeStep === 0 && renderBasicInfo()}
        {activeStep === 1 && renderGoals()}
        {activeStep === 2 && renderRoutine()}
        {activeStep === 3 && renderRisk()}
      </Box>
      <Divider sx={{ borderColor: "#F1F5F9", mx: -4 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          onClick={activeStep === 0 ? onClose : handleBack}
          startIcon={activeStep !== 0 && <ChevronLeftIcon />}
          sx={{
            bgcolor: "#F1F5F9",
            color: "text.light",
            borderRadius: "16px",
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { bgcolor: "#E2E8F0" },
          }}
        >
          {activeStep === 0 ? "Cancel" : "Back"}
        </Button>
        <Button
          onClick={activeStep === steps.length - 1 ? onClose : handleNext}
          endIcon={activeStep !== steps.length - 1 && <ChevronRightIcon />}
          sx={{
            bgcolor: activeStep === 0 ? "#F1F5F9" : "#0EA5E9",
            color: activeStep === 0 ? "text.light" : "#fff",
            borderRadius: "16px",
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { bgcolor: activeStep === 0 ? "#E2E8F0" : "#0284C7" },
          }}
        >
          {activeStep === steps.length - 1 ? "Create Care Plan" : "Next"}
        </Button>
      </Box>
    </Dialog>
  );
}
