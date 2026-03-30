import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AuthCard from "./AuthCard";
import AuthField from "./AuthField";

export default function ForgotPassword({ onNavigate }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Send OTP to:", email);
    onNavigate("verify-otp");
  };

  return (
    <AuthCard
      title="Forgot your Password"
      subtitle="No worries, it happens to everyone. Enter your email below to reset your password."
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <AuthField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<EmailOutlinedIcon fontSize="small" />}
          sx={{ mb: 3.5 }}
        />

        <Box sx={{ display: "flex", gap: 2.5 }}>
          <Button
            fullWidth
            disableElevation
            onClick={() => onNavigate("login")}
            sx={{
              py: 1.4,
              fontWeight: 600,
               borderRadius: "12px",
             typography: "h6",
              textTransform: "none",
              color: "text.primary",
              borderColor: "unset",
              backgroundColor: "background.bgLight", 
            }}
          >
            Back
          </Button>

          <Button
            type="submit"
            fullWidth
            disableElevation
            sx={{
               position: "relative",
               overflow: "hidden",
              py: 1.4,
              borderRadius: "12px",
              fontWeight: 700,
              textTransform: "none",
              background: "#0EA5E9",
              color: "#fff",
              typography: "h6",
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
            Send OTP
          </Button>
        </Box>
      </Box>
    </AuthCard>
  );
}
