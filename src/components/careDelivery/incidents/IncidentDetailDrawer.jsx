import React from "react";
import { Drawer, Box, Typography, IconButton, Button, Avatar, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined"; // Amber shield
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export default function IncidentDetailDrawer({ open, onClose, incident }) {
  if (!incident) return null;

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
        <Box sx={{ p: 4, pb: 3, bgcolor: "#fff", borderBottom: "1px solid #F1F5F9" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "16px",
                  bgcolor: "#FFFBEB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GppMaybeOutlinedIcon sx={{ color: "#D97706", fontSize: 28 }} />
              </Box>
              <Box>
                <Typography fontSize="20px" fontWeight={700} color="text.primary">
                  {incident.title}
                </Typography>
                <Typography fontSize="12px" color="text.light" fontWeight={500}>
                  Ref: {incident.ref} &bull; Reported by {incident.reportedBy}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton size="small" sx={{ width: 40, height: 40 }}>
                <EditOutlinedIcon sx={{ fontSize: 20, color: "text.primary" }} />
              </IconButton>
              <IconButton size="small" onClick={onClose} sx={{ width: 40, height: 40 }}>
                <CloseIcon sx={{ fontSize: 24, color: "text.primary" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 4 }}>
          
          {/* Stats Row */}
          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <Box sx={{ flex: 1, bgcolor: "#fff", p: 2.5, borderRadius: "24px", border: "1px solid #F1F5F9" }}>
              <Typography fontSize="10px" fontWeight={700} color="#64748B" sx={{ mb: 1, letterSpacing: "0.25em" }}>
                SEVERITY
              </Typography>
              <Box
                sx={{
                  display: "inline-flex",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "8px",
                  bgcolor: "#FFFBEB",
                  color: "#D97706",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {incident.severity}
              </Box>
            </Box>
            <Box sx={{ flex: 1, bgcolor: "#fff", p: 2.5, borderRadius: "24px", border: "1px solid #F1F5F9" }}>
              <Typography fontSize="10px" fontWeight={700} color="#64748B" sx={{ mb: 1, letterSpacing: "0.25em" }}>
                STATUS
              </Typography>
              <Box
                sx={{
                  display: "inline-flex",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "8px",
                  bgcolor: "#FFFBEB",
                  color: "#D97706",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {incident.status}
              </Box>
            </Box>
            <Box sx={{ flex: 1, bgcolor: "#fff", p: 2.5, borderRadius: "24px", border: "1px solid #F1F5F9" }}>
              <Typography fontSize="10px" fontWeight={700} color="#64748B" sx={{ mb: 1, letterSpacing: "0.25em" }}>
                FOLLOW-UP
              </Typography>
              <Box
                sx={{
                  display: "inline-flex",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "8px",
                  bgcolor: "#FFE4E6",
                  color: "#EF4444",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {incident.followUp}
              </Box>
            </Box>
          </Box>

          {/* Incident Description */}
          <Box sx={{ bgcolor: "#fff", p: 3, borderRadius: "24px", border: "1px solid #F1F5F9", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <DescriptionOutlinedIcon sx={{ color: "#EF4444", fontSize: 20 }} />
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                Incident Description
              </Typography>
            </Box>
            <Box sx={{ bgcolor: "#F8FAFC", borderRadius: "16px", p: 3, mb: 3, border: "1px solid #F1F5F9"  }}>
              <Typography fontSize="14px" color="text.grey" fontStyle="italic" sx={{ lineHeight: 1.6 }}>
                {incident.description}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Typography fontSize="10px" fontWeight={700} color="#94A3B8" sx={{ mb: 0.5, letterSpacing: "0.05em" }}>
                  DATE & TIME
                </Typography>
                <Typography fontSize="14px" fontWeight={700} color="text.primary">
                  Today, 10:30 AM
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography fontSize="10px" fontWeight={700} color="#94A3B8B" sx={{ mb: 0.5, letterSpacing: "0.05em" }}>
                  LOCATION
                </Typography>
                <Typography fontSize="14px" fontWeight={700} color="text.primary">
                  {incident.location}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Witnesses */}
          <Box sx={{ bgcolor: "#fff", p: 3, borderRadius: "24px", border: "1px solid #F1F5F9", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <PeopleOutlineOutlinedIcon sx={{ color: "#3B82F6", fontSize: 20 }} />
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                Witnesses
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {incident.witnesses?.map((witness, i) => (
                <Box
                  key={i}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: "12px",
                    bgcolor: "#F8FAFC",
                    border: "1px solid #F1F5F9",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "text.grey"
                  }}
                >
                  {witness}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Immediate Actions */}
          <Box sx={{ bgcolor: "#fff", p: 3, borderRadius: "24px", border: "1px solid #F1F5F9", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <CheckCircleOutlinedIcon sx={{ color: "#10B981", fontSize: 20 }} />
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                Immediate Actions Taken
              </Typography>
            </Box>
            <Box sx={{ p: 2, borderRadius: "14px", border: "1px solid #D1FAE5", bgcolor: "#ECFDF54D", color: "text.grey", fontSize: "14px", fontWeight: 400 }}>
              {incident.immediateActions}
            </Box>
          </Box>

          {/* Investigation Log */}
          <Box sx={{ bgcolor: "#fff", p: 3, borderRadius: "24px", border: "1px solid #F1F5F9", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <TimelineOutlinedIcon sx={{ color: "#D97706", fontSize: 20 }} />
              <Typography fontSize="16px" fontWeight={700} color="text.primary">
                Investigation Log
              </Typography>
            </Box>
            
            <Box sx={{ position: "relative" }}>
              <Box sx={{ position: "absolute", left: "7px", top: "10px", bottom: "10px", width: "2px", bgcolor: "#F1F5F9" }} />
              
              {incident.logs?.map((log, index) => (
                <Box key={index} sx={{ position: "relative", pl: 4, mb: index < incident.logs.length - 1 ? 4 : 0 }}>
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: "2px",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      bgcolor: index === 0 ? "#fff" : "#F8FAFC",
                      border: index === 0 ? "2px solid #F59E0B" : "2px solid #E2E8F0",
                      zIndex: 1,
                    }}
                  />
                  <Typography fontSize="10px" fontWeight={700} color="#64748B" sx={{ mb: 0.5, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {log.time}
                  </Typography>
                  <Typography fontSize="12px" fontWeight={700} color="text.primary" sx={{ mb: 0.5 }}>
                    {log.text}
                  </Typography>
                  {log.subtext && (
                    <Typography fontSize="12px" color="text.light" fontWeight={400}>
                      {log.subtext}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ p: 4, bgcolor: "#fff", borderTop: "1px solid #F1F5F9" }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FileDownloadOutlinedIcon />}
            sx={{
              borderRadius: "16px",
              bgcolor: "#0EA5E9",
              color: "#fff",
              py: "15px !important",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "16px",
              "&:hover": { bgcolor: "#0284C7" },
              boxShadow: "none",
            }}
          >
            Export Incident Report
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
