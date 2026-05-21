import React from "react";
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function MedicationSchedule({ onBack }) {
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
            Medication Schedule
          </Typography>
          <Typography fontSize="14px" color="text.light" sx={{ mt: 0.3 }}>
            Detailed medication schedule for Margaret Hall.
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

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "24px",
          border: "1px solid #E2E8F0",
          bgcolor: "#fff",
        }}
      >
        {/* Table Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
            <Typography fontWeight={700} fontSize="20px">
              Margaret's medications
            </Typography>
            <Typography fontSize="14px" color="text.light">
              Showing 1 of 1
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography fontSize="14px" fontWeight={700} color="text.primary">
                Show:
              </Typography>
              <FormControlLabel
                control={<Checkbox checked size="small" />}
                label={
                  <Typography fontSize="14px" fontWeight={600}>
                    Active
                  </Typography>
                }
              />
              <FormControlLabel
                control={<Checkbox size="small" />}
                label={
                  <Typography
                    fontSize="14px"
                    fontWeight={600}
                    color="text.secondary"
                  >
                    Stopped
                  </Typography>
                }
              />
            </Box>
            <Button
              variant="outlined"
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                borderColor: "#E2E8F0",
                color: "text.primary",
                fontWeight: 700,
                px: 3,
              }}
            >
              Date
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Box sx={{ minWidth: 700 }}>
            {/* Column Headers */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "200px 100px 100px 150px 100px 100px 100px 100px",
                px: 2,
                mb: 2,
              }}
            >
              {[
                "NAME",
                "ROUTE",
                "DOSE",
                "FREQUENCY",
                "SUPPORT TYPE",
                "TYPE",
                "START DATE",
                "ACTIONS",
              ].map((h) => (
                <Typography
                  key={h}
                  fontSize="10px"
                  fontWeight={700}
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {h}{" "}
                  {h !== "ACTIONS" && (
                    <KeyboardArrowDownIcon sx={{ fontSize: 12 }} />
                  )}
                </Typography>
              ))}
            </Box>

            {/* Row */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "200px 100px 100px 150px 100px 100px 100px 100px",
                alignItems: "center",
                px: 2,
                py: 3,
                borderRadius: "16px",
                border: "1px solid #F1F5F9",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 4,
                    height: 16,
                    bgcolor: "#16A34A",
                    borderRadius: "2px",
                  }}
                />
                <Typography fontSize="14px" fontWeight={700}>
                  Paracetamol 400mg tablets
                </Typography>
              </Box>
              <Typography fontSize="14px" color="text.light">
                Oral
              </Typography>
              <Typography fontSize="14px" color="text.light">
                2 oral tablets
              </Typography>
              <Typography
                fontSize="14px"
                color="text.light"
                sx={{ lineHeight: 1.4 }}
              >
                Once a day on Tuesday, Saturday every week
              </Typography>
              <Typography fontSize="14px" color="text.light">
                Assist
              </Typography>
              <Typography fontSize="14px" color="text.light">
                Scheduled
              </Typography>
              <Typography fontSize="14px" color="text.light">
                25 Feb 2026
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  fontSize: "11px",
                  fontWeight: 700,
                  borderRadius: "8px",
                  borderColor: "main.primary",
                  color: "main.primary",
                  py: 0.5,
                }}
              >
                View
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
