import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CANCELLATION_REASONS } from "./visitMockData";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    bgcolor: "#F8FAFC",
    fontSize: "13px",
    fontWeight: 600,
    "& fieldset": { borderColor: "#E2E8F0" },
    "&:hover fieldset": { borderColor: "#CBD5E1" },
    "&.Mui-focused fieldset": { borderColor: "#0EA5E9", borderWidth: "1px" },
  },
  "& .MuiOutlinedInput-input": { py: 1.1 },
};

const labelSx = { fontSize: "13px", fontWeight: 700, color: "#475569" };

const radioSx = {
  p: 0.5,
  color: "#CBD5E1",
  "&.Mui-checked": { color: "#8AC642" },
};
const checkboxSx = {
  p: 0.5,
  color: "#CBD5E1",
  "&.Mui-checked": { color: "#0EA5E9" },
};

function Row({ label, children, alignTop }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "150px 1fr" },
        gap: { xs: 1, sm: 2 },
        alignItems: alignTop ? "flex-start" : "center",
      }}
    >
      <Typography sx={{ ...labelSx, pt: alignTop ? 1 : 0 }}>{label}</Typography>
      <Box>{children}</Box>
    </Box>
  );
}

function YesNo({ value, onChange }) {
  return (
    <RadioGroup
      row
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ gap: 2 }}
    >
      {["No", "Yes"].map((opt) => (
        <FormControlLabel
          key={opt}
          value={opt}
          control={<Radio size="small" sx={radioSx} />}
          label={
            <Typography fontSize="13px" fontWeight={600}>
              {opt}
            </Typography>
          }
          sx={{ m: 0, gap: 0.5 }}
        />
      ))}
    </RadioGroup>
  );
}

const initialForm = () => ({
  reason: "Cancelled",
  requestDate: "",
  requestTime: "",
  invoiceClient: "No",
  removeFromClientRoster: false,
  payAttendance: "No",
  payMileage: "No",
  removeFromCarerRoster: false,
  financeNotes: "",
});

export default function CancelAppointmentModal({
  open,
  onClose,
  onConfirm,
  clientName,
}) {
  const [form, setForm] = useState(initialForm);
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const handleClose = () => {
    setForm(initialForm());
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.(form);
    setForm(initialForm());
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="cancel-appointment-title"
      PaperProps={{ sx: { borderRadius: "24px", overflow: "hidden" } }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          px: 3,
          py: 2,
          bgcolor: "#F8FAFC",
          borderBottom: "1px solid #F1F5F9",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              bgcolor: "#FEE2E2",
              color: "#EF4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DeleteOutlineIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography
              id="cancel-appointment-title"
              fontSize="16px"
              fontWeight={700}
            >
              Cancel Appointment
            </Typography>
            <Typography fontSize="11px" color="text.secondary">
              Cancelling visit for{" "}
              <Box
                component="span"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                {clientName}
              </Box>
            </Typography>
          </Box>
        </Box>
        <IconButton size="small" onClick={handleClose} aria-label="Close">
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Body */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: 2.25,
        }}
      >
        <Row label="Cancellation reason">
          <Select
            fullWidth
            size="small"
            value={form.reason}
            onChange={(e) => set("reason")(e.target.value)}
            IconComponent={KeyboardArrowDownIcon}
            sx={{
              borderRadius: "10px",
              bgcolor: "#F8FAFC",
              fontSize: "13px",
              fontWeight: 600,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
            }}
          >
            {CANCELLATION_REASONS.map((r) => (
              <MenuItem key={r} value={r} sx={{ fontSize: "13px" }}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </Row>

        <Row label="Cancellation request received">
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <TextField
              type="date"
              size="small"
              value={form.requestDate}
              onChange={(e) => set("requestDate")(e.target.value)}
              inputProps={{ "aria-label": "Request received date" }}
              sx={{ ...inputSx, flex: 1 }}
            />
            <TextField
              type="time"
              size="small"
              value={form.requestTime}
              onChange={(e) => set("requestTime")(e.target.value)}
              inputProps={{ "aria-label": "Request received time" }}
              sx={{ ...inputSx, width: 130 }}
            />
          </Box>
        </Row>

        <Row label="Invoice the client?">
          <YesNo value={form.invoiceClient} onChange={set("invoiceClient")} />
        </Row>
        <Box sx={{ pl: { sm: "166px" }, mt: -1 }}>
          <FormControlLabel
            sx={{ m: 0, alignItems: "flex-start", gap: 0.75 }}
            control={
              <Checkbox
                size="small"
                checked={form.removeFromClientRoster}
                onChange={(e) =>
                  set("removeFromClientRoster")(e.target.checked)
                }
                sx={checkboxSx}
              />
            }
            label={
              <Typography
                fontSize="12px"
                color="text.secondary"
                sx={{ pt: 0.4 }}
              >
                Remove this appointment from client's roster and invoice
              </Typography>
            }
          />
        </Box>

        <Divider sx={{ borderColor: "#F1F5F9" }} />

        <Row label="Pay carer attendance?">
          <YesNo value={form.payAttendance} onChange={set("payAttendance")} />
        </Row>
        <Row label="Pay carer mileage">
          <YesNo value={form.payMileage} onChange={set("payMileage")} />
        </Row>
        <Box sx={{ pl: { sm: "166px" }, mt: -1 }}>
          <FormControlLabel
            sx={{ m: 0, alignItems: "flex-start", gap: 0.75 }}
            control={
              <Checkbox
                size="small"
                checked={form.removeFromCarerRoster}
                onChange={(e) => set("removeFromCarerRoster")(e.target.checked)}
                sx={checkboxSx}
              />
            }
            label={
              <Typography
                fontSize="12px"
                color="text.secondary"
                sx={{ pt: 0.4 }}
              >
                Remove this appointment from carer's roster and timesheet
              </Typography>
            }
          />
        </Box>

        <Divider sx={{ borderColor: "#F1F5F9" }} />

        <Row label="Finance notes" alignTop>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={form.financeNotes}
            onChange={(e) => set("financeNotes")(e.target.value)}
            inputProps={{ "aria-label": "Finance notes" }}
            sx={{
              ...inputSx,
              "& .MuiOutlinedInput-root": {
                ...inputSx["& .MuiOutlinedInput-root"],
                fontWeight: 400,
              },
            }}
          />
        </Row>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          px: 3,
          pb: 3,
          pt: 0.5,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleConfirm}
          sx={{
            bgcolor: "#EF4444",
            color: "#fff",
            fontWeight: 700,
            fontSize: "13px",
            textTransform: "none",
            borderRadius: "10px",
            px: 3,
            py: 1.1,
            boxShadow: "0 6px 16px rgba(239,68,68,0.25)",
            "&:hover": { bgcolor: "#DC2626" },
          }}
        >
          Confirm cancellation
        </Button>
        <Button
          onClick={handleClose}
          sx={{
            color: "text.primary",
            fontWeight: 700,
            fontSize: "13px",
            textTransform: "none",
            "&:hover": { bgcolor: "#F8FAFC" },
          }}
        >
          Abort cancellation
        </Button>
      </Box>
    </Dialog>
  );
}
