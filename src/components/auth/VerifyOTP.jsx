import React, { useState, useRef } from "react";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import AuthCard from "./AuthCard";

export default function VerifyOTP({ onNavigate }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    // allow only single digit
    const digit = value.replace(/\D/g, "").slice(-1);
    const updated = [...otp];
    updated[index] = digit;
    setOtp(updated);

    // auto-focus next box
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // backspace moves focus back
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const updated = ["", "", "", "", "", ""];
    pasted.split("").forEach((char, i) => { updated[i] = char; });
    setOtp(updated);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP submitted:", otp.join(""));
    onNavigate("set-new-password");
  };

  return (
    <AuthCard
      title="Verify Your OTP"
      subtitle="Please enter the OTP to verify your account. A code has been sent to [EMAIL_ADDRESS]"
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>

        {/* OTP label */}
        <Typography variant="body1" fontWeight={600} sx={{ mb: 1.5 }}>
          Enter OTP{" "}
          <Box component="span" color="error.main">*</Box>
        </Typography>

        {/* 4 digit boxes */}
        <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              placeholder="-"
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center", fontWeight: 700, fontSize: "1.25rem", padding: 0 },
              }}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": { height: "53px" },
                "& .MuiOutlinedInput-input": { padding: "0" },
              }}
            />
          ))}
        </Box>

        {/* Resend */}
        <Typography variant="body1" color="text.primary" sx={{ mb: 3 }}>
          Didn't receive a code?{" "}
          <Link
            component="button"
            type="button"
            underline="none"
            onClick={() => console.log("Resend OTP")}
            sx={{ color: "success.main", fontWeight: 600 }}
          >
            Resend
          </Link>
        </Typography>

        {/* Actions */}
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
