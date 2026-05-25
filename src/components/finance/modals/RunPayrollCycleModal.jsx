import { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckIcon from "@mui/icons-material/Check";

// Helper for the Stepper Dots
const StepDot = ({ n, active }) => (
  <Box
    sx={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: active ? "#0EA5E9" : "#FFFFFF",
      color: active ? "#fff" : "#94A3B8",
      border: active ? "none" : "1.5px solid #E2E8F0",
      fontSize: "14px",
      fontWeight: 700,
      zIndex: 2,
      transition: "all 0.2s ease-in-out",
      boxShadow: active ? "0 4px 10px rgba(14,165,233,0.3)" : "none",
    }}
  >
    {n}
  </Box>
);

const Label = ({ children }) => (
  <Typography
    fontSize="14px"
    fontWeight={700}
    color="text.primary"
    sx={{ mb: 0.75 }}
  >
    {children}
  </Typography>
);

export default function RunPayrollCycleModal({ open, onClose, onRun }) {
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const handleClose = () => {
    setStep(0);
    setConfirmed(false);
    onClose();
  };

  const handleContinue = () => {
    if (step === 2) {
      // Finished
      setStep(0);
      setConfirmed(false);
      onRun();
    } else {
      setStep((s) => s + 1);
    }
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
          borderRadius: "32px",
          boxShadow: "0 24px 48px -12px rgba(16,24,40,0.18)",
          overflow: "hidden",
          p: 0,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ px: 5, pt: 5, pb: 2, bgcolor: "#fff" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "16px",
                bgcolor: "#EFF6FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px solid #E0F2FE",
              }}
            >
              <AttachMoneyIcon sx={{ color: "#0EA5E9", fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                fontSize="20px"
                fontWeight={700}
                color="text.primary"
                sx={{ lineHeight: 1.2 }}
              >
                Run Payroll Cycle
              </Typography>
              <Typography
                fontSize="14px"
                color="text.light"
                fontWeight={400}
                sx={{ mt: 0.5 }}
              >
                Process staff payments for the current period
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              color: "text.light",
              bgcolor: "#fff",
              border: "1.5px solid #F1F5F9",
              borderRadius: "12px",
              "&:hover": { bgcolor: "#F8FAFC" },
              width: 36,
              height: 36,
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Step Dots */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 1 }}>
          <Box sx={{ position: "relative", width: "100%", maxWidth: 440 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                zIndex: 2,
                position: "relative",
              }}
            >
              {[1, 2, 3].map((n, i) => (
                <StepDot key={n} n={n} active={step >= i} />
              ))}
            </Box>
            {/* Connecting background line */}
            <Box
              sx={{
                position: "absolute",
                left: 16,
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                height: "1.5px",
                bgcolor: "#E2E8F0",
                zIndex: 1,
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Step 1: Current Pay Period */}
      {step === 0 && (
        <Box
          sx={{
            px: 5,
            pb: 5,
            pt: 3,
            bgcolor: "#fff",
            flex: 1,
            overflowY: "auto",
          }}
        >
          {/* Info Banner */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              p: 2.5,
              borderRadius: "16px",
              bgcolor: "#EFF6FF",
              border: "1px solid #DBEAFE",
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "16px",
                bgcolor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #E0F2FE",
                flexShrink: 0,
              }}
            >
              <EventNoteIcon sx={{ color: "#2563EB", fontSize: 20 }} />
            </Box>
            <Box>
              <Typography
                fontSize="14px"
                fontWeight={700}
                color="#1E3A8A"
                mb={0.5}
              >
                Current Pay Period
              </Typography>
              <Typography
                fontSize="12px"
                color="#1D4ED8"
                fontWeight={400}
                sx={{ lineHeight: 1.4 }}
              >
                The system has automatically selected the next available pay
                period based on your last run.
              </Typography>
            </Box>
          </Box>

          {/* Date Inputs */}
          <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Label
                sx={{ fontSize: 14, fontWeight: 700, color: "text.primary" }}
              >
                Period Start Date
              </Label>
              <TextField
                type="date"
                fullWidth
                defaultValue="2024-02-01"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayOutlinedIcon
                        sx={{ color: "#84919A", fontSize: 18 }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    bgcolor: "#F8FAFC",
                    "& fieldset": { borderColor: "#F8FAFC" },
                    "&:hover fieldset": { borderColor: "#CBD5E1" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0EA5E9",
                      borderWidth: "1.5px",
                    },
                  },
                  "& input": {
                    fontSize: "14px",
                    color: "text.primary",
                    fontWeight: 400,
                    py: 1.5,
                  },
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Label
                sx={{ fontSize: 14, fontWeight: 700, color: "text.primary" }}
              >
                Period End Date
              </Label>
              <TextField
                type="date"
                fullWidth
                defaultValue="2024-02-28"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayOutlinedIcon
                        sx={{ color: "#84919A", fontSize: 18 }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    bgcolor: "#F8FAFC",
                    "& fieldset": { borderColor: "#F8FAFC" },
                    "&:hover fieldset": { borderColor: "#CBD5E1" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0EA5E9",
                      borderWidth: "1.5px",
                    },
                  },
                  "& input": {
                    fontSize: "14px",
                    color: "text.primary",
                    fontWeight: 400,
                    py: 1.5,
                  },
                }}
              />
            </Box>
          </Box>

          {/* Period Statistics Box */}
          <Box
            sx={{
              p: 3,
              borderRadius: "16px",
              border: "1px solid #F1F5F9",
              bgcolor: "#FAFAF9",
            }}
          >
            <Typography
              fontSize="12px"
              fontWeight={700}
              color="#475569"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                mb: 2,
              }}
            >
              PERIOD STATISTICS
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography
                  fontSize="12px"
                  color="#64748B"
                  fontWeight={400}
                  mb={0.5}
                >
                  Staff Members
                </Typography>
                <Typography
                  fontSize="18px"
                  fontWeight={700}
                  color="text.primary"
                >
                  12
                </Typography>
              </Box>
              <Box>
                <Typography
                  fontSize="12px"
                  color="#64748B"
                  fontWeight={400}
                  mb={0.5}
                >
                  Total Hours
                </Typography>
                <Typography
                  fontSize="18px"
                  fontWeight={700}
                  color="text.primary"
                >
                  1,840h
                </Typography>
              </Box>
              <Box>
                <Typography
                  fontSize="12px"
                  color="#64748B"
                  fontWeight={400}
                  mb={0.5}
                >
                  Approved Shifts
                </Typography>
                <Typography fontSize="18px" fontWeight={700} color="#059669">
                  100%
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Step 2: Payroll Summary */}
      {step === 1 && (
        <Box
          sx={{
            px: 5,
            pb: 5,
            pt: 3,
            bgcolor: "#fff",
            flex: 1,
            overflowY: "auto",
          }}
        >
          <Typography
            fontSize="18px"
            fontWeight={700}
            color="text.primary"
            mb={3}
          >
            Payroll Summary
          </Typography>
          <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
            {/* Gross Pay Total */}
            <Box
              sx={{
                flex: 1,
                p: 3,
                borderRadius: "16px",
                border: "1px solid #F1F5F9",
                bgcolor: "#FFFFFF",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.02)",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "12px",
                    bgcolor: "#E6FBF3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AttachMoneyIcon sx={{ color: "#059669", fontSize: 16 }} />
                </Box>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  Gross Pay Total
                </Typography>
              </Box>
              <Typography
                fontSize="30px"
                fontWeight={700}
                color="text.primary"
                mb={2}
              >
                £34,250.00
              </Typography>
              <Box
                sx={{
                  height: "4px",
                  width: "100%",
                  bgcolor: "#10B981",
                  borderRadius: "2px",
                }}
              />
            </Box>

            {/* Total Deductions */}
            <Box
              sx={{
                flex: 1,
                p: 3,
                borderRadius: "16px",
                border: "1px solid #F1F5F9",
                bgcolor: "#FFFFFF",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.02)",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "12px",
                    bgcolor: "#FEF2F2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ErrorOutlineIcon sx={{ color: "#EF4444", fontSize: 16 }} />
                </Box>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  Total Deductions
                </Typography>
              </Box>
              <Typography
                fontSize="30px"
                fontWeight={700}
                color="#EF4444"
                mb={2}
              >
                £5,700.00
              </Typography>
              <Box
                sx={{
                  height: "4px",
                  width: "100%",
                  bgcolor: "#EF4444",
                  borderRadius: "2px",
                }}
              />
            </Box>
          </Box>{" "}
          {/* Breakdown Table */}
          <Box
            sx={{
              borderRadius: "24px",
              border: "1px solid #F1F5F9",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                bgcolor: "#F1F5F9",
                px: 3,
                py: 2,
                borderBottom: "1px solid #F1F5F9",
              }}
            >
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="#64748B"
                sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                BREAKDOWN
              </Typography>
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="#64748B"
                sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                AMOUNT
              </Typography>
            </Box>

            <Box sx={{ bgcolor: "#F8FAFC", p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2.5,
                }}
              >
                <Typography fontSize="14px" fontWeight={400} color="#475569">
                  Basic Pay
                </Typography>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  £28,400.00
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2.5,
                }}
              >
                <Typography fontSize="14px" fontWeight={400} color="#475569">
                  Overtime & Bonuses
                </Typography>
                <Typography fontSize="14px" fontWeight={700} color="#059669">
                  £4,250.00
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography fontSize="14px" fontWeight={400} color="#475569">
                  Allowances
                </Typography>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  £1,400.00
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid #E2E8F0",
                  pt: 3,
                }}
              >
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                  sx={{ fontStyle: "italic", textTransform: "uppercase" }}
                >
                  NET DISBURSEMENT
                </Typography>
                <Typography
                  fontSize="28px"
                  fontWeight={700}
                  color="text.primary"
                >
                  £28,450.00
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Step 3: Final Confirmation */}
      {step === 2 && (
        <Box
          sx={{
            px: 5,
            pb: 5,
            pt: 3,
            bgcolor: "#fff",
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "#FFFBEB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1.5,
              p: 3,
              boxShadow: "0px 4px 6px -4px #FEF3C7, 0px 10px 15px -3px #FEF3C7",
            }}
          >
            <ErrorOutlineIcon sx={{ color: "#F59E0B", fontSize: 40 }} />
          </Box>
          <Typography
            fontSize="24px"
            fontWeight={700}
            color="text.primary"
            mb={1}
          >
            Final Confirmation
          </Typography>
          <Typography
            fontSize="16px"
            color="#64748B"
            fontWeight={400}
            textAlign="center"
            sx={{ maxWidth: 420, mb: 4, lineHeight: 1.5 }}
          >
            You are about to process payroll for 12 staff members. This action
            will generate payslips and initiate bank transfers.
          </Typography>

          <Box
            sx={{
              bgcolor: "text.primary",
              borderRadius: "36px",
              p: 3,
              width: "100%",
              mb: 4,
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Box>
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color="#FFFFFF66"
                  letterSpacing="0.05em"
                  sx={{ textTransform: "uppercase", mb: 0.5 }}
                >
                  PAY PERIOD
                </Typography>
                <Typography fontSize="14px" fontWeight={700} color="#fff">
                  Feb 01 - Feb 28, 2024
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color="#FFFFFF66"
                  letterSpacing="0.05em"
                  sx={{ textTransform: "uppercase", mb: 0.5 }}
                >
                  STAFF COUNT
                </Typography>
                <Typography fontSize="14px" fontWeight={700} color="#fff">
                  12 Members
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ borderColor: "#FFFFFF1A", mb: 3 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Box>
                <Typography
                  fontSize="10px"
                  fontWeight={700}
                  color="#FFFFFF66"
                  letterSpacing="0.05em"
                  sx={{ textTransform: "uppercase", mb: 0.5 }}
                >
                  TOTAL PAYOUT
                </Typography>
                <Typography fontSize="36px" fontWeight={700} color="#fff">
                  £28,450.00
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: "rgba(16, 185, 129, 0.1)",
                  color: "#10B981",
                  px: 1.5,
                  py: 0.75,
                  borderRadius: "8px",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                }}
              >
                <DescriptionOutlinedIcon sx={{ fontSize: 16 }} />
                <Typography fontSize="12px" fontWeight={700}>
                  12 Payslips
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Checkbox Area */}
          <Box
            onClick={() => setConfirmed(!confirmed)}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              bgcolor: "#F8FAFC",
              p: 2,
              borderRadius: "12px",
              border: "1px solid",
              borderColor: confirmed ? "#0EA5E9" : "#F1F5F9",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: "6px",
                border: "2px solid",
                borderColor: confirmed ? "#0EA5E9" : "#CBD5E1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 0.25,
                bgcolor: confirmed ? "#0EA5E9" : "#fff",
                flexShrink: 0,
              }}
            >
              {confirmed && <CheckIcon sx={{ color: "#fff", fontSize: 14 }} />}
            </Box>
            <Typography
              fontSize="12px"
              color="text.light"
              fontWeight={400}
              sx={{ lineHeight: 1.5 }}
            >
              I confirm that I have reviewed the payroll details and authorize
              the process. I understand that this action cannot be undone.
            </Typography>
          </Box>
        </Box>
      )}

      {/* Footer controls */}
      <>
        <Divider sx={{ borderColor: "#F1F5F9", borderWidth: "0.5px" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 5,
            py: 3.5,
            bgcolor: "#fff",
          }}
        >
          <Button
            onClick={step === 0 ? handleClose : () => setStep((s) => s - 1)}
            sx={{
              bgcolor: "#F1F5F9",
              color: "#475569",
              borderRadius: "16px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              "&:hover": { bgcolor: "#E2E8F0" },
            }}
          >
            {step === 0 ? (
              "Cancel"
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <KeyboardArrowRightIcon
                  sx={{ fontSize: 18, mr: 0.5, transform: "rotate(180deg)" }}
                />
                Back
              </Box>
            )}
          </Button>
          <Button
            onClick={handleContinue}
            disabled={step === 2 && !confirmed}
            sx={{
              bgcolor: "#0EA5E9",
              color: "#fff",
              borderRadius: "16px",
              px: 4.5,
              py: 1.5,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              boxShadow: "0 4px 14px 0 rgba(14,165,233,0.39)",
              "&:hover": {
                bgcolor: "#0284C7",
                boxShadow: "0 6px 20px rgba(14,165,233,0.23)",
              },
              "&:disabled": {
                bgcolor: "#94A3B8",
                boxShadow: "none",
                color: "#F1F5F9",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {step === 2 ? "Process Payroll" : "Continue"}
              <KeyboardArrowRightIcon sx={{ fontSize: 18, ml: 0.5 }} />
            </Box>
          </Button>
        </Box>
      </>
    </Dialog>
  );
}
