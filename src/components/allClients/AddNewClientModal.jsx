import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const SECTION_NUMBER_SX = {
  width: 24,
  height: 24,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "10px",
  fontWeight: 700,
};

function SectionHeader({ number, label, bgcolor, color }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5, mt: 1 }}>
      <Box sx={{ ...SECTION_NUMBER_SX, bgcolor: bgcolor, color: color }}>
        {number}
      </Box>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 700,
          color: "text.primary",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2.5,
    fontSize: "0.82rem",
    "& fieldset": { borderColor: "#E2E8F0" },
    "&:hover fieldset": { borderColor: "#8AC642" },
    "&.Mui-focused fieldset": { borderColor: "#8AC642", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": { fontSize: "0.72rem" },
};

const labelSx = {
  fontSize: "10px",
  fontWeight: 700,
  textTransform: "uppercase",
  color: "text.light",
  mb: 0.8,
  display: "block",
  letterSpacing: 0.5,
};

const selectSx = {
  borderRadius: 2.5,
  fontSize: "0.82rem",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#8AC642" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#8AC642",
    borderWidth: "1.5px",
  },
};

export function AddNewClientModal({ open, onClose }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "FEMALE",
    address: "",
    careType: "",
    branch: "",
    primaryCoordinator: "",
    startDate: "",
    initialStatus: "Active (Onboarding)",
    fundingType: "Private Pay",
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
          borderRadius: 4,
          boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
          border: "1px solid rgba(138, 198, 66, 0.15)",
        },
      }}
    >
      {/* ── Header ── */}
      <DialogTitle sx={{ pb: 0.5, pt: 3, px: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{ fontWeight: 700, fontSize: "22px", color: "text.primary" }}
            >
              Add New Client
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "text.secondary",
                mt: 0.5,
                fontWeight: 500,
              }}
            >
              Register a new service user to the agency.
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{ mt: -0.5, color: "text.secondary" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 4, pt: 2, pb: 1 }}>
        {/* ── Section 1: Basic Details ── */}
        <SectionHeader
          number="1"
          label="BASIC DETAILS"
          bgcolor="#DCFCE7"
          color="#8AC642"
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2.5,
            mb: 2.5,
          }}
        >
          <Box>
            <Typography component="label" sx={labelSx}>
              FIRST NAME *
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder=""
              value={form.firstName}
              onChange={set("firstName")}
              sx={inputSx}
            />
          </Box>
          <Box>
            <Typography component="label" sx={labelSx}>
              LAST NAME *
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder=""
              value={form.lastName}
              onChange={set("lastName")}
              sx={inputSx}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2.5,
            mb: 2.5,
          }}
        >
          <Box>
            <Typography component="label" sx={labelSx}>
              DATE OF BIRTH *
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="mm/dd/yyyy"
              value={form.dob}
              onChange={set("dob")}
              sx={inputSx}
              InputProps={{
                endAdornment: (
                  <CalendarTodayOutlinedIcon
                    sx={{ fontSize: 16, color: "text.secondary" }}
                  />
                ),
              }}
            />
          </Box>
          <Box>
            <Typography component="label" sx={labelSx}>
              GENDER
            </Typography>
            <Box
              sx={{
                display: "flex",
                bgcolor: "#F8FAFC",
                borderRadius: "10px",
                p: 0.5,
                border: "1px solid #E2E8F0",
              }}
            >
              {["FEMALE", "MALE", "OTHER"].map((g) => (
                <Box
                  key={g}
                  onClick={() => setForm((f) => ({ ...f, gender: g }))}
                  sx={{
                    flex: 1,
                    py: 1,
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: "8px",
                    bgcolor: form.gender === g ? "#FFFFFF" : "transparent",
                    boxShadow:
                      form.gender === g ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                    border:
                      form.gender === g
                        ? "1px solid #E2E8F0"
                        : "1px solid transparent",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color:
                        form.gender === g ? "text.primary" : "text.secondary",
                    }}
                  >
                    {g}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography component="label" sx={labelSx}>
            FULL ADDRESS
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Residential address..."
            value={form.address}
            onChange={set("address")}
            sx={inputSx}
          />
        </Box>

        {/* ── Section 2: Care Setup ── */}
        <SectionHeader
          number="2"
          label="CARE SETUP"
          bgcolor="#E0F2FE"
          color="#0EA5E9"
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2.5,
            mb: 2.5,
          }}
        >
          <Box>
            <Typography component="label" sx={labelSx}>
              CARE TYPE *
            </Typography>
            <Select
              fullWidth
              size="small"
              value={form.careType}
              onChange={set("careType")}
              displayEmpty
              IconComponent={KeyboardArrowDownIcon}
              sx={selectSx}
            >
              <MenuItem value="" disabled>
                <Typography fontSize="0.82rem" color="text.disabled">
                  Select Care Type
                </Typography>
              </MenuItem>
              {["Personal Care", "Complex Care", "Live-in Care"].map((r) => (
                <MenuItem key={r} value={r} sx={{ fontSize: "0.82rem" }}>
                  {r}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography component="label" sx={labelSx}>
              BRANCH *
            </Typography>
            <Select
              fullWidth
              size="small"
              value={form.branch}
              onChange={set("branch")}
              displayEmpty
              IconComponent={KeyboardArrowDownIcon}
              sx={selectSx}
            >
              <MenuItem value="" disabled>
                <Typography fontSize="0.82rem" color="text.disabled">
                  Select Branch
                </Typography>
              </MenuItem>
              {["North", "South", "Central", "West"].map((b) => (
                <MenuItem key={b} value={b} sx={{ fontSize: "0.82rem" }}>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2.5,
            mb: 4,
          }}
        >
          <Box>
            <Typography component="label" sx={labelSx}>
              PRIMARY COORDINATOR
            </Typography>
            <Select
              fullWidth
              size="small"
              value={form.primaryCoordinator}
              onChange={set("primaryCoordinator")}
              displayEmpty
              IconComponent={KeyboardArrowDownIcon}
              sx={selectSx}
            >
              <MenuItem value="" disabled>
                <Typography fontSize="0.82rem" color="text.disabled">
                  Assign Later
                </Typography>
              </MenuItem>
              {["Alex Marshall", "Sarah Thompson"].map((b) => (
                <MenuItem key={b} value={b} sx={{ fontSize: "0.82rem" }}>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography component="label" sx={labelSx}>
              START DATE
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="02/12/2026"
              value={form.startDate}
              onChange={set("startDate")}
              sx={inputSx}
              InputProps={{
                endAdornment: (
                  <CalendarTodayOutlinedIcon
                    sx={{ fontSize: 16, color: "text.secondary" }}
                  />
                ),
              }}
            />
          </Box>
        </Box>

        {/* ── Section 3: Status & Billing ── */}
        <SectionHeader
          number="3"
          label="STATUS & BILLING"
          bgcolor="#FFEDD5"
          color="#F97316"
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2.5,
            mb: 2.5,
          }}
        >
          <Box>
            <Typography component="label" sx={labelSx}>
              INITIAL STATUS
            </Typography>
            <Select
              fullWidth
              size="small"
              value={form.initialStatus}
              onChange={set("initialStatus")}
              displayEmpty
              IconComponent={KeyboardArrowDownIcon}
              sx={selectSx}
            >
              {["Active (Onboarding)", "Pending"].map((b) => (
                <MenuItem key={b} value={b} sx={{ fontSize: "0.82rem" }}>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography component="label" sx={labelSx}>
              FUNDING TYPE
            </Typography>
            <Select
              fullWidth
              size="small"
              value={form.fundingType}
              onChange={set("fundingType")}
              displayEmpty
              IconComponent={KeyboardArrowDownIcon}
              sx={selectSx}
            >
              {["Private Pay", "Local Authority", "NHS CHC"].map((b) => (
                <MenuItem key={b} value={b} sx={{ fontSize: "0.82rem" }}>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Info box */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 3,
            bgcolor: "#F0F9FF",
            border: "1px solid #BAE6FD",
            display: "flex",
            gap: 1.5,
            alignItems: "flex-start",
          }}
        >
          <InfoOutlinedIcon
            sx={{ fontSize: 20, color: "#0EA5E9", flexShrink: 0 }}
          />
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "#0284C7",
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            After creation, the client profile will be partially populated. You
            will need to complete the initial <strong>Risk Assessment</strong>{" "}
            and <strong>Care Plan</strong> before scheduling visits.
          </Typography>
        </Box>
      </DialogContent>

      {/* ── Footer ── */}
      <DialogActions sx={{ px: 4, py: 3, justifyContent: "space-between" }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            fontSize: "0.85rem",
            fontWeight: 700,
            color: "text.primary",
            "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontSize: "0.85rem",
            fontWeight: 700,
            px: 3.5,
            py: 1.2,
            background: "linear-gradient(135deg, #8AC642 0%, #0EA5E9 100%)",
            boxShadow: "0 4px 14px rgba(138, 198, 66, 0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #7AB03B 0%, #0C8FCC 100%)",
            },
            color: "#fff",
          }}
        >
          Create Client Record
        </Button>
      </DialogActions>
    </Dialog>
  );
}
