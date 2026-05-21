import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CLIENTS = [
  {
    name: "Arthur Morgan",
    sub: "Private Funding · ID: CL-2094",
    color: "#0EA5E9",
  },
  {
    name: "Sadie Adler",
    sub: "Private Funding · ID: CL-2094",
    color: "#E11D48",
  },
  {
    name: "John Marston",
    sub: "Private Funding · ID: CL-2094",
    color: "#D97706",
  },
];

const StepDot = ({ n, active, done }) => (
  <Box
    sx={{
      width: 32,
      height: 32,
      borderRadius: "50%",
      bgcolor: done ? "#059669" : active ? "#0EA5E9" : "#F1F5F9",
      color: done || active ? "#fff" : "#94A3B8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "13px",
      fontWeight: 800,
    }}
  >
    {done ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : n}
  </Box>
);

export default function CreateInvoiceModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleClose = () => {
    setStep(0);
    setSelectedClient(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 520,
          borderRadius: "24px",
          boxShadow: "0 24px 48px -12px rgba(16,24,40,0.18)",
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ px: 3, pt: 3, pb: 2, bgcolor: "#fff" }}>
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
                width: 44,
                height: 44,
                borderRadius: "14px",
                bgcolor: "#E0F5FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddIcon sx={{ color: "#0EA5E9", fontSize: 22 }} />
            </Box>
            <Box>
              <Typography fontSize="18px" fontWeight={700} color="text.primary">
                Create New Invoice
              </Typography>
              <Typography fontSize="12px" color="#64748B" fontWeight={500}>
                Manually generate an invoice for a client
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{ color: "#94A3B8" }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* Step dots */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2.5 }}>
          {[1, 2, 3].map((n, i) => (
            <React.Fragment key={n}>
              <StepDot n={n} active={step === i} done={step > i} />
              {i < 2 && (
                <Box
                  sx={{
                    flex: 1,
                    height: "2px",
                    bgcolor: step > i ? "#059669" : "#F1F5F9",
                    borderRadius: 1,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#F1F5F9" }} />

      {/* Step 1: Select Client */}
      {step === 0 && (
        <Box sx={{ p: 3, backgroundColor: "#fff" }}>
          <Typography
            fontSize="14px"
            fontWeight={700}
            color="text.primary"
            mb={2}
          >
            Select Client
          </Typography>
          <TextField
            fullWidth
            placeholder="Search for a client..."
            size="small"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                bgcolor: "#F8FAFC",
                "& fieldset": { borderColor: "#F1F5F9" },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#94A3B8", fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {CLIENTS.map((c) => (
              <Box
                key={c.name}
                onClick={() => setSelectedClient(c)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: "14px",
                  border: "1.5px solid",
                  borderColor:
                    selectedClient?.name === c.name ? "#0EA5E9" : "#F1F5F9",
                  bgcolor: selectedClient?.name === c.name ? "#E0F5FF" : "#fff",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      bgcolor: c.color + "20",
                      color: c.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 800,
                    }}
                  >
                    {c.name[0]}
                  </Box>
                  <Box>
                    <Typography
                      fontSize="13px"
                      fontWeight={700}
                      color="text.primary"
                    >
                      {c.name}
                    </Typography>
                    <Typography
                      fontSize="11px"
                      color="#94A3B8"
                      fontWeight={500}
                    >
                      {c.sub}
                    </Typography>
                  </Box>
                </Box>
                <KeyboardArrowRightIcon
                  sx={{
                    color:
                      selectedClient?.name === c.name ? "#0EA5E9" : "#CBD5E1",
                    fontSize: 20,
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Step 2: Service Lines (simplified) */}
      {step === 1 && (
        <Box sx={{ p: 3, backgroundColor: "#fff" }}>
          <Typography
            fontSize="14px"
            fontWeight={700}
            color="text.primary"
            mb={2}
          >
            Invoice Details
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="#64748B"
                mb={0.75}
                sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                Billing Period
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  type="date"
                  size="small"
                  defaultValue="2024-03-01"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      bgcolor: "#F8FAFC",
                      "& fieldset": { borderColor: "#F1F5F9" },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  type="date"
                  size="small"
                  defaultValue="2024-03-31"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      bgcolor: "#F8FAFC",
                      "& fieldset": { borderColor: "#F1F5F9" },
                    },
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="#64748B"
                mb={0.75}
                sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                Payment Method
              </Typography>
              <TextField
                fullWidth
                select
                size="small"
                defaultValue="direct"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#F8FAFC",
                    "& fieldset": { borderColor: "#F1F5F9" },
                  },
                }}
              >
                <option value="direct">Direct Debit</option>
              </TextField>
            </Box>
            <Box>
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="#64748B"
                mb={0.75}
                sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                Funding Source
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="e.g. Private Funding"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#F8FAFC",
                    "& fieldset": { borderColor: "#F1F5F9" },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      )}

      {/* Step 3: Summary */}
      {step === 2 && (
        <Box sx={{ p: 3, backgroundColor: "#fff" }}>
          <Typography
            fontSize="14px"
            fontWeight={700}
            color="text.primary"
            mb={2}
          >
            Review &amp; Confirm
          </Typography>
          <Box
            sx={{
              p: 2.5,
              borderRadius: "14px",
              border: "1px solid #F1F5F9",
              bgcolor: "#F8FAFC",
              mb: 2,
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography fontSize="12px" color="#64748B" fontWeight={500}>
                Client
              </Typography>
              <Typography fontSize="12px" fontWeight={700} color="text.primary">
                {selectedClient?.name}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography fontSize="12px" color="#64748B" fontWeight={500}>
                Period
              </Typography>
              <Typography fontSize="12px" fontWeight={700} color="text.primary">
                Mar 01 – Mar 31, 2024
              </Typography>
            </Box>
            <Divider sx={{ my: 1.5, borderColor: "#F1F5F9" }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontSize="13px" fontWeight={700} color="text.primary">
                Total
              </Typography>
              <Typography fontSize="14px" fontWeight={800} color="#059669">
                £1,250.00
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      <Divider sx={{ borderColor: "#F1F5F9" }} />

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
            bgcolor: "#F1F5F9",
            color: "#334155",
            borderRadius: "14px",
            px: 3.5,
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
          onClick={step < 2 ? () => setStep((s) => s + 1) : handleClose}
          disabled={step === 0 && !selectedClient}
          sx={{
            bgcolor: "#0EA5E9",
            color: "#fff",
            borderRadius: "14px",
            px: 3.5,
            py: 1.5,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "14px",
            boxShadow: "none",
            "&:hover": { bgcolor: "#0284C7" },
            "&:disabled": { bgcolor: "#E2E8F0", color: "#94A3B8" },
          }}
        >
          {step < 2 ? "Continue →" : "Create Invoice"}
        </Button>
      </Box>
    </Dialog>
  );
}
