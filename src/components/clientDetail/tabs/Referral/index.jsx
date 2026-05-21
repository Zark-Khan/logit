import React from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  InputAdornment,
  Paper,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const CustomField = ({ label, placeholder, type = "text", icon }) => (
  <Box sx={{ mb: 2.5 }}>
    <Typography fontWeight={700} fontSize="14px" color="text.primary" mb={0.8}>
      {label}
    </Typography>
    <TextField
      fullWidth
      placeholder={placeholder}
      variant="outlined"
      type={type}
      InputProps={{
        endAdornment: icon ? (
          <InputAdornment position="end">{icon}</InputAdornment>
        ) : null,
        sx: {
          borderRadius: "12px",
          bgcolor: "#F8FAFC",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E2E8F0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E2E8F0",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0EA5E9",
          },
          "& input": {
            fontSize: "14px",
            fontWeight: 400,
            py: 1.8,
            "&::placeholder": {
              color: "#94A3B8",
              opacity: 1,
            },
          },
        },
      }}
    />
  </Box>
);

export default function ReferralTab({ client }) {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography fontWeight={700} fontSize="20px" color="text.primary">
          Referral
        </Typography>
        <Typography fontSize="14px" color="text.light" sx={{ mt: 0.5 }}>
          Manage information and care delivery for{" "}
          {client?.name || "Margaret Hall"}.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "24px",
          border: "1px solid #E2E8F0",
          bgcolor: "#fff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
          <Box
            sx={{
              bgcolor: "#F0F9FF",
              p: 0.8,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <InfoOutlinedIcon sx={{ color: "#0EA5E9", fontSize: 18 }} />
          </Box>
          <Typography fontWeight={700} fontSize="16px" color="text.primary">
            Add Referral
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Date"
              placeholder="mm/dd/yyyy"
              icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Time Of Call"
              placeholder="--:-- --"
              icon={<AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Patient No."
              placeholder="Enter patient number"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Name of LA/NHS CCE"
              placeholder="Enter LA/NHS CCE name"
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Name of Caller/Referral"
              placeholder="Enter caller name"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <CustomField label="Name of Client" placeholder="Margaret Hall" />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Address"
              placeholder="12 Rose Gardens, London, NW1 4PJ"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <CustomField label="Post Code" placeholder="Enter post code" />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <CustomField label="Email" placeholder="m.hall@example.com" />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Name Of Next Of Kin"
              placeholder="Enter next of kin name"
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Contact Of Next Of Kin"
              placeholder="Enter next of kin contact"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Date of Initial Assessment Arranged"
              placeholder="mm/dd/yyyy"
              icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Start Time of Initial Assessment"
              placeholder="--:-- --"
              icon={<AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Date of Initial Assessment Completed"
              placeholder="mm/dd/yyyy"
              icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <CustomField
              label="End Time of Initial Assessment"
              placeholder="--:-- --"
              icon={<AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Date of Care Plan Completed"
              placeholder="mm/dd/yyyy"
              icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Allocated Care Staff"
              placeholder="Enter staff name"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <CustomField label="Consent" placeholder="Enter consent details" />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <CustomField
              label="Start Date"
              placeholder="mm/dd/yyyy"
              icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <CustomField
              label="End Date"
              placeholder="mm/dd/yyyy"
              icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} />}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0EA5E9",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              textTransform: "none",
              borderRadius: "12px",
              px: 4,
              py: 1.2,
              boxShadow: "none",
              "&:hover": { bgcolor: "#0284C7", boxShadow: "none" },
            }}
          >
            Upload Referral
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
