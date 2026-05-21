import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function MedicalInformation({ onBack }) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Medical Information
          </Typography>
          <Typography fontSize="14px" color="text.light" sx={{ mt: 0.3 }}>
            View and update Margaret Hall's personal medical details.
          </Typography>
        </Box>
        <Box
          onClick={onBack}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "primary.main",
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          <Typography fontSize="14px" fontWeight={700}>
            Back to Medication
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "24px",
          border: "1px solid #E2E8F0",
          bgcolor: "#fff",
        }}
      >
        {/* 1. Allergies */}
        <InfoSection number="1" title="Allergies">
          <Box
            sx={{
              bgcolor: "#F8FAFC",
              borderRadius: "16px",
              p: 3,
              border: "1px solid #E2E8F0",
              mb: 2,
            }}
          >
            <Typography
              fontSize="14px"
              color="text.light"
              sx={{ lineHeight: 1.6 }}
            >
              At present, no known allergies or intolerances have been reported
              for Margaret. This should be regularl reviewed with her mother and
              updated immediately if any allergies or intolerances are
              identified
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "#F0F9FF",
              border: "1px solid #BAE6FD",
              borderRadius: "12px",
              p: 1.8,
              display: "flex",
              gap: 1.5,
            }}
          >
            <InfoOutlinedIcon
              sx={{ fontSize: 18, color: "primary.main", mt: 0.1 }}
            />
            <Typography
              fontSize="11px"
              color="primary.main"
              sx={{ lineHeight: 1.5 }}
            >
              If Margaret has any allergies, you are required to add them here.
              If they don't have any please write, "None known."
            </Typography>
          </Box>
        </InfoSection>

        {/* 2. Doctor/GP */}
        <InfoSection number="2" title="Doctor/GP">
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box>
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                GP'S NAME
              </Typography>
              <TextField
                fullWidth
                value="Dr Jivani, Nazim Amiral"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#F8FAFC",
                    "& fieldset": { borderColor: "#CBD5E1" },
                    "&:hover fieldset": { borderColor: "#CBD5E1" },
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                CONTACT NUMBER
              </Typography>
              <TextField
                fullWidth
                value="+4420883366565"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#F8FAFC",
                    "& fieldset": { borderColor: "#CBD5E1" },
                    "&:hover fieldset": { borderColor: "#CBD5E1" },
                  },
                }}
              />
            </Box>
          </Box>
        </InfoSection>

        {/* 3. Pharmacist */}
        <InfoSection number="3" title="Pharmacist">
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box>
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                PHARMACY NAME
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g. Lloyd's Pharmacy"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#F8FAFC",
                    "& fieldset": { borderColor: "#CBD5E1" },
                    "&:hover fieldset": { borderColor: "#CBD5E1" },
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                ADDRESS
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g. 100 High Street, London"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#F8FAFC",
                    "& fieldset": { borderColor: "#CBD5E1" },
                    "&:hover fieldset": { borderColor: "#CBD5E1" },
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                fontSize="10px"
                fontWeight={700}
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                POST CODE
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g. N1 7RT"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#F8FAFC",
                    "& fieldset": { borderColor: "#CBD5E1" },
                    "&:hover fieldset": { borderColor: "#CBD5E1" },
                  },
                }}
              />
            </Box>
          </Box>
        </InfoSection>

        {/* 4. Medicines support */}
        <InfoSection number="4" title="Medicines support">
          <Typography fontSize="14px" color="text.light" sx={{ mb: 2 }}>
            Please select from the following options below.
          </Typography>
          <RadioGroup defaultValue="provide">
            <FormControlLabel
              value="provide"
              control={<Radio size="small" />}
              label={
                <Box>
                  <Typography fontSize="14px" fontWeight={700}>
                    We provide Margaret's medicine support
                  </Typography>
                  <Typography fontSize="11px" color="text.light">
                    Carers must record each time they help with medication
                  </Typography>
                </Box>
              }
              sx={{ mb: 1 }}
            />
            <FormControlLabel
              value="none"
              control={<Radio size="small" />}
              label={
                <Box>
                  <Typography fontSize="14px" fontWeight={700}>
                    We do not provide Margaret's medicine support
                  </Typography>
                  <Typography fontSize="11px" color="text.light">
                    Carers are not required to record Margaret taking medication
                  </Typography>
                </Box>
              }
            />
          </RadioGroup>
        </InfoSection>

        <Button
          variant="contained"
          sx={{
            mt: 4,
            py: 1.2,
            px: 4,
            borderRadius: "12px",
            fontWeight: 700,
            fontSize: "16px",
            background: "main.primary",
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(14, 165, 233, 0.2)",
            color: "#ffffff",
          }}
          onClick={onBack}
        >
          Save changes
        </Button>
      </Paper>
    </Box>
  );
}

function InfoSection({ number, title, children }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography fontWeight={700} fontSize="18px" sx={{ mb: 2.5 }}>
        {number}. {title}
      </Typography>
      {children}
    </Box>
  );
}
