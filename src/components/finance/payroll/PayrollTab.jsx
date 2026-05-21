import React from "react";
import { Box, Typography } from "@mui/material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

export default function PayrollTab() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "16px",
          bgcolor: "#D1FAE5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AccountBalanceOutlinedIcon sx={{ color: "#059669", fontSize: 28 }} />
      </Box>
      <Typography fontSize="16px" fontWeight={700} color="text.primary">
        Payroll
      </Typography>
      <Typography fontSize="13px" color="#94A3B8" fontWeight={500}>
        Payroll management coming soon.
      </Typography>
    </Box>
  );
}
