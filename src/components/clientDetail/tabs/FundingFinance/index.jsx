import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Divider,
} from "@mui/material";

const FUNDING_SOURCES = [
  {
    label: "Primary funding source",
    value: "Local Authority (LA)",
    sub: "60% Contribution",
  },
  {
    label: "Top-up / Contribution",
    value: "Private (Family)",
    sub: "40% Contribution",
  },
];

const BUDGET = { used: 2450, total: 3200 };

const formatGBP = (n) => `£${n.toLocaleString("en-GB")}`;

const labelSx = {
  fontWeight: 700,
  fontSize: "10px",
  color: "text.secondary",
  textTransform: "uppercase",
  letterSpacing: 0.3,
};

export default function FundingFinanceTab({ client }) {
  const usedPct = Math.min(100, (BUDGET.used / BUDGET.total) * 100);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography fontWeight={700} fontSize="20px" color="text.primary">
          Funding & Finance
        </Typography>
        <Typography fontSize="14px" color="text.light" sx={{ mt: 0.5 }}>
          Manage information and care delivery for{" "}
          {client?.name || "Margaret Hall"}.
        </Typography>
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {FUNDING_SOURCES.map((f) => (
          <Grid key={f.label} size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                px: 2.5,
                py: 2,
                borderRadius: "12px",
                border: "1px solid #F1F5F9",
                bgcolor: "#fff",
                height: "100%",
              }}
            >
              <Typography sx={{ ...labelSx, mb: 0.75 }}>{f.label}</Typography>
              <Typography fontWeight={700} fontSize="16px" color="text.primary">
                {f.value}
              </Typography>
              <Typography fontSize="11px" color="text.secondary" sx={{ mt: 0.25 }}>
                {f.sub}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper
        elevation={0}
        sx={{
          px: { xs: 2.5, sm: 3.5 },
          py: 3,
          borderRadius: "20px",
          bgcolor: "#fff",
          border: "1px solid #F1F5F9",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 2.5,
          }}
        >
          <Typography fontWeight={700} fontSize="15px" color="text.primary">
            Monthly Care Budget Usage
          </Typography>
          <Typography fontWeight={700} fontSize="15px" color="text.primary">
            {formatGBP(BUDGET.used)} / {formatGBP(BUDGET.total)}
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={usedPct}
          aria-label={`Budget used: ${Math.round(usedPct)}%`}
          sx={{
            height: 12,
            borderRadius: "6px",
            bgcolor: "#E2E8F0",
            "& .MuiLinearProgress-bar": {
              bgcolor: "#8AC642",
              borderRadius: "6px",
            },
          }}
        />

        <Divider sx={{ borderColor: "#F1F5F9", my: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 6 }}>
            <Typography sx={{ ...labelSx, mb: 0.5 }}>Approved hours</Typography>
            <Typography fontWeight={700} fontSize="20px" color="text.primary">
              80h / Month
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography sx={{ ...labelSx, mb: 0.5 }}>Current burn rate</Typography>
            <Typography fontWeight={700} fontSize="20px" color="#16A34A">
              On Target
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
