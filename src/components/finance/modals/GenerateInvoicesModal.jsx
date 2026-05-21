import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CLIENTS = [
  { name: "Arthur Morgan", hours: "32.5h" },
  { name: "Sadie Adler", hours: "32.5h" },
  { name: "John Marston", hours: "32.5h" },
  { name: "Charles Smith", hours: "32.5h" },
];

// ── Step indicator matching the design ────────────────────────────────────────
const StepDot = ({ n, active, done }) => (
  <Box
    sx={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      bgcolor: active || done ? "#0EA5E9" : "transparent",
      border: active || done ? "none" : "1px solid #F1F5F9",
      color: active || done ? "#fff" : "#94A3B8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: 700,
      flexShrink: 0,
    }}
  >
    {n}
  </Box>
);

const btnBase = {
  borderRadius: "16px",
  px: 3.5,
  py: 1.25,
  textTransform: "none",
  fontWeight: 700,
  fontSize: "14px",
  boxShadow: "none",
};

export default function GenerateInvoicesModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setStep(0);
    setSuccess(false);
    onClose();
  };
  const handleNext = () => {
    if (step === 2) {
      setSuccess(true);
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
          borderRadius: "24px",
          boxShadow: "0 24px 48px -12px rgba(16,24,40,0.18)",
          overflow: "hidden",
        },
      }}
    >
      {success ? (
        /* ── Success State ── */
        <Box sx={{ p: 4, textAlign: "center", bgcolor: "#fff" }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "#D1FAE5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2.5,
            }}
          >
            <CheckCircleIcon sx={{ color: "#059669", fontSize: 36 }} />
          </Box>
          <Typography
            fontSize="24px"
            fontWeight={700}
            color="text.primary"
            mb={1}
          >
            Invoices Generated!
          </Typography>
          <Typography
            fontSize="16px"
            color="text.grey"
            fontWeight={500}
            sx={{ lineHeight: 1.7, mb: 3 }}
          >
            12 invoices have now been generated and are ready to invoice.
          </Typography>
          <Box
            sx={{
              p: 2,
              borderRadius: "14px",
              bgcolor: "#F8FAFC",
              border: "1px solid #F1F5F9",
              mb: 3,
              display: "flex",
              flexDirection:"column",
              gap:2 ,
            }}
          >
            <Box sx={{display:"flex",justifyContent: "space-between",}}>
            <Typography fontSize="14px" color="text.grey" fontWeight={500}>
              Total amount
            </Typography>
            <Typography fontSize="14px" fontWeight={700} color="text.primary">
              £14,250.00
            </Typography>
          </Box>
                     <Box sx={{display:"flex",justifyContent: "space-between",}}>

            <Typography fontSize="14px" color="text.grey" fontWeight={500}>
              Period
            </Typography>
            <Typography fontSize="14px" fontWeight={700} color="text.primary">
              Mar 01 – Mar 15, 2024
            </Typography>
          </Box>
          </Box>
          <Button
            onClick={handleClose}
            fullWidth
            sx={{
              bgcolor: "#0EA5E9",
              color: "#fff",
              borderRadius: "16px",
              px: 3.5,
              py: 1.5,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "16px",
              boxShadow: "none",
            }}
          >
            Go to Invoices
          </Button>
        </Box>
      ) : (
        <>
          {/* ── Header ── */}
          <Box sx={{ px: 3, pt: 3, pb: 2.5, bgcolor: "#fff" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "16px",
                    bgcolor: "#EFF6FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AddIcon sx={{ color: "#0EA5E9", fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography
                    fontSize="20px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    Generate Invoices
                  </Typography>
                  <Typography
                    fontSize="14px"
                    color="text.light"
                    fontWeight={400}
                  >
                    Create billing records for the current period
                  </Typography>
                </Box>
              </Box>
              <IconButton
                size="small"
                onClick={handleClose}
                sx={{ color: "text.grey" }}
              >
                <CloseIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>

            {/* Step Dots */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {[1, 2, 3].map((n, i) => (
                <React.Fragment key={n}>
                  <StepDot n={n} active={step === i} done={step > i} />

                  {i < 2 && (
                    <Box
                      sx={{
                        width: 180, // fixed width instead of flex: 1
                        height: "2px",
                        bgcolor: "#F1F5F9",
                        mx: 0.5,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Box>

          {/* ── Step 1: Billing Period + Summary Preview ── */}
          {step === 0 && (
            <Box sx={{ p: 4, bgcolor: "#fff" }}>
              {/* Billing Period header */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <CalendarTodayOutlinedIcon
                  sx={{ color: "#0EA5E9", fontSize: 16 }}
                />
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                >
                  Billing Period
                </Typography>
              </Box>

              {/* Date display boxes */}
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: "12px",
                    border: "1px solid #F1F5F9",
                    bgcolor: "#F8FAFC",
                  }}
                >
                  <Typography
                    fontSize="10px"
                    fontWeight={700}
                    color="#94A3B8"
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      mb: 0.5,
                    }}
                  >
                    Start Date
                  </Typography>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    Mar 01, 2024
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: "12px",
                    border: "1px solid #F1F5F9",
                    bgcolor: "#F8FAFC",
                  }}
                >
                  <Typography
                    fontSize="10px"
                    fontWeight={700}
                    color="#94A3B8"
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      mb: 0.5,
                    }}
                  >
                    End Date
                  </Typography>
                  <Typography
                    fontSize="14px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    Mar 15, 2024
                  </Typography>
                </Box>
              </Box>

              {/* Summary Preview */}
              <Box
                sx={{
                  borderRadius: "14px",
                  border: "1px solid #C4ECFF",
                  overflow: "hidden",
                  bgcolor: "#E0F2FE45",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2.5,
                    py: 1.75,
                  }}
                >
                  <Typography
                    fontSize="16px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    Summary Preview
                  </Typography>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.4,
                      borderRadius: "20px",
                      bgcolor: "#DBEAFE",
                      color: "#2563EB",
                      fontSize: "10px",
                      fontWeight: 700,
                    }}
                  >
                    12 CLIENTS FOUND
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: 2.5,
                    py: 1.75,
                  }}
                >
                  <Typography fontSize="14px" color="#64748B" fontWeight={500}>
                    Total Billable Hours
                  </Typography>
                  <Typography fontSize="18px" fontWeight={700} color="#0EA5E9">
                    428.5h
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: 2.5,
                    py: 1.75,
                  }}
                >
                  <Typography fontSize="14px" color="#64748B" fontWeight={500}>
                    Estimated Revenue
                  </Typography>
                  <Typography fontSize="18px" fontWeight={700} color="#0EA5E9">
                    £14,250.00
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {/* ── Step 2: Client Name / Hours Table ── */}
          {step === 1 && (
            <Box sx={{ bgcolor: "#fff", p: 4 }}>
              {/* Table Header */}
              <Box sx={{ border: "1px solid #F1F5F9", borderRadius: "16px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: 3,
                    py: 1.75,
                    bgcolor: "#F8FAFC",
                    borderBottom: "1px solid #F1F5F9",
                  }}
                >
                  <Typography
                    fontSize="12px"
                    fontWeight={700}
                    color="text.grey"
                    sx={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
                  >
                    Client Name
                  </Typography>
                  <Typography
                    fontSize="12px"
                    fontWeight={700}
                    color="text.grey"
                    sx={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
                  >
                    Hours
                  </Typography>
                </Box>
                {CLIENTS.map((c, i) => (
                  <Box
                    key={c.name}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 3,
                      py: 2,
                    }}
                  >
                    <Typography
                      fontSize="14px"
                      fontWeight={500}
                      color="text.primary"
                    >
                      {c.name}
                    </Typography>
                    <Typography
                      fontSize="14px"
                      fontWeight={700}
                      color="text.primary"
                    >
                      {c.hours}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ pb: 1 }} />
            </Box>
          )}

          {/* ── Step 3: Ready to Generate ── */}
          {step === 2 && (
            <Box sx={{ p: 4, bgcolor: "#fff", textAlign: "center" }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "#EFF6FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                }}
              >
                <DescriptionOutlinedIcon
                  sx={{ color: "#0EA5E9", fontSize: 34 }}
                />
              </Box>
              <Typography
                fontSize="20px"
                fontWeight={700}
                color="text.primary"
                mb={1.5}
              >
                Ready to Generate
              </Typography>
              <Typography
                fontSize="16px"
                color="text.light"
                fontWeight={400}
                sx={{ lineHeight: 1.8, maxWidth: 340, mx: "auto" }}
              >
                You are about to generate 12 invoices for the period of Mar 01 -
                Mar 15, 2024.
              </Typography>
            </Box>
          )}

          <Divider sx={{ borderColor: "#F1F5F9" }} />

          {/* ── Footer ── */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 3,
              py: 2.5,
              bgcolor: "#fff",
            }}
          >
            <Button
              onClick={step === 0 ? handleClose : () => setStep((s) => s - 1)}
              sx={{
                ...btnBase,
                bgcolor: "#F1F5F9",
                color: "#334155",
              }}
            >
              {step === 0 ? (
                "Cancel"
              ) : (
                <>
                  <KeyboardArrowRightIcon
                    sx={{ fontSize: 16, mr: 0.5, transform: "rotate(180deg)" }}
                  />{" "}
                  Back
                </>
              )}
            </Button>
            <Button
              onClick={handleNext}
              sx={{
                ...btnBase,
                background: "linear-gradient(135deg,#0EA5E9,#38BDF8)",
                color: "#fff",
              }}
            >
              {step === 2 ? "Generate Invoices" : "Continue"}
              <KeyboardArrowRightIcon sx={{ fontSize: 16, ml: 0.5 }} />
            </Button>
          </Box>
        </>
      )}
    </Dialog>
  );
}
