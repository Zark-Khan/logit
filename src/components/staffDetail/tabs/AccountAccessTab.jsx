import React from "react";
import { Box, Typography, Switch, Button } from "@mui/material";

import { styled } from "@mui/material/styles";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 48,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 4,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(24px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#8AC642", // matches the green in the image
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16,
    height: 16,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  "& .MuiSwitch-track": {
    borderRadius: 24 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function AccountAccessTab({ staff }) {
  return (
    <Box>
      <Typography
        fontSize="20px"
        fontWeight={700}
        color="text.primary"
        mb={0.4}
      >
        Account & Access
      </Typography>
      <Typography fontSize="14px" color="text.light" mb={3.5}>
        Detailed information and settings for {staff.name}'s account & access.
      </Typography>

      {/* Application Access */}
      <Typography
        fontSize="14px"
        fontWeight={700}
        color="text.primary"
        mb={1.5}
      >
        Application Access
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#fff",
          borderRadius: "12px",
          px: 3,
          py: 2,
          mb: 3.5,
        }}
      >
        <Box>
          <Typography
            fontSize="14px"
            fontWeight={700}
            color="text.primary"
            mb={0.3}
          >
            Mobile App Status
          </Typography>
          <Typography fontSize="11px" color="text.secondary">
            Enables check-in/out and digital notes
          </Typography>
        </Box>
        <IOSSwitch defaultChecked />
      </Box>

      {/* Security Controls */}
      <Typography
        fontSize="14px"
        fontWeight={700}
        color="text.primary"
        mb={1.5}
      >
        Security Controls
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button
          sx={{
            flex: 1,
            bgcolor: "#fff",
            color: "text.primary",
            fontWeight: 700,
            fontSize: "12px",
            textTransform: "none",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            py: 1.5,
            boxShadow: "none",
            "&:hover": { bgcolor: "#F8FAFC", boxShadow: "none" },
          }}
          variant="contained"
        >
          Force Password Reset
        </Button>
        <Button
          sx={{
            flex: 1,
            bgcolor: "#FEF2F2",
            color: "#EF4444",
            fontWeight: 700,
            fontSize: "12px",
            textTransform: "none",
            borderRadius: "12px",
            border: "1px solid #FEE2E2",
            py: 1.5,
            boxShadow: "none",
            "&:hover": { bgcolor: "#FECACA", boxShadow: "none" },
          }}
          variant="contained"
        >
          Deactivate Account
        </Button>
      </Box>

      {/* Login Info */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: "12px",
          px: 3,
          py: 1.7,
        }}
      >
        <Typography fontSize="12px" color="text.secondary" lineHeight={1.6}>
          Last login: Today at 08:42 AM
          <br />
          Device: iPad 14 Pro Max (iOS 17.4)
        </Typography>
      </Box>
    </Box>
  );
}
