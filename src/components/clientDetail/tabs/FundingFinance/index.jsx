import React from "react";
import { Box, Typography, Grid, Paper, LinearProgress } from "@mui/material";

export default function FundingFinanceTab({ client }) {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography fontWeight={700} fontSize="10px" color="text.primary">
          Funding & Finance
        </Typography>
        <Typography fontSize="14px" color="text.light" sx={{ mt: 0.5 }}>
          Manage information and care delivery for{" "}
          {client?.name || "Margaret Hall"}.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "12px",
              border: "1px solid #FFFFFF",
              bgcolor: "#fff",
            }}
          >
            <Typography
              fontWeight={700}
              fontSize="10px"
              color="text.light"
              sx={{ textTransform: "uppercase", mb: 1 }}
            >
              PRIMARY FUNDING SOURCE
            </Typography>
            <Typography fontWeight={700} fontSize="14px" color="text.primary">
              Local Authority (LA)
            </Typography>
            <Typography
              fontSize="10px"
              color="text.light"
              fontWeight={400}
              sx={{ mt: 0.5 }}
            >
              60% Contribution
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "12px",
              border: "1px solid #FFFFFF",
              bgcolor: "#fff",
            }}
          >
            <Typography
              fontWeight={700}
              fontSize="10px"
              color="text.light"
              sx={{ textTransform: "uppercase", mb: 1 }}
            >
              TOP-UP / CONTRIBUTION
            </Typography>
            <Typography fontWeight={700} fontSize="14px" color="text.primary">
              Private (Family)
            </Typography>
            <Typography
              fontSize="10px"
              color="text.light"
              fontWeight={400}
              sx={{ mt: 0.5 }}
            >
              40% Contribution
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "24px",
          bgcolor: "#fff",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 4,
          }}
        >
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            Monthly Care Budget Usage
          </Typography>
          <Typography fontWeight={700} fontSize="14px" color="text.primary">
            £2,450 / £3,200
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={75}
          sx={{
            height: 12,
            borderRadius: "6px",
            bgcolor: "#F1F5F9",
            "& .MuiLinearProgress-bar": {
              bgcolor: "#8AC642",
              borderRadius: "6px",
            },
            mb: 4,
          }}
        />

        <Grid container spacing={4}>
          <Grid size={{ xs: 6 }}>
            <Typography
              fontWeight={700}
              fontSize="10px"
              color="text.light"
              sx={{ textTransform: "uppercase", mb: 0.6 }}
            >
              APPROVED HOURS
            </Typography>
            <Typography fontWeight={700} fontSize="18px" color="text.primary">
              80h / Month
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography
              fontWeight={700}
              fontSize="10px"
              color="text.light"
              sx={{ textTransform: "uppercase", mb: 0.6 }}
            >
              CURRENT BURN RATE
            </Typography>
            <Typography fontWeight={700} fontSize="18px" color="#16A34A">
              On Target
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
