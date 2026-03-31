import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Typography, TextField, Select, MenuItem,
  Button, IconButton, Switch, Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const SECTION_NUMBER_SX = {
  width: 24, height: 24, borderRadius: "50%",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: "10px", fontWeight: 700
};

function SectionHeader({ number, label, bgcolor ,color }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
      <Box sx={{ ...SECTION_NUMBER_SX, bgcolor: bgcolor, color: color }}>{number}</Box>
      <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "text.primary", textTransform: "uppercase" }}>
        {label}
      </Typography>
    </Box>
  );
}

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2, fontSize: "0.82rem",
    "& fieldset": { borderColor: "#E2E8F0" },
    "&:hover fieldset": { borderColor: "#0EA5E9" },
    "&.Mui-focused fieldset": { borderColor: "#0EA5E9", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": { fontSize: "0.72rem" },
};

const labelSx = {
  fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
 color: "text.light", mb: 0.6, display: "block",
};

const selectSx = {
  borderRadius: 2, fontSize: "0.82rem",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#0EA5E9" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#0EA5E9", borderWidth: "1.5px" },
};

export function AddNewStaffModal({ open, onClose }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    role: "", branch: "",
    inviteToSystem: true,
    permissionLevel: "carer",
    initialStatus: "ONBOARDING",
    assignableToShifts: true,
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4, boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
          border: "1px solid rgba(14,165,233,0.15)",
        },
      }}
    >
      {/* ── Header ── */}
      <DialogTitle sx={{ pb: 0.5, pt: 2.5, px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <Box sx={{mb:4}}>
            <Typography sx={{ fontWeight: 600, fontSize: "20px", color: "text.primary" }}>
              Add New Staff Member
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "text.light", mt: 0.3 }}>
              Create a new profile and configure system access.
            </Typography>
          </Box>
          <IconButton size="small" onClick={onClose} sx={{ mt: -0.5, color: "text.secondary" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2.5, pb: 1 }}>

        {/* ── Section 1: Basic Information ── */}
        <SectionHeader number="1" label="Basic Information" bgcolor="#E0F2FE" color="primary.main"/>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
          <Box>
            <Typography component="label" sx={labelSx}>First Name <span style={{ color: "#dc2626" }}>*</span></Typography>
            <TextField fullWidth size="small" placeholder="e.g. Sarah"
              value={form.firstName} onChange={set("firstName")} sx={inputSx} />
          </Box>
          <Box>
            <Typography component="label" sx={labelSx}>Last Name <span style={{ color: "#dc2626" }}>*</span></Typography>
            <TextField fullWidth size="small" placeholder="e.g. Thompson"
              value={form.lastName} onChange={set("lastName")} sx={inputSx} />
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
          <Box>
            <Typography component="label" sx={labelSx}>Email <span style={{ color: "#dc2626" }}>*</span></Typography>
            <TextField fullWidth size="small" placeholder="s.thompson@agency.com"
              value={form.email} onChange={set("email")} sx={inputSx} />
          </Box>
          <Box>
            <Typography component="label" sx={labelSx}>Phone Number</Typography>
            <TextField fullWidth size="small" placeholder="+44 7700 000000"
              value={form.phone} onChange={set("phone")} sx={inputSx} />
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 3 }}>
          <Box>
            <Typography component="label" sx={labelSx}>Role <span style={{ color: "#dc2626" }}>*</span></Typography>
            <Select fullWidth size="small" value={form.role} onChange={set("role")}
              displayEmpty IconComponent={KeyboardArrowDownIcon} sx={selectSx}>
              <MenuItem value="" disabled><Typography fontSize="0.82rem" color="text.disabled">Select Role</Typography></MenuItem>
              {["Carer", "Nurse", "Supervisor", "Coordinator"].map((r) => (
                <MenuItem key={r} value={r} sx={{ fontSize: "0.82rem" }}>{r}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography component="label" sx={labelSx}>Branch <span style={{ color: "#dc2626" }}>*</span></Typography>
            <Select fullWidth size="small" value={form.branch} onChange={set("branch")}
              displayEmpty IconComponent={KeyboardArrowDownIcon} sx={selectSx}>
              <MenuItem value="" disabled><Typography fontSize="0.82rem" color="text.disabled">Select Branch</Typography></MenuItem>
              {["North", "South", "East", "West"].map((b) => (
                <MenuItem key={b} value={b} sx={{ fontSize: "0.82rem" }}>{b}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* ── Section 2: Account & Access ── */}
        <SectionHeader number="2" label="Account & Access" bgcolor="#FFEDD5" color="#F97316" />

        <Box sx={{
          border: "1px solid #E9EDF0", borderRadius: 3, p: 2, mb: 3,
          bgcolor: "#fafcff",
        }}>
          {/* Invite toggle */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "text.primary" }}>
                Invite to system
              </Typography>
              <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", mt: 0.2 }}>
                Send an automated onboarding email
              </Typography>
            </Box>
            <Switch
              checked={form.inviteToSystem}
              onChange={(e) => setForm((f) => ({ ...f, inviteToSystem: e.target.checked }))}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "#0EA5E9" },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#0EA5E9" },
              }}
            />
          </Box>

          <Box>
            <Typography component="label" sx={labelSx}>Permission Level</Typography>
            <Select fullWidth size="small" value={form.permissionLevel}
              onChange={set("permissionLevel")}
              IconComponent={KeyboardArrowDownIcon} sx={selectSx}>
              <MenuItem value="carer" sx={{ fontSize: "0.82rem" }}>Carer (mobile app only)</MenuItem>
              <MenuItem value="nurse" sx={{ fontSize: "0.82rem" }}>Nurse (mobile app only)</MenuItem>
              <MenuItem value="supervisor" sx={{ fontSize: "0.82rem" }}>Supervisor (full access)</MenuItem>
              <MenuItem value="admin" sx={{ fontSize: "0.82rem" }}>Administrator (full access)</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* ── Section 3: Initial Setup ── */}
        <SectionHeader number="3" label="Initial Setup" bgcolor="#DCFCE7" color="#8AC642" />

        <Box>
          <Typography component="label" sx={labelSx}>Initial Status</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {/* Premium Status Toggle */}
            <Box sx={{
              display: "flex",
              bgcolor: "#F1F5F9",
              borderRadius: "16px",
              p: 1,
              width: "fit-content",
              position: "relative",
              gap: 2
            }}>
              {["ACTIVE", "ONBOARDING"].map((s) => (
                <Box
                  key={s}
                  onClick={() => setForm((f) => ({ ...f, initialStatus: s }))}
                  sx={{
                    flex: 1,
                    py: 1.2,
                    px: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    borderRadius: "8px",
                    bgcolor: form.initialStatus === s ? "#FFFFFF" : "transparent",
                    boxShadow: form.initialStatus === s ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  <Typography sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: form.initialStatus === s ? "#1E293B" : "#94A3B8",
                    transition: "color 0.3s ease",
                    letterSpacing: "0.5px"
                  }}>
                    {s}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Assignable to shifts checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={form.assignableToShifts}
                  onChange={(e) => setForm((f) => ({ ...f, assignableToShifts: e.target.checked }))}
                  sx={{
                    color: "#0EA5E9",
                    "&.Mui-checked": { color: "#0EA5E9" },
                    p: 0.5,
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", fontWeight: 500 }}>
                  Assignable to shifts
                </Typography>
              }
              sx={{ ml: 0.5 }}
            />
          </Box>
        </Box>

        {/* Warning box */}
        <Box sx={{
          mt: 2.5, p: 1.5, borderRadius: 2,
          bgcolor: "#FFF7ED", border: "1px solid #FEA500",
          display: "flex", gap: 1.2, alignItems: "flex-start",
        }}>
          <WarningAmberRoundedIcon sx={{ fontSize: 17, color: "#FEA500", mt: 0.1, flexShrink: 0 }} />
          <Typography sx={{ fontSize: "0.68rem", color: "#FEA500", lineHeight: 1.5 }}>
            <strong>Note:</strong> This staff will appear as <strong>Non-Compliant</strong> until required identification and training
            documents are uploaded to their profile.
          </Typography>
        </Box>

      </DialogContent>

      {/* ── Footer ── */}
      <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none", fontSize: "0.82rem", fontWeight: 600,
            color: "text.secondary", "&:hover": { color: "text.primary", bgcolor: "transparent" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: 2.5, textTransform: "none", fontSize: "0.82rem", fontWeight: 700,
            px: 3, py: 1,
            background: "linear-gradient(135deg, #0EA5E9, #8AC642)",
            boxShadow: "0 4px 14px rgba(14,165,233,0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #0284c7, #76ad34)",
              boxShadow: "0 6px 18px rgba(14,165,233,0.4)",
            },
            color:"text.paper"
          }}
        >
          Create Staff Member
        </Button>
      </DialogActions>
    </Dialog>
  );
}