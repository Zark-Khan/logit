import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MedicationViewHeader from "./MedicationViewHeader";
import { firstNameOf } from "./medicationData";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    bgcolor: "#F8FAFC",
    fontSize: "13px",
    fontWeight: 600,
    color: "#475569",
    "& fieldset": { borderColor: "#E2E8F0" },
    "&:hover fieldset": { borderColor: "#CBD5E1" },
    "&.Mui-focused fieldset": { borderColor: "#0EA5E9", borderWidth: "1px" },
  },
  "& .MuiOutlinedInput-input": { py: 1.25 },
  "& .MuiOutlinedInput-input::placeholder": { color: "#94A3B8", opacity: 1 },
};

const labelSx = {
  fontSize: "9px",
  fontWeight: 700,
  color: "text.secondary",
  letterSpacing: 0.4,
  textTransform: "uppercase",
  mb: 0.75,
};

function Field({ label, value, onChange, placeholder }) {
  return (
    <Box>
      <Typography sx={labelSx}>{label}</Typography>
      <TextField
        fullWidth
        size="small"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        sx={fieldSx}
      />
    </Box>
  );
}

function InfoSection({ number, title, children, last }) {
  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography fontWeight={700} fontSize="16px" sx={{ mb: 2 }}>
          {number}. {title}
        </Typography>
        {children}
      </Box>
      {!last && <Divider sx={{ borderColor: "#F1F5F9" }} />}
    </>
  );
}

export default function MedicalInformation({ client, onBack }) {
  const firstName = firstNameOf(client.name);
  const [form, setForm] = useState({
    allergies: `At present, no known allergies or intolerances have been reported for ${firstName}. This should be regularly reviewed with her mother and updated immediately if any allergies or intolerances are identified`,
    gpName: "Dr Jivani, Nazim Amirali",
    gpPhone: "+4420883366565",
    pharmacyName: "",
    pharmacyAddress: "",
    pharmacyPostcode: "",
    medicineSupport: "provide",
  });
  const [savedOpen, setSavedOpen] = useState(false);
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <Box>
      <MedicationViewHeader
        title="Medical Information"
        subtitle={`View and update ${client.name}'s personal medical details.`}
        onBack={onBack}
      />

      <Paper
        elevation={0}
        sx={{
          px: { xs: 2.5, sm: 3 },
          pt: 1,
          pb: 3,
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          bgcolor: "#fff",
        }}
      >
        {/* 1. Allergies */}
        <InfoSection number="1" title="Allergies">
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={form.allergies}
            onChange={(e) => set("allergies")(e.target.value)}
            sx={{
              ...fieldSx,
              "& .MuiOutlinedInput-root": {
                ...fieldSx["& .MuiOutlinedInput-root"],
                fontWeight: 400,
                lineHeight: 1.6,
                p: 2,
              },
              mb: 1.5,
            }}
          />
          <Box
            sx={{
              bgcolor: "#F0F9FF",
              border: "1px solid #E0F2FE",
              borderRadius: "10px",
              px: 1.75,
              py: 1.25,
              display: "flex",
              alignItems: "center",
              gap: 1.25,
            }}
          >
            <InfoOutlinedIcon sx={{ fontSize: 16, color: "primary.main" }} />
            <Typography fontSize="11px" color="text.secondary" sx={{ lineHeight: 1.5 }}>
              If {firstName} has any allergies, you are required to add them
              here. If they don't have any please write, "None known."
            </Typography>
          </Box>
        </InfoSection>

        {/* 2. Doctor/GP */}
        <InfoSection number="2" title="Doctor/GP">
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Field label="GP's name" value={form.gpName} onChange={set("gpName")} />
            <Field
              label="Contact number"
              value={form.gpPhone}
              onChange={set("gpPhone")}
            />
          </Box>
        </InfoSection>

        {/* 3. Pharmacist */}
        <InfoSection number="3" title="Pharmacist">
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Field
              label="Pharmacy name"
              placeholder="e.g. Lloyd's Pharmacy"
              value={form.pharmacyName}
              onChange={set("pharmacyName")}
            />
            <Field
              label="Address"
              placeholder="e.g. 100 High Street, London"
              value={form.pharmacyAddress}
              onChange={set("pharmacyAddress")}
            />
            <Field
              label="Post code"
              placeholder="e.g. N1 7RT"
              value={form.pharmacyPostcode}
              onChange={set("pharmacyPostcode")}
            />
          </Box>
        </InfoSection>

        {/* 4. Medicines support */}
        <InfoSection number="4" title="Medicines support" last>
          <Typography fontSize="13px" color="text.light" sx={{ mb: 1.5 }}>
            Please select from the following options below.
          </Typography>
          <RadioGroup
            value={form.medicineSupport}
            onChange={(e) => set("medicineSupport")(e.target.value)}
            sx={{ gap: 1.5 }}
          >
            {[
              {
                value: "provide",
                title: `We provide ${firstName}'s medicine support`,
                sub: "Carers must record each time they help with medication",
              },
              {
                value: "none",
                title: `We do not provide ${firstName}'s medicine support`,
                sub: `Carers are not required to record ${firstName} taking medication`,
              },
            ].map((o) => (
              <FormControlLabel
                key={o.value}
                value={o.value}
                sx={{ m: 0, alignItems: "flex-start", gap: 1.25 }}
                control={
                  <Radio
                    size="small"
                    sx={{ p: 0.25, "&.Mui-checked": { color: "#0EA5E9" } }}
                  />
                }
                label={
                  <Box>
                    <Typography fontSize="13px" fontWeight={700}>
                      {o.title}
                    </Typography>
                    <Typography fontSize="11px" color="text.light">
                      {o.sub}
                    </Typography>
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </InfoSection>

        <Button
          variant="contained"
          onClick={() => setSavedOpen(true)}
          sx={{
            mt: 1,
            py: 1,
            px: 3,
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "13px",
            textTransform: "none",
            bgcolor: "#0EA5E9",
            boxShadow: "0 4px 12px rgba(14, 165, 233, 0.2)",
            color: "#ffffff",
            "&:hover": { bgcolor: "#0284c7" },
          }}
        >
          Save changes
        </Button>
      </Paper>

      <Snackbar
        open={savedOpen}
        autoHideDuration={3000}
        onClose={() => setSavedOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSavedOpen(false)}
          sx={{ fontSize: "13px" }}
        >
          {firstName}'s medical information saved.
        </Alert>
      </Snackbar>
    </Box>
  );
}
