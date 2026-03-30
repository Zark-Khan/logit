import React from "react";
import { Box, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

// ─── AuthField ────────────────────────────────────────────────────────────────
// Props:
//   label         — field label text e.g. "Email"
//   name          — input name attribute
//   type          — input type (default: "text")
//   placeholder   — placeholder text
//   value         — controlled value
//   onChange      — change handler
//   icon          — MUI icon element for start adornment
//   required      — boolean (default: true)
//   showPassword  — boolean, only used when type="password"
//   onTogglePassword — toggle handler, only used when type="password"
//   sx            — optional extra sx override
export default function AuthField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  required = true,
  showPassword,
  onTogglePassword,
  sx = {},
}) {
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <Box sx={{ width: "100%", mb: 2.5, ...sx }}>
      {/* Label */}
      <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5, display: "block" }}>
        {label}{" "}
        {required && (
          <Box component="span" color="error.main">
            *
          </Box>
        )}
      </Typography>

      {/* Input */}
      <TextField
        fullWidth
        name={name}
        type={resolvedType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        InputProps={{
          startAdornment: icon ? (
            <InputAdornment position="start">
              <Box sx={{ color: "text.disabled", display: "flex" }}>{icon}</Box>
            </InputAdornment>
          ) : undefined,
          endAdornment: isPassword ? (
            <InputAdornment position="end">
              <IconButton onClick={onTogglePassword} edge="end" size="small" tabIndex={-1}>
                {showPassword ? (
                  <VisibilityOffOutlinedIcon fontSize="small" sx={{ color: "text.disabled" }} />
                ) : (
                  <VisibilityOutlinedIcon fontSize="small" sx={{ color: "text.disabled" }} />
                )}
              </IconButton>
            </InputAdornment>
          ) : undefined,
        }}
        sx={{
          "& .MuiOutlinedInput-root": { height: "53px" },
          "& .MuiOutlinedInput-input": { padding: "0 14px" },
        }}
      />
    </Box>
  );
}
