import React, { useState } from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthCard from "./AuthCard";
import AuthField from "./AuthField";

export default function RegisterForm({ onNavigate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register payload:", form);
  };

  return (
    <AuthCard
      title="Create Account"
      subtitle="Smart care management, built for real workflows."
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <AuthField
          label="Username"
          name="username"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleChange}
          icon={<PersonOutlineRoundedIcon fontSize="small" />}
        />

        <AuthField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          icon={<EmailOutlinedIcon fontSize="small" />}
        />

        <AuthField
          label="Password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          value={form.password}
          onChange={handleChange}
          icon={<LockOutlinedIcon fontSize="small" />}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((v) => !v)}
          sx={{ mb: 3.5 }}
        />

        <Button
          type="submit"
          fullWidth
          disableElevation
          sx={{
            py: 1.4,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: "0.95rem",
            textTransform: "none",
            letterSpacing: 0.3,
            position: "relative",
            overflow: "hidden",
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
          Register
        </Button>

        <Typography
          variant="body1"
          color="text.primary"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          Already have an account?{" "}
          <Link
            component="button"
            type="button"
            underline="none"
            onClick={() => onNavigate("login")}
            sx={{ color: "success.main", fontWeight: 600 }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </AuthCard>
  );
}
