import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
  Grid,
  SvgIcon,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import StethoscopeOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined"; // Assuming MedicalServicesOutlined for Prescribed By

function PillIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 20.5l-6-6a4.95 4.95 0 1 1 7-7l6 6a4.95 4.95 0 1 1-7 7z" />
      <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
    </SvgIcon>
  );
}

export default function MedicationDetailDrawer({ open, onClose, medication }) {
  if (!medication) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 672 },
          bgcolor: "#F8FAFC",
          p: 0,
          zIndex: 1301,
        },
      }}
      sx={{ zIndex: 1301 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            p: 4,
            pb: 3,
            bgcolor: "#fff",
            borderBottom: "1px solid #F1F5F9",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "16px",
                  bgcolor: "#E11D48",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0px 8px 16px -4px rgba(225, 29, 72, 0.25)",
                }}
              >
                <PillIcon sx={{ color: "#fff", fontSize: 28 }} />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 0.5,
                  }}
                >
                  <Typography
                    fontSize="24px"
                    fontWeight={700}
                    color="text.primary"
                  >
                    {medication.name}
                  </Typography>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.25,
                      borderRadius: "24px",
                      bgcolor: medication.status === "MISSED" ? "#FFF1F2" : "#ECFDF5",
                      color: medication.status === "MISSED" ? "#E11D48" : "#10B981",
                      border: "1px solid",
                      borderColor: medication.status === "MISSED" ? "#FFE4E6" : "#A7F3D0",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {medication.status}
                  </Box>
                </Box>
                <Typography fontSize="16px" fontWeight={600} color="#475569" mb={0.5}>
                  500mg
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "#94A3B8",
                  }}
                >
                  <PersonOutlineOutlinedIcon sx={{ fontSize: 10, color: "#FB7185" }} />
                  <Typography fontSize="14px" fontWeight={500}>
                    Client:{" "}
                    <Box component="span" fontWeight={700} color="#334155">
                      {medication.client}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <IconButton
              size="small"
              onClick={onClose}
              sx={{ width: 40, height: 40 }}
            >
              <CloseIcon sx={{ fontSize: 24, color: "text.primary" }} />
            </IconButton>
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 4 }}>
          {/* Missed Dose Details Banner */}
          {medication.status === "MISSED" && (
            <Box
              sx={{
                bgcolor: "#FEF2F2",
                borderRadius: "24px",
                p: 3,
                mb: 4,
                border: "1px solid #FECACA",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <InfoOutlinedIcon sx={{ color: "#EF4444", fontSize: 20 }} />
                <Typography
                  fontSize="16px"
                  fontWeight={700}
                  color="text.primary"
                >
                  Missed Dose Details
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    fontSize="10px"
                    fontWeight={700}
                    color="#F87171"
                    sx={{ mb: 1, letterSpacing: "0.05em" }}
                  >
                    REASON FOR MISSED DOSE
                  </Typography>
                  <Typography
                    fontSize="14px"
                    color="text.primary"
                    fontWeight={500}
                    sx={{ lineHeight: 1.6 }}
                  >
                    {medication.reason}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography
                    fontSize="10px"
                    fontWeight={700}
                    color="#F87171"
                    sx={{ mb: 1, letterSpacing: "0.05em" }}
                  >
                    REPORTED BY
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "#fff",
                        color: "#F43F5E",
                        fontSize: "14px",
                        fontWeight: 700,
                        border: "1px solid #FFE4E6",
                        borderRadius: "8px",
                      }}
                    >
                      <PersonOutlineOutlinedIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography
                        fontSize="13px"
                        fontWeight={700}
                        color="text.primary"
                      >
                        {medication.reportedBy}
                      </Typography>
                      <Typography
                        fontSize="10px"
                        color="#F87171"
                        fontWeight={700}
                      >
                        Carer
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography
                    fontSize="10px"
                    fontWeight={700}
                    color="#F87171"
                    sx={{ mb: 0.5, letterSpacing: "0.05em" }}
                  >
                    REPORTED AT
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "text.primary",
                    }}
                  >
                    <AccessTimeOutlinedIcon sx={{ fontSize: 14 }} />
                    <Typography fontSize="13px" fontWeight={500}>
                      {medication.reportedAt}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Grid of Stats */}
          <Grid container spacing={2} mb={4}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  p: 3,
                  borderRadius: "24px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  border: "1px solid #F1F5F9",
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ mt: 0.5 }}>
                    <AccessTimeOutlinedIcon
                      sx={{ color: "#94A3B8", fontSize: 20 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      fontSize="10px"
                      fontWeight={700}
                      color="#64748B"
                      sx={{ mb: 0.5, letterSpacing: "0.05em" }}
                    >
                      FREQUENCY
                    </Typography>
                    <Typography
                      fontSize="14px"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {medication.frequency}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ mt: 0.5 }}>
                    <HistoryOutlinedIcon
                      sx={{ color: "#94A3B8", fontSize: 20 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      fontSize="10px"
                      fontWeight={700}
                      color="#64748B"
                      sx={{ mb: 0.5, letterSpacing: "0.05em" }}
                    >
                      LAST GIVEN
                    </Typography>
                    <Typography
                      fontSize="14px"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {medication.time}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ mt: 0.5 }}>
                    <StethoscopeOutlinedIcon
                      sx={{ color: "#94A3B8", fontSize: 20 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      fontSize="10px"
                      fontWeight={700}
                      color="#64748B"
                      sx={{ mb: 0.5, letterSpacing: "0.05em" }}
                    >
                      PRESCRIBED BY
                    </Typography>
                    <Typography
                      fontSize="14px"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {medication.prescribedBy}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  p: 3,
                  borderRadius: "24px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  border: "1px solid #F1F5F9",
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ mt: 0.5 }}>
                    <CalendarTodayOutlinedIcon
                      sx={{ color: "#94A3B8", fontSize: 20 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      fontSize="10px"
                      fontWeight={700}
                      color="#64748B"
                      sx={{ mb: 0.5, letterSpacing: "0.05em" }}
                    >
                      START DATE
                    </Typography>
                    <Typography
                      fontSize="14px"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {medication.startDate}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ mt: 0.5 }}>
                    <InfoOutlinedIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography
                      fontSize="10px"
                      fontWeight={700}
                      color="#64748B"
                      sx={{ mb: 0.5, letterSpacing: "0.05em" }}
                    >
                      ROUTE
                    </Typography>
                    <Typography
                      fontSize="14px"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {medication.route}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ mt: 0.5 }}>
                    <ArticleOutlinedIcon
                      sx={{ color: "#94A3B8", fontSize: 20 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      fontSize="10px"
                      fontWeight={700}
                      color="#64748B"
                      sx={{ mb: 0.5, letterSpacing: "0.05em" }}
                    >
                      END DATE
                    </Typography>
                    <Typography
                      fontSize="14px"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {medication.endDate}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Special Instructions */}
          <Box
            sx={{
              bgcolor: "#fff",
              p: 3,
              borderRadius: "24px",
              border: "1px solid #F1F5F9",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <InfoOutlinedIcon sx={{ color: "text.primary", fontSize: 20 }} />
              <Typography fontSize="14px" fontWeight={700} color="text.primary">
                Special Instructions
              </Typography>
            </Box>
            <Box sx={{ bgcolor: "#F8FAFC", borderRadius: "16px", p: 3 }}>
              <Typography fontSize="13px" color="text.light" fontStyle="italic">
                "No special instructions provided for this medication."
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 3,
            borderTop: "1px solid #F1F5F9",
            bgcolor: "#fff",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: "12px",
              borderColor: "#E2E8F0",
              color: "text.primary",
              py: "10px !important",
              px: 4,
              fontWeight: 700,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": { bgcolor: "#F8FAFC", borderColor: "#CBD5E1" },
            }}
          >
            Edit Record
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              borderRadius: "12px",
              bgcolor: "#0EA5E9",
              color: "#fff",
              py: "10px !important",
              px: 4,
              fontWeight: 700,
              textTransform: "none",
              fontSize: "14px",
              "&:hover": { bgcolor: "#0284C7" },
              boxShadow: "none",
            }}
          >
            Close Details
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
