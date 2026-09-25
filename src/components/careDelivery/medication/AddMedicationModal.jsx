import React, { useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Grid,
  Select,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { PillIcon, ActivityIcon } from "../../staffOverview/LineIcons";
import { CLIENTS, FREQUENCIES, ROUTES } from "./medicationData";

const labelSx = {
  fontSize: "10px",
  fontWeight: 700,
  color: "#64748B",
  mb: 1,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
};

const inputRootSx = {
  borderRadius: "14px",
  bgcolor: "#fff",
  fontSize: "14px",
  "& fieldset": { borderColor: "#F1F5F9" },
  "&:hover fieldset": { borderColor: "#E2E8F0" },
  "&.Mui-focused fieldset": { borderColor: "#0EA5E9", borderWidth: "1px" },
};

const fieldSx = {
  "& .MuiOutlinedInput-root": inputRootSx,
  "& input::placeholder, & textarea::placeholder": {
    color: "#94A3B8",
    opacity: 1,
  },
};

const selectSx = {
  ...inputRootSx,
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#F1F5F9" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0EA5E9",
    borderWidth: "1px",
  },
};

const adornment = (icon) => (
  <InputAdornment position="start" sx={{ color: "#94A3B8", mr: 0.5 }}>
    {icon}
  </InputAdornment>
);

const initialForm = () => ({
  client: "",
  name: "",
  dose: "",
  frequency: "Once Daily",
  route: "Oral (Tablet/Capsule)",
  startDate: new Date().toISOString().slice(0, 10),
  endDate: "",
  prescribedBy: "",
  instructions: "",
});

function IconSelect({ value, onChange, options, icon, label, placeholder }) {
  return (
    <Select
      fullWidth
      displayEmpty
      value={value}
      onChange={(e) => onChange(e.target.value)}
      IconComponent={KeyboardArrowDownIcon}
      startAdornment={adornment(icon)}
      inputProps={{ "aria-label": label }}
      sx={selectSx}
      renderValue={(v) =>
        v || (
          <Typography component="span" color="#94A3B8" fontSize="14px">
            {placeholder}
          </Typography>
        )
      }
    >
      {options.map((o) => (
        <MenuItem key={o} value={o} sx={{ fontSize: "14px" }}>
          {o}
        </MenuItem>
      ))}
    </Select>
  );
}

export default function AddMedicationModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(initialForm);
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
  const text = (key) => ({
    value: form[key],
    onChange: (e) => set(key)(e.target.value),
  });

  const canSubmit = Boolean(
    form.client && form.name.trim() && form.dose.trim() && form.startDate,
  );

  const handleClose = () => {
    setForm(initialForm());
    onClose();
  };

  const handleSubmit = () => {
    onAdd?.({
      name: form.name.trim(),
      dose: form.dose.trim(),
      client: form.client,
      frequency: form.frequency,
      route: form.route,
      startDate: form.startDate,
      endDate: form.endDate || "Ongoing",
      prescribedBy: form.prescribedBy.trim() || "—",
      instructions: form.instructions.trim(),
      time: "Not yet given",
      status: "ON TRACK",
    });
    setForm(initialForm());
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="add-medication-title"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 600,
          borderRadius: "32px",
          boxShadow: "0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ position: "relative", p: 3, pb: 2 }}>
        <IconButton
          onClick={handleClose}
          aria-label="Close"
          sx={{ position: "absolute", right: 24, top: 24, color: "#94A3B8" }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              bgcolor: "#FFE4E6",
              color: "#F43F5E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PillIcon size={20} />
          </Box>
          <Box>
            <Typography
              id="add-medication-title"
              fontSize="20px"
              fontWeight={700}
            >
              Add New Medication
            </Typography>
            <Typography fontSize="12px" color="text.light">
              Record prescription and administration details
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ overflowY: "auto", px: 3, py: 3, bgcolor: "#F8FAFC" }}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12 }}>
            <Typography sx={labelSx}>Select client</Typography>
            <IconSelect
              value={form.client}
              onChange={set("client")}
              options={CLIENTS}
              icon={<PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} />}
              label="Select client"
              placeholder="Choose a client..."
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography sx={labelSx}>Medication name</Typography>
            <TextField
              fullWidth
              placeholder="e.g. Paracetamol"
              {...text("name")}
              inputProps={{ "aria-label": "Medication name" }}
              InputProps={{ startAdornment: adornment(<PillIcon size={16} />) }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography sx={labelSx}>Dosage</Typography>
            <TextField
              fullWidth
              placeholder="e.g. 500mg"
              {...text("dose")}
              inputProps={{ "aria-label": "Dosage" }}
              InputProps={{
                startAdornment: adornment(<ActivityIcon size={16} />),
              }}
              sx={fieldSx}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography sx={labelSx}>Frequency</Typography>
            <IconSelect
              value={form.frequency}
              onChange={set("frequency")}
              options={FREQUENCIES}
              icon={<AccessTimeOutlinedIcon sx={{ fontSize: 18 }} />}
              label="Frequency"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography sx={labelSx}>Route</Typography>
            <IconSelect
              value={form.route}
              onChange={set("route")}
              options={ROUTES}
              icon={<MedicalServicesOutlinedIcon sx={{ fontSize: 18 }} />}
              label="Route"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography sx={labelSx}>Start date</Typography>
            <TextField
              fullWidth
              type="date"
              {...text("startDate")}
              inputProps={{ "aria-label": "Start date" }}
              InputProps={{
                startAdornment: adornment(
                  <CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />,
                ),
              }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography sx={labelSx}>End date (optional)</Typography>
            <TextField
              fullWidth
              type="date"
              {...text("endDate")}
              inputProps={{ "aria-label": "End date", min: form.startDate }}
              InputProps={{
                startAdornment: adornment(
                  <CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />,
                ),
              }}
              sx={fieldSx}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography sx={labelSx}>Prescribed by</Typography>
            <TextField
              fullWidth
              placeholder="e.g. Dr. Sarah Miller (GP)"
              {...text("prescribedBy")}
              inputProps={{ "aria-label": "Prescribed by" }}
              InputProps={{
                startAdornment: adornment(
                  <PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} />,
                ),
              }}
              sx={fieldSx}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography sx={labelSx}>Special instructions</Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="e.g. Take with food, avoid grapefruit juice..."
              {...text("instructions")}
              inputProps={{ "aria-label": "Special instructions" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      color: "#94A3B8",
                      alignSelf: "flex-start",
                      mt: 1.25,
                      mr: 0.5,
                    }}
                  >
                    <InfoOutlinedIcon sx={{ fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
              sx={fieldSx}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #F1F5F9",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            bgcolor: "#F1F5F9",
            color: "text.primary",
            borderRadius: "14px",
            px: 3.5,
            py: 1.25,
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { bgcolor: "#E2E8F0" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          sx={{
            bgcolor: "#0EA5E9",
            color: "#fff",
            borderRadius: "14px",
            px: 4,
            py: 1.25,
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "0 6px 16px rgba(14,165,233,0.25)",
            "&:hover": { bgcolor: "#0284C7" },
            "&.Mui-disabled": {
              bgcolor: "#BAE6FD",
              color: "#fff",
              boxShadow: "none",
            },
          }}
        >
          Add Medication
        </Button>
      </Box>
    </Dialog>
  );
}
