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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const steps = ["DETAILS", "QUESTIONS", "OUTCOME"];

export default function CreateAssessmentModal({ open, onClose }) {
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

  const renderDetails = () => (
    <Box sx={{ "& input::placeholder": { color: "#84919A", opacity: 1 }, "& .MuiSelect-select": { color: "#84919A" } }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="#64748B"
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
                "& fieldset": { border: "none" },
              },
            }}
          >
            <MenuItem value="" disabled>
              Arthur Morgan
            </MenuItem>
            <MenuItem value="1">Arthur Morgan</MenuItem>
            <MenuItem value="2">Sadie Adler</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="#64748B"
            mb={1}
            sx={{ letterSpacing: "0.05em" }}
          >
            ASSESSMENT TYPE
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
                "& fieldset": { border: "none" },
              },
            }}
          >
            <MenuItem value="" disabled>
              Nutrition Assessment
            </MenuItem>
            <MenuItem value="1">Mobility Assessment</MenuItem>
            <MenuItem value="2">Falls Risk Assessment</MenuItem>
            <MenuItem value="3">Nutrition Assessment</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="#64748B"
            mb={1}
            sx={{ letterSpacing: "0.05em" }}
          >
            ASSESSMENT DATE
          </Typography>
          <TextField
            fullWidth
            placeholder="03/26/2026"
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
                "& fieldset": { border: "none" },
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography
            fontSize="10px"
            fontWeight={700}
            color="#64748B"
            mb={1}
            sx={{ letterSpacing: "0.05em" }}
          >
            ASSESSOR
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
                "& fieldset": { border: "none" },
              },
            }}
          >
            <MenuItem value="" disabled>
              Sarah Thompson
            </MenuItem>
            <MenuItem value="1">Sarah Thompson</MenuItem>
            <MenuItem value="2">Emily Davis</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );

  const renderQuestions = () => (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography fontSize="14px" fontWeight={800} color="text.primary" sx={{ letterSpacing: "0.05em" }}>
          ASSESSMENT QUESTIONS
        </Typography>
        <Typography fontSize="13px" fontWeight={700} color="#0EA5E9" sx={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 0.5 }}>
          + Add Question
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {[
          {
            qNum: 1,
            qText: "Can the client walk 50m without assistance?",
            response: "Yes",
            placeholder: "Add any specific observations..."
          },
          {
            qNum: 2,
            qText: "Has the client had a fall in the last 6 months?",
            response: "No",
            placeholder: "Add any specific observations..."
          }
        ].map((item) => (
          <Box
            key={item.qNum}
            sx={{
              p: 3,
              borderRadius: "24px",
              bgcolor: "#F8FAFC",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", mb: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Typography fontSize="10px" fontWeight={800} color="#64748B" sx={{ mb: 1, letterSpacing: "0.05em" }}>
                  QUESTION {item.qNum}
                </Typography>
                <TextField
                  fullWidth
                  placeholder={item.qText}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      bgcolor: "#fff",
                      "& fieldset": { border: "none" },
                    },
                    "& input::placeholder": { color: "#94A3B8", opacity: 1, fontWeight: 500 },
                  }}
                />
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <Typography fontSize="10px" fontWeight={800} color="#64748B" sx={{ mb: 1, letterSpacing: "0.05em" }}>
                  RESPONSE
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <TextField
                    fullWidth
                    placeholder={item.response}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        bgcolor: "#fff",
                        "& fieldset": { border: "none" },
                      },
                      "& input::placeholder": { color: "#94A3B8", opacity: 1, fontWeight: 500 },
                    }}
                  />
                  <IconButton size="small" sx={{ color: "#EF4444" }}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography fontSize="10px" fontWeight={800} color="#64748B" sx={{ mb: 1, letterSpacing: "0.05em" }}>
                NOTES / OBSERVATIONS
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder={item.placeholder}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    bgcolor: "#fff",
                    "& fieldset": { border: "none" },
                  },
                  "& textarea::placeholder": { color: "#94A3B8", opacity: 1, fontWeight: 500 },
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );

  const renderOutcome = () => (
    <Box>
      <Box
        sx={{
          p: 4,
          borderRadius: "24px",
          bgcolor: "#F8FAFC",
          mb: 4,
          border: "1px solid #F1F5F9",
        }}
      >
        <Typography fontSize="10px" fontWeight={800} color="#64748B" sx={{ mb: 1.5, letterSpacing: "0.05em" }}>
          RISK LEVEL OUTCOME
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
          }}
        >
          {["Low", "Medium", "High"].map((level) => (
            <Box
              key={level}
              sx={{
                flex: 1,
                py: 1.5,
                textAlign: "center",
                borderRadius: "16px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                bgcolor: level === "Low" ? "#0EA5E9" : "#fff",
                color: level === "Low" ? "#fff" : "text.primary",
                boxShadow: level === "Low" ? "0px 4px 12px rgba(14, 165, 233, 0.2)" : "0px 2px 4px rgba(0,0,0,0.02)",
                transition: "all 0.2s",
              }}
            >
              {level}
            </Box>
          ))}
        </Box>

        <Typography fontSize="10px" fontWeight={800} color="#64748B" sx={{ mb: 1, letterSpacing: "0.05em" }}>
          OUTCOME SCORE / SUMMARY
        </Typography>
        <TextField
          fullWidth
          placeholder="e.g. 18/30 - Moderate Risk"
          sx={{
            mb: 4,
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              bgcolor: "#fff",
              "& fieldset": { borderColor: "#F1F5F9" },
            },
            "& input::placeholder": { color: "#94A3B8", opacity: 1, fontWeight: 500 },
          }}
        />

        <Typography fontSize="10px" fontWeight={800} color="#64748B" sx={{ mb: 1, letterSpacing: "0.05em" }}>
          STATUS
        </Typography>
        <TextField
          fullWidth
          placeholder="Completed"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              bgcolor: "#fff",
              "& fieldset": { borderColor: "#F1F5F9" },
            },
            "& input::placeholder": { color: "#94A3B8", opacity: 1, fontWeight: 500 },
          }}
        />
      </Box>

      <Box
        sx={{
          p: 2.5,
          borderRadius: "16px",
          bgcolor: "#F0F9FF",
          border: "1px solid #BAE6FD",
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
        }}
      >
        <InfoOutlinedIcon sx={{ color: "#0EA5E9", fontSize: 20, mt: 0.2 }} />
        <Typography fontSize="13px" color="#0EA5E9" fontWeight={500} sx={{ lineHeight: 1.6 }}>
          Assessments should be reviewed regularly. A high risk outcome will automatically flag this client for immediate care plan review.
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
        New Assessment
      </Typography>
      <Typography fontSize="12px" color="text.light" mb={4}>
        Complete professional assessment for client care needs.
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
        {activeStep === 0 && renderDetails()}
        {activeStep === 1 && renderQuestions()}
        {activeStep === 2 && renderOutcome()}
      </Box>
      <Divider sx={{ borderColor: "#F1F5F9", mx: -4 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          onClick={activeStep === 0 ? onClose : handleBack}
          startIcon={activeStep !== 0 && <ChevronLeftIcon />}
          sx={{
            bgcolor: "#F1F5F9",
            color: "text.primary",
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
            bgcolor: "#0EA5E9",
            color: "#fff",
            borderRadius: "16px",
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { bgcolor: "#0284C7" },
          }}
        >
          {activeStep === steps.length - 1 ? "Complete Assessment" : "Next"}
        </Button>
      </Box>
    </Dialog>
  );
}
