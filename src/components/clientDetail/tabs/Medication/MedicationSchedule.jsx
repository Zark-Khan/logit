import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import MedicationViewHeader from "./MedicationViewHeader";
import { SCHEDULED_MEDICATION, firstNameOf } from "./medicationData";

const COLUMNS = [
  { label: "Name", sortable: true },
  { label: "Route", sortable: true },
  { label: "Dose", sortable: true },
  { label: "Frequency", sortable: true },
  { label: "Support type", sortable: true },
  { label: "Type", sortable: true },
  { label: "Start date" },
  { label: "Actions" },
];

const GRID = "1.6fr 0.7fr 0.9fr 1.6fr 0.9fr 0.9fr 0.9fr 0.8fr";

const checkboxSx = {
  p: 0.5,
  color: "#CBD5E1",
  "&.Mui-checked": { color: "#0EA5E9" },
};

export default function MedicationSchedule({ client, onBack, onViewMedication }) {
  const [showActive, setShowActive] = useState(true);
  const [showStopped, setShowStopped] = useState(false);
  const firstName = firstNameOf(client.name);
  const med = SCHEDULED_MEDICATION;
  // The mock medication is active, so it's listed while "Active" is ticked
  const rows = showActive ? [med] : [];

  return (
    <Box>
      <MedicationViewHeader
        title="Medication Schedule"
        subtitle={`Detailed medication schedule for ${client.name}.`}
        onBack={onBack}
      />

      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          bgcolor: "#fff",
          overflow: "hidden",
        }}
      >
        {/* Table Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            px: 2.5,
            py: 1.75,
            borderBottom: "1px solid #F1F5F9",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
            <Typography fontWeight={700} fontSize="16px">
              {firstName}'s medications
            </Typography>
            <Typography fontSize="12px" color="text.light">
              Showing {rows.length} of 1
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography fontSize="13px" fontWeight={700} color="text.primary">
              Show:
            </Typography>
            <FormControlLabel
              sx={{ m: 0, gap: 0.5 }}
              control={
                <Checkbox
                  size="small"
                  checked={showActive}
                  onChange={(e) => setShowActive(e.target.checked)}
                  sx={checkboxSx}
                />
              }
              label={<Typography fontSize="13px" fontWeight={600}>Active</Typography>}
            />
            <FormControlLabel
              sx={{ m: 0, gap: 0.5 }}
              control={
                <Checkbox
                  size="small"
                  checked={showStopped}
                  onChange={(e) => setShowStopped(e.target.checked)}
                  sx={checkboxSx}
                />
              }
              label={<Typography fontSize="13px" fontWeight={600}>Stopped</Typography>}
            />
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                borderColor: "#334155",
                color: "text.primary",
                fontWeight: 600,
                fontSize: "13px",
                px: 3,
                py: 0.6,
                "&:hover": { borderColor: "#0F172A", bgcolor: "#F8FAFC" },
              }}
            >
              Date
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Box sx={{ minWidth: 720 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: GRID,
                columnGap: 1.5,
                px: 2.5,
                py: 2,
              }}
            >
              {COLUMNS.map((c) => (
                <Typography
                  key={c.label}
                  fontSize="9px"
                  fontWeight={700}
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.25,
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                  }}
                >
                  {c.label}
                  {c.sortable && <UnfoldMoreIcon sx={{ fontSize: 12 }} />}
                </Typography>
              ))}
            </Box>

            {rows.length === 0 ? (
              <Typography
                fontSize="13px"
                color="text.light"
                sx={{ px: 2.5, pb: 3 }}
              >
                No medications match the selected filters.
              </Typography>
            ) : (
              rows.map((r) => (
                <Box
                  key={r.name}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: GRID,
                    columnGap: 1.5,
                    alignItems: "center",
                    px: 2.5,
                    pt: 1,
                    pb: 2.5,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        flexShrink: 0,
                        bgcolor: "#16A34A",
                        borderRadius: "50%",
                      }}
                    />
                    <Typography fontSize="13px" fontWeight={700}>
                      {r.name}
                    </Typography>
                  </Box>
                  {[r.route, r.dose, r.frequency, r.supportType, r.type, r.startDate].map(
                    (v, i) => (
                      <Typography
                        key={i}
                        fontSize="13px"
                        color="text.secondary"
                        sx={{ lineHeight: 1.5 }}
                      >
                        {v}
                      </Typography>
                    ),
                  )}
                  <Box>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={onViewMedication}
                      sx={{
                        textTransform: "none",
                        fontSize: "11px",
                        fontWeight: 700,
                        borderRadius: "8px",
                        borderColor: "#E2E8F0",
                        color: "primary.main",
                        minWidth: 0,
                        px: 2,
                        py: 0.4,
                        "&:hover": {
                          borderColor: "primary.main",
                          bgcolor: "#F0F9FF",
                        },
                      }}
                    >
                      View
                    </Button>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
