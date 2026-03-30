import React from "react";
import { Box, Typography } from "@mui/material";

// ── Gradient Card ─────────────────────────────────────────────────────────────
export function GradCard({ gradient, children, sx = {} }) {
  return (
    <Box
      sx={{
        borderRadius: 10,
        px: 3,
        py: 3.4,
        background: gradient,
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────
export function Label({ children, sx = {} }) {
  return (
    <Typography
      variant="caption"
      sx={{
        opacity: 0.75,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        fontSize: "0.62rem",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

// ── Big Stat (Used by AppointmentStats) ──────────────────────────────────────
export function BigStat({ label, value, sub }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: 700,
          textTransform: "uppercase",
          opacity: 0.75,
        }}
      >
        {label}
      </Typography>

      <Typography sx={{ fontSize: "36px", fontWeight: 700, mt: 0.3 }}>
        {value.minutes ? (
          <>
            <Typography
              component="span"
              sx={{ fontSize: "36px", fontWeight: 700 }}
            >
              {value.hours}
            </Typography>
            <Typography
              component="span"
              sx={{ fontSize: "18px", fontWeight: 500, ml: 0.5 }}
            >
              {value.minutes}
            </Typography>
          </>
        ) : (
          value.hours
        )}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", mt: 0.4 }}>
        <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>
          {sub.appointments}
        </Typography>
        <Typography
          sx={{ fontSize: "12px", fontWeight: 500, color: "#250046" }}
        >
          {sub.carers}
        </Typography>
      </Box>
    </Box>
  );
}
