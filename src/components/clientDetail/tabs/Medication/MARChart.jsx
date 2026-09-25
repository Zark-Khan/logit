import React, { useState } from "react";
import { Box, Typography, Paper, Button, Select, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MedicationViewHeader from "./MedicationViewHeader";
import { SCHEDULED_MEDICATION, firstNameOf } from "./medicationData";

const BORDER = "1px solid #E2E8F0";
const MED_COL = 220;
const DOSE_COL = 56;
const TIME_COL = 72;
const DAY_COL = 36;

const PERIODS = {
  monthly: Array.from({ length: 31 }, (_, i) => String(i + 1)),
  weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
};

// Keeps the medication/dose/time columns pinned while the days scroll
const stickySx = (left, bgcolor = "#fff") => ({
  position: "sticky",
  left,
  zIndex: 1,
  bgcolor,
});

const headCellSx = {
  px: 1,
  py: 1.5,
  fontSize: "9px",
  fontWeight: 700,
  color: "text.secondary",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: 0.4,
  borderRight: BORDER,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function MARChart({ client, onBack }) {
  const [period, setPeriod] = useState("monthly");
  const firstName = firstNameOf(client.name);
  const med = SCHEDULED_MEDICATION;
  const days = PERIODS[period];
  const grid = `${MED_COL}px ${DOSE_COL}px ${TIME_COL}px repeat(${days.length}, minmax(${DAY_COL}px, 1fr))`;

  return (
    <Box>
      <MedicationViewHeader
        title="MAR Chart"
        subtitle={`Medication Administration Record for ${client.name}.`}
        onBack={onBack}
      />

      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: BORDER,
          bgcolor: "#fff",
          overflow: "hidden",
        }}
      >
        {/* Header with controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            px: 2.5,
            py: 1.75,
          }}
        >
          <Typography fontWeight={700} fontSize="16px">
            {firstName}'s MAR chart
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              variant="outlined"
              startIcon={<DescriptionOutlinedIcon sx={{ fontSize: 16 }} />}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                borderColor: "#EF4444",
                color: "#EF4444",
                fontWeight: 600,
                px: 2,
                py: 0.5,
                fontSize: "12px",
                "&:hover": {
                  borderColor: "#DC2626",
                  bgcolor: "rgba(239, 68, 68, 0.05)",
                },
              }}
            >
              Download PDF
            </Button>
            <Select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              size="small"
              IconComponent={KeyboardArrowDownIcon}
              sx={{
                borderRadius: "10px",
                fontSize: "12px",
                fontWeight: 600,
                minWidth: 130,
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#334155" },
                "& .MuiSelect-select": { py: 0.75 },
              }}
            >
              <MenuItem value="monthly" sx={{ fontSize: "13px" }}>
                Monthly
              </MenuItem>
              <MenuItem value="weekly" sx={{ fontSize: "13px" }}>
                Weekly
              </MenuItem>
            </Select>
          </Box>
        </Box>

        {/* MAR Chart Grid */}
        <Box sx={{ width: "100%", overflowX: "auto", borderTop: BORDER }}>
          <Box sx={{ display: "grid", gridTemplateColumns: grid, width: "max-content", minWidth: "100%" }}>
            {/* Header row */}
            <Box sx={{ display: "contents", "& > *": { bgcolor: "#F8FAFC", borderBottom: BORDER } }}>
              <Typography sx={{ ...headCellSx, ...stickySx(0, "#F8FAFC"), justifyContent: "flex-start", px: 2 }}>
                Medication
              </Typography>
              <Typography sx={{ ...headCellSx, ...stickySx(MED_COL, "#F8FAFC") }}>Dose #</Typography>
              <Typography sx={{ ...headCellSx, ...stickySx(MED_COL + DOSE_COL, "#F8FAFC") }}>
                Time
              </Typography>
              {days.map((d) => (
                <Typography key={d} sx={headCellSx}>
                  {d}
                </Typography>
              ))}
            </Box>

            {/* Medication row */}
            <Box sx={{ display: "contents", "& > *": { bgcolor: "#fff" } }}>
              <Box sx={{ ...stickySx(0), px: 2, py: 1.5, borderRight: BORDER }}>
                <Typography fontSize="13px" fontWeight={700} color="primary.main">
                  {med.name}
                </Typography>
                <Typography
                  fontSize="9px"
                  fontWeight={700}
                  color="text.secondary"
                  sx={{ mt: 0.25, textTransform: "uppercase" }}
                >
                  {med.type} / {med.dose}
                </Typography>
              </Box>
              <Box
                sx={{
                  ...stickySx(MED_COL),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: BORDER,
                }}
              >
                <Typography fontSize="13px" fontWeight={700}>
                  1
                </Typography>
              </Box>
              <Box
                sx={{
                  ...stickySx(MED_COL + DOSE_COL),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: BORDER,
                }}
              >
                <Typography fontSize="13px" fontWeight={600}>
                  {med.time}
                </Typography>
              </Box>
              {days.map((d, i) => (
                <Box
                  key={d}
                  sx={{ borderRight: i < days.length - 1 ? BORDER : "none" }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
