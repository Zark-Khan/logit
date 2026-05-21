import React from "react";
import { Box, Typography, Grid, Paper, Chip, Link } from "@mui/material";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import WaterOutlinedIcon from "@mui/icons-material/WaterOutlined";

export default function RisksIncidentsTab({ client }) {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography fontWeight={700} fontSize="20px" color="text.primary">
          Risks & Incidents
        </Typography>
        <Typography fontSize="14px" color="text.light" sx={{ mt: 0.5 }}>
          Manage information and care delivery for{" "}
          {client?.name || "Margaret Hall"}.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: "#fff",
              height: "100%",
              border: "1px solid #FFEDD5",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <Box
                sx={{
                  bgcolor: "#FFF7ED",
                  p: 1.2,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WarningAmberOutlinedIcon
                  sx={{ color: "#F97316", fontSize: 24 }}
                />
              </Box>
              <Typography fontWeight={700} fontSize="14px" color="text.primary">
                Fall Risk Assessment
              </Typography>
            </Box>
            <Typography
              fontSize="12px"
              color="text.light"
              fontWeight={400}
              sx={{ mb: 2 }}
            >
              Score: 12 (Moderate). Previous minor fall in hallway recorded
              April 14th.
            </Typography>
            <Link
              href="#"
              underline="none"
              sx={{
                fontWeight: 700,
                fontSize: "10px",
                color: "#0EA5E9",
                "&:hover": { color: "#0284C7" },
              }}
            >
              FULL ASSESSMENT
            </Link>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "16px",
              border: "1px solid #F1F5F9",
              bgcolor: "#fff",
              height: "100%",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <Box
                sx={{
                  bgcolor: "#F0F9FF",
                  p: 1.2,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WaterOutlinedIcon sx={{ color: "#0EA5E9", fontSize: 24 }} />
              </Box>
              <Typography fontWeight={700} fontSize="14px" color="text.primary">
                Medication Risk
              </Typography>
            </Box>
            <Typography
              fontSize="12px"
              color="text.light"
              fontWeight={400}
              sx={{ mb: 2 }}
            >
              Complex medication regime. Requires supervision at every dose.
            </Typography>
            <Link
              href="#"
              underline="none"
              sx={{
                fontWeight: 700,
                fontSize: "10px",
                color: "#0EA5E9",
                "&:hover": { color: "#0284C7" },
              }}
            >
              REVIEW PROTOCOL
            </Link>
          </Paper>
        </Grid>
      </Grid>

      <Box>
        <Typography
          fontWeight={700}
          fontSize="14px"
          color="text.primary"
          sx={{ mb: 2.5 }}
        >
          Recent Incident History
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: "12px",
            bgcolor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
            border: "1px solid #F1F5F9",
          }}
        >
          <Box>
            <Typography fontWeight={700} fontSize="12px" color="text.primary">
              Minor Skin Tear (Left Arm)
            </Typography>
            <Typography
              fontSize="10px"
              color="#94A3B8"
              fontWeight={400}
              sx={{ mt: 0.5 }}
            >
              14 May 2024 • Reported by Sarah T.
            </Typography>
          </Box>
          <Chip
            label="CLOSED"
            size="small"
            sx={{
              bgcolor: "#FEF2F2",
              color: "#EF4444",
              fontWeight: 700,
              fontSize: "9px",
              borderRadius: "6px",
              height: 24,
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
}
