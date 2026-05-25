import React from "react";
import {
  Dialog,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Grid,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";

export default function AddMedicationModal({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 600,
          borderRadius: "32px",
          boxShadow: "0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
          overflow: "hidden",
          bgcolor: "#fff", // Match second image background
        },
      }}
    >
      {/* Header */}
      <Box sx={{ position: "relative", p: 3, pb: 1 }}>
        <IconButton
          onClick={onClose}
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MedicationOutlinedIcon sx={{ color: "#F43F5E", fontSize: 20 }} />
          </Box>
          <Box>
            <Typography fontSize="20px" fontWeight={700} color="text.primary">
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
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography
              fontSize="10px"
              fontWeight={700}
              color="#64748B"
              mb={1}
              sx={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              SELECT CLIENT
            </Typography>
            <TextField
              select
              fullWidth
              defaultValue=""
              SelectProps={{ displayEmpty: true }}
              InputProps={{
                startAdornment: (
                  <PersonOutlineOutlinedIcon
                    sx={{ color: "#94A3B8", fontSize: 18, mr: 1 }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  "& fieldset": { borderColor: "#F1F5F9" },
                },
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  color: "#94A3B8",
                },
              }}
            >
              <MenuItem value="" disabled>
                Choose a client...
              </MenuItem>
              <MenuItem value="1">Arthur Morgan</MenuItem>
              <MenuItem value="2">Sadie Adler</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              fontSize="10px"
              fontWeight={700}
              color="#64748B"
              mb={1}
              sx={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              MEDICATION NAME
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g. Paracetamol"
              InputProps={{
                startAdornment: (
                  <MedicationOutlinedIcon
                    sx={{ color: "#94A3B8", fontSize: 18, mr: 1 }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  "& fieldset": { borderColor: "#F1F5F9" },
                },
                "& input::placeholder": {
                  color: "#94A3B8",
                  opacity: 1,
                  fontWeight: 400,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              fontSize="10px"
              fontWeight={700}
              color="#64748B"
              mb={1}
              sx={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              DOSAGE
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g. 400mg"
              InputProps={{
                startAdornment: (
                  <TimelineOutlinedIcon
                    sx={{ color: "#94A3B8", fontSize: 18, mr: 1 }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  "& fieldset": { borderColor: "#F1F5F9" },
                },
                "& input::placeholder": {
                  color: "#94A3B8",
                  opacity: 1,
                  fontWeight: 400,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              fontSize="10px"
              fontWeight={700}
              color="#64748B"
              mb={1}
              sx={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              FREQUENCY
            </Typography>
            <TextField
              select
              fullWidth
              defaultValue=""
              SelectProps={{ displayEmpty: true }}
              InputProps={{
                startAdornment: (
                  <AccessTimeOutlinedIcon
                    sx={{ color: "#94A3B8", fontSize: 18, mr: 1 }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  "& fieldset": { borderColor: "#F1F5F9" },
                },
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  color: "#94A3B8",
                },
              }}
            >
              <MenuItem value="" disabled>
                Once Daily
              </MenuItem>
              <MenuItem value="1">Once Daily</MenuItem>
              <MenuItem value="2">Twice Daily</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              fontSize="10px"
              fontWeight={700}
              color="#64748B"
              mb={1}
              sx={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              ROUTE
            </Typography>
            <TextField
              select
              fullWidth
              defaultValue=""
              SelectProps={{ displayEmpty: true }}
              InputProps={{
                startAdornment: (
                  <MedicationOutlinedIcon
                    sx={{ color: "#94A3B8", fontSize: 18, mr: 1 }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  "& fieldset": { borderColor: "#F1F5F9" },
                },
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  color: "#94A3B8",
                },
              }}
            >
              <MenuItem value="" disabled>
                Oral (Tablet/Capsule)
              </MenuItem>
              <MenuItem value="1">Oral (Tablet/Capsule)</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              fontSize="10px"
              fontWeight={700}
              color="#64748B"
              mb={1}
              sx={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              START DATE
            </Typography>
            <TextField
              fullWidth
              placeholder="03/26/2026"
              InputProps={{
                startAdornment: (
                  <CalendarTodayOutlinedIcon
                    sx={{ color: "#94A3B8", fontSize: 18, mr: 1 }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  "& fieldset": { borderColor: "#F1F5F9" },
                },
                "& input::placeholder": {
                  color: "#94A3B8",
                  opacity: 1,
                  fontWeight: 400,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              fontSize="10px"
              fontWeight={700}
              color="#64748B"
              mb={1}
              sx={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              END DATE (OPTIONAL)
            </Typography>
            <TextField
              fullWidth
              placeholder="mm/dd/yyyy"
              InputProps={{
                startAdornment: (
                  <CalendarTodayOutlinedIcon
                    sx={{ color: "#94A3B8", fontSize: 18, mr: 1 }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  "& fieldset": { borderColor: "#F1F5F9" },
                },
                "& input::placeholder": {
                  color: "#94A3B8",
                  opacity: 1,
                  fontWeight: 400,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography
              fontSize="10px"
              fontWeight={700}
              color="#64748B"
              mb={1}
              sx={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              PRESCRIBED BY
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g. Dr. Sarah Miller (GP)"
              InputProps={{
                startAdornment: (
                  <PersonOutlineOutlinedIcon
                    sx={{ color: "#94A3B8", fontSize: 18, mr: 1 }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  "& fieldset": { borderColor: "#F1F5F9" },
                },
                "& input::placeholder": {
                  color: "#94A3B8",
                  opacity: 1,
                  fontWeight: 400,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography
              fontSize="10px"
              fontWeight={700}
              color="#64748B"
              mb={1}
              sx={{ letterSpacing: "0.05em", textTransform: "uppercase" }}
            >
              SPECIAL INSTRUCTIONS
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="e.g. Take with food, avoid grapefruit juice..."
              InputProps={{
                startAdornment: (
                  <InfoOutlinedIcon
                    sx={{
                      color: "#94A3B8",
                      fontSize: 18,
                      mr: 1,
                      mt: 0.5,
                      alignSelf: "flex-start",
                    }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "16px",
                  bgcolor: "#fff",
                  "& fieldset": { borderColor: "#F1F5F9" },
                  alignItems: "flex-start",
                },
                "& textarea::placeholder": {
                  color: "#94A3B8",
                  opacity: 1,
                  fontWeight: 400,
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ borderColor: "#F1F5F9" }} />

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 3,
          bgcolor: "#fff",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            bgcolor: "#F1F5F9",
            color: "text.primary",
            borderRadius: "16px",
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { bgcolor: "#E2E8F0" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onClose}
          sx={{
            bgcolor: "#0EA5E9",
            color: "#fff",
            borderRadius: "16px",
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { bgcolor: "#0284C7" },
          }}
        >
          Add Medication
        </Button>
      </Box>
    </Dialog>
  );
}
