import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function AddMedicationForm({ onBack }) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Add a medication
          </Typography>
          <Typography fontSize="14px" color="text.light" sx={{ mt: 0.3 }}>
            Create a schedule to match Margaret Hall's prescription.
          </Typography>
        </Box>
        <Box
          onClick={onBack}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "primary.main",
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          <Typography fontSize="14px" fontWeight={700}>
            Back to Medication
          </Typography>
        </Box>
      </Box>

      {/* Medication Selection Card */}
      <Paper
        elevation={0}
        sx={{ p: 3, borderRadius: "20px", border: "1px solid #CBD5E1", mb: 3 }}
      >
        <Typography
          fontSize="10px"
          fontWeight={800}
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          MEDICATION
        </Typography>
        <Typography fontWeight={800} fontSize="18px" color="text.primary">
          Paracetamol 500mg tablets
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 1,
            color: "text.secondary",
            cursor: "pointer",
          }}
        >
          <Typography fontSize="12px" fontWeight={700}>
            Additional information
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
        </Box>
      </Paper>

      {/* Main Form Container */}
      <Paper
        elevation={0}
        sx={{
          px: 4,
          py:2,
          borderRadius: "24px",
          border: "1px solid #CBD5E1",
          bgcolor: "#fff",
          mb: 2,
        }}
      >
        {/* Support Question */}
        <Box sx={{ mb: 4 }}>
          <Typography fontWeight={700} fontSize="14px" sx={{ mb: 2 }}>
            What support is required with this medication? *
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            {["Administer", "Assist", "Prompt"].map((label) => (
              <Button
                key={label}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  py: 1,
                  borderRadius: "12px",
                  px: 4,
                  borderColor: label === "Assist" ? "primary.main" : "#CBD5E1",
                  bgcolor: label === "Assist" ? "#F0F9FF" : "#fff",
                  color: label === "Assist" ? "primary.main" : "text.primary",
                  fontWeight: 700,
                  fontSize: "14px",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "rgba(14, 165, 233, 0.05)",
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              mt: 2.5,
              bgcolor: "#F8FAFC",
              borderRadius: "12px",
              p: 1.8,
              display: "flex",
              gap: 1.5,
              border: "1px solid #CBD5E1",
            }}
          >
            <InfoOutlinedIcon
              sx={{ fontSize: 18, color: "#64748B", mt: 0.1 }}
            />
            <Typography
              fontSize="11px"
              color="#64748B"
              sx={{ lineHeight: 1.5 }}
            >
              If you're unsure, we recommend reading the{" "}
              <Box
                component="span"
                sx={{
                  color: "primary.main",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                CQC's guidance
              </Box>{" "}
              on medicines support.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Accordion Style Sections */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormSection label="Type" value="Scheduled" />
          <FormSection label="Dose" value="2 oral tablets" />
          <FormSection label="Route" value="Oral" />
          <FormSection label="Frequency" value="2 times a day" />
          <FormSection label="When" value="10am, 8pm" />
          <FormSection
            label="From"
            value="Wednesday 25th Feb - Wednesday 25th Feb"
          />
          <FormSection
            label="Past administrations"
            value="0 past administrations recorded"
          />
          <FormSection label="Notes (optional)" value="Additional instructions" />
          <FormSection
            label="Are the above details correct?"
            value="Select an option"
            isLast
          />
        </Box>

        <Button
          variant="contained"
          sx={{
            mt: 5,
            py: 1,
            borderRadius: "14px",
            fontWeight: 700,
            fontSize: "16px",
            background: "main.primary",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(14, 165, 233, 0.25)",
            color:"#ffffff"
          }}
          onClick={onBack}
        >
          Save changes
        </Button>
    </Box>
  );
}

function FormSection({ label, value, isLast }) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: "16px",
        border: "1px solid #CBD5E1",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        bgcolor: "#ffffff",
      }}
    >
      <Box>
        <Typography
          fontSize="11px"
          fontWeight={800}
          color="text.primary"
          sx={{ mb: 0.5, textTransform: "uppercase" }}
        >
          {label} *
        </Typography>
        <Typography fontSize="14px" fontWeight={500} color="text.light">
          {value}
        </Typography>
      </Box>
      <KeyboardArrowDownIcon sx={{ color: "#64748B" }} />
    </Box>
  );
}
