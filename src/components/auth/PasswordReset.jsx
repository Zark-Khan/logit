import React from "react";
import { Box, Button, Typography } from "@mui/material";
import AuthCard from "./AuthCard";

export default function PasswordReset({ onNavigate }) {
  return (
    <AuthCard title="Password Reset!">
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>

        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 3.5 }}
        >
          Your password has been successfully reset. Click below to log in.
        </Typography>

        <Button
          fullWidth
          disableElevation
          onClick={() => onNavigate("login")}
          sx={{
            py: 1.4,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: "0.875rem",
            textTransform: "none",
           background: "#0EA5E9",
            color: "#fff",

            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)",
              transition: "all 0.6s ease",
            },

            "&:hover::after": {
              left: "100%",
            },

            "&:hover": {
              background: "#0EA5E9", // keep base color
            },
          }}
        >
          Continue
        </Button>
      </Box>
    </AuthCard>
  );
}
