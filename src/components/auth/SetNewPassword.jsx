import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthCard from "./AuthCard";
import AuthField from "./AuthField";

export default function SetNewPassword({ onNavigate }) {
  const [showNew, setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    console.log("New password set:", form.newPassword);
    onNavigate("password-reset");
  };

  return (
    <AuthCard
      title="Set A New Password"
      subtitle="Your new password must be different from your previous password."
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <AuthField
          label="Create New Password"
          name="newPassword"
          type="password"
          placeholder="Enter new password"
          value={form.newPassword}
          onChange={handleChange}
          icon={<LockOutlinedIcon fontSize="small" />}
          showPassword={showNew}
          onTogglePassword={() => setShowNew((v) => !v)}
        />

        <AuthField
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          value={form.confirmPassword}
          onChange={handleChange}
          icon={<LockOutlinedIcon fontSize="small" />}
          showPassword={showConfirm}
          onTogglePassword={() => setShowConfirm((v) => !v)}
          sx={{ mb: error ? 1 : 3.5 }}
        />

        {error && (
          <Typography variant="body2" color="error.main" sx={{ mb: 2.5 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          disableElevation
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
          Update
        </Button>
      </Box>
    </AuthCard>
  );
}
