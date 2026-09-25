import React from "react";
import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

// Numbered step row used by the Care Delivery create wizards
export default function StepIndicator({ steps, activeStep }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 4,
        py: 2.25,
        px: 4,
        mx: -4,
        bgcolor: "#F8FAFC",
      }}
    >
      {steps.map((label, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;
        return (
          <React.Fragment key={label}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.25 }}
              aria-current={isActive ? "step" : undefined}
            >
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: isCompleted
                    ? "#10B981"
                    : isActive
                      ? "#0EA5E9"
                      : "#E2E8F0",
                  color: isCompleted || isActive ? "#fff" : "#64748B",
                  fontSize: "12px",
                  fontWeight: 700,
                  boxShadow: isActive
                    ? "0px 4px 10px rgba(14, 165, 233, 0.3)"
                    : "none",
                }}
              >
                {isCompleted ? <CheckIcon sx={{ fontSize: 16 }} /> : index + 1}
              </Box>
              <Typography
                fontSize="10px"
                fontWeight={700}
                color={isActive ? "text.primary" : "#64748B"}
                sx={{ letterSpacing: "0.05em" }}
              >
                {label}
              </Typography>
            </Box>
            {index < steps.length - 1 && (
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <Box sx={{ width: 40, height: "1px", bgcolor: "#CBD5E1" }} />
              </Box>
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
}
