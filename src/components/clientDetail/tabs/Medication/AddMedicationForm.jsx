import React, { useState } from "react";
import { Box, Typography, Button, Paper, Collapse } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MedicationViewHeader from "./MedicationViewHeader";
import { SCHEDULED_MEDICATION } from "./medicationData";

const cardSx = {
  borderRadius: "16px",
  border: "1px solid #E2E8F0",
  bgcolor: "#fff",
};

const SUPPORT_OPTIONS = ["Administer", "Assist", "Prompt"];

const FORM_SECTIONS = [
  { label: "Type", value: "Scheduled", required: true },
  { label: "Dose", value: "2 oral tablets", required: true },
  { label: "Route", value: "Oral", required: true },
  { label: "Frequency", value: "2 times a day", required: true },
  { label: "When", value: "10am, 8pm", required: true },
  {
    label: "From",
    value: "Wednesday 25th Feb - Wednesday 25th Feb",
    required: true,
  },
  {
    label: "Past administrations",
    value: "0 past administrations recorded",
    required: true,
  },
  { label: "Notes (optional)", value: "Additional instructions" },
  { label: "Are the above details correct?" },
];

function Required() {
  return (
    <Box component="span" sx={{ color: "#EF4444" }}>
      {" "}
      *
    </Box>
  );
}

function FormSection({ label, value, required }) {
  return (
    <Box
      sx={{
        ...cardSx,
        px: 2.5,
        py: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": { borderColor: "#CBD5E1" },
      }}
    >
      <Box>
        <Typography fontSize="11px" fontWeight={700} color="text.primary">
          {label}
          {required && <Required />}
        </Typography>
        {value && (
          <Typography
            fontSize="12px"
            fontWeight={500}
            color="text.secondary"
            sx={{ mt: 0.4 }}
          >
            {value}
          </Typography>
        )}
      </Box>
      <KeyboardArrowDownIcon sx={{ color: "text.light", fontSize: 20 }} />
    </Box>
  );
}

export default function AddMedicationForm({ client, medication, onBack }) {
  const [support, setSupport] = useState("Assist");
  const [supportOpen, setSupportOpen] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const medicationName = medication || SCHEDULED_MEDICATION.name;

  return (
    <Box>
      <MedicationViewHeader
        title="Add a medication"
        subtitle={`Create a schedule to match ${client.name}'s prescription.`}
        onBack={onBack}
      />

      {/* Medication Selection Card */}
      <Paper elevation={0} sx={{ ...cardSx, px: 2.5, py: 2, mb: 2 }}>
        <Typography
          fontSize="9px"
          fontWeight={700}
          color="text.secondary"
          sx={{ mb: 0.5, letterSpacing: 0.4 }}
        >
          MEDICATION
        </Typography>
        <Typography fontWeight={700} fontSize="16px" color="text.primary">
          {medicationName}
        </Typography>
        <Box
          component="button"
          type="button"
          onClick={() => setInfoOpen((o) => !o)}
          aria-expanded={infoOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.25,
            mt: 0.75,
            p: 0,
            border: "none",
            bgcolor: "transparent",
            color: "text.secondary",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <ChevronRightIcon
            sx={{
              fontSize: 16,
              transition: "transform 0.2s ease",
              transform: infoOpen ? "rotate(90deg)" : "none",
            }}
          />
          <Typography fontSize="11px" fontWeight={700}>
            Additional information
          </Typography>
        </Box>
        <Collapse in={infoOpen}>
          <Typography
            fontSize="12px"
            color="text.light"
            sx={{ mt: 1, pl: 2.5, lineHeight: 1.6 }}
          >
            Source: NHS Dictionary of Medicines and Devices (dm+d). Check the
            prescription label for strength and dosing before scheduling.
          </Typography>
        </Collapse>
      </Paper>

      {/* Support Question */}
      <Paper elevation={0} sx={{ ...cardSx, px: 2.5, py: 2, mb: 2 }}>
        <Box
          component="button"
          type="button"
          onClick={() => setSupportOpen((o) => !o)}
          aria-expanded={supportOpen}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 0,
            border: "none",
            bgcolor: "transparent",
            cursor: "pointer",
            fontFamily: "inherit",
            textAlign: "left",
          }}
        >
          <Typography fontWeight={700} fontSize="12px" color="text.primary">
            What support is required with this medication?
            <Required />
          </Typography>
          {supportOpen ? (
            <KeyboardArrowUpIcon sx={{ color: "text.light", fontSize: 20 }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ color: "text.light", fontSize: 20 }} />
          )}
        </Box>

        <Collapse in={supportOpen}>
          <Box sx={{ display: "flex", gap: 1.25, mt: 1.5 }}>
            {SUPPORT_OPTIONS.map((label) => {
              const selected = support === label;
              return (
                <Button
                  key={label}
                  variant="outlined"
                  onClick={() => setSupport(label)}
                  aria-pressed={selected}
                  sx={{
                    textTransform: "none",
                    py: 0.75,
                    px: 2.5,
                    borderRadius: "8px",
                    borderColor: selected ? "primary.main" : "#E2E8F0",
                    bgcolor: selected ? "#F0F9FF" : "#fff",
                    color: selected ? "primary.main" : "text.primary",
                    fontWeight: 600,
                    fontSize: "12px",
                    "&:hover": {
                      borderColor: "primary.main",
                      bgcolor: "rgba(14, 165, 233, 0.05)",
                    },
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </Box>
          <Box
            sx={{
              mt: 2,
              bgcolor: "#F8FAFC",
              borderRadius: "10px",
              px: 1.75,
              py: 1.25,
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              border: "1px solid #E2E8F0",
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 16, color: "text.light" }} />
            <Typography fontSize="11px" color="text.light" sx={{ lineHeight: 1.5 }}>
              If you're unsure, we recommend reading the{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", cursor: "pointer" }}
              >
                CQC's guidance
              </Box>{" "}
              on medicines support.
            </Typography>
          </Box>
        </Collapse>
      </Paper>

      {/* Accordion Style Sections */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {FORM_SECTIONS.map((s) => (
          <FormSection key={s.label} {...s} />
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={onBack}
        sx={{
          mt: 3,
          py: 1,
          px: 3,
          borderRadius: "10px",
          fontWeight: 700,
          fontSize: "13px",
          textTransform: "none",
          bgcolor: "#0EA5E9",
          boxShadow: "0 4px 12px rgba(14, 165, 233, 0.25)",
          color: "#ffffff",
          "&:hover": { bgcolor: "#0284c7" },
        }}
      >
        Save changes
      </Button>
    </Box>
  );
}
