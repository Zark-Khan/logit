import React, { useState } from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthCard from "./AuthCard";
import AuthField from "./AuthField";

export default function LoginForm({ onNavigate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login payload:", form);
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to access your account."
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
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
          sx={{ mb: 0.5 }}
        />

        {/* Forgot Password */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Link
            component="button"
            type="button"
            underline="none"
            onClick={() => onNavigate("forgot-password")}
            sx={{ color: "success.main", fontWeight: 600, fontSize: "0.875rem" }}
          >
            Forgot Password?
          </Link>
        </Box>

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
          Sign In
        </Button>

        <Typography variant="body1" color="text.primary" textAlign="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link
            component="button"
            type="button"
            underline="none"
            onClick={() => onNavigate("register")}
            sx={{ color: "success.main", fontWeight: 600 }}
          >
            Register
          </Link>
        </Typography>
      </Box>
    </AuthCard>
  );
}
