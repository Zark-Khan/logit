import React, { useState } from "react";
import { 
  Box, Typography, Button, Paper, Grid, 
  IconButton, Dialog, TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function VisitDetailModal({ open, onClose, client }) {
  const [tab, setTab] = useState(0);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{ sx: { borderRadius: "24px", p: 0 } }}
    >
      <Box sx={{ p: 5 }}>
        {/* Modal Tabs Container */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 5 }}>
          <Box sx={{ 
            display: "flex", p: 0.5, bgcolor: "#fff", border: "1px solid #E2E8F0", 
            borderRadius: "40px", gap: 0.5 
          }}>
            {["Appointment", "Tasks", "Requirements", "Finance", "Notes", "Travel", "History"].map((label, i) => (
              <Box
                key={label}
                onClick={() => setTab(i)}
                sx={{
                  px: 2.5, py: 1, borderRadius: "30px", fontSize: "13px", fontWeight: 700,
                  cursor: "pointer", transition: "all 0.2s",
                  bgcolor: tab === i ? "primary.main" : "transparent",
                  color: tab === i ? "#fff" : "#64748B",
                  "&:hover": { color: tab === i ? "#fff" : "primary.main" }
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: "#1E293B" }}><CloseIcon /></IconButton>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 5 }}>
          <Typography variant="h4" fontWeight={800} color="#1E293B">
            Client: <Box component="span" sx={{ color: "primary.main" }}>{client.name}</Box>
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <ActionLink icon={<CloseIcon sx={{ fontSize: 16 }} />} label="Cancel" color="#475569" />
            <ActionLink icon={<DeleteOutlineIcon sx={{ fontSize: 16 }} />} label="Delete" color="#EF4444" />
            <ActionLink icon={<OpenInNewIcon sx={{ fontSize: 16 }} />} label="View in schedule" color="#475569" />
          </Box>
        </Box>

        <Grid container spacing={8}>
          {/* Left Column */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                <Typography fontSize="14px" fontWeight={700} color="#475569" sx={{ minWidth: 100 }}>
                  Start time <Box component="span" sx={{ color: "#EF4444" }}>*</Box>
                </Typography>
                <TextField 
                  fullWidth value="09:00" size="small" 
                  InputProps={{ endAdornment: <AccessTimeIcon sx={{ color: "#94A3B8", fontSize: 20 }} /> }}
                  sx={{ ...inputSx, maxWidth: 200 }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                <Typography fontSize="14px" fontWeight={700} color="#475569" sx={{ minWidth: 100 }}>
                  End time <Box component="span" sx={{ color: "#EF4444" }}>*</Box>
                </Typography>
                <TextField 
                  fullWidth value="10:00" size="small" 
                  InputProps={{ endAdornment: <AccessTimeIcon sx={{ color: "#94A3B8", fontSize: 20 }} /> }}
                  sx={{ ...inputSx, maxWidth: 200 }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Typography fontSize="14px" fontWeight={700} color="#475569" sx={{ minWidth: 100 }}>Duration</Typography>
                <Typography fontSize="14px" fontWeight={800} color="#1E293B">1 hours</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={7}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <CarerSection label="Carer 1" value="Sarah Thompson" showRecommend />
              <RunSection value="Not in run." />
              <CarerSection label="Carer 2" value="Ruth Omoregie" showRecommend />
              <RunSection value="Not in run." />
              <CarerSection label="Shadow" value="Not Required" showRecommend />
              <RunSection value="Not in run." />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8, display: "flex", gap: 2 }}>
          <Button 
            variant="contained" 
            sx={{ 
              borderRadius: "14px", textTransform: "none", fontWeight: 700, px: 6, py: 1.8, 
              bgcolor: "#F1F5F9", color: "#1E293B", boxShadow: "none",
              "&:hover": { bgcolor: "#E2E8F0", boxShadow: "none" }
            }}
          >
            Save
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              borderRadius: "14px", textTransform: "none", fontWeight: 700, px: 5, py: 1.8,
              bgcolor: "primary.main", color: "#fff",
              boxShadow: "0 10px 25px rgba(14, 165, 233, 0.3)",
              "&:hover": { bgcolor: "#0A8DBC" }
            }}
          >
            Save & update schedule
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

function ActionLink({ icon, label, color }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, color, cursor: "pointer" }}>
      {icon}
      <Typography fontSize="13px" fontWeight={700}>{label}</Typography>
    </Box>
  );
}

function CarerSection({ label, value, showRecommend }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "100px 1fr 110px", alignItems: "center", gap: 1.5 }}>
      <Typography fontSize="13px" fontWeight={700} color="#475569">{label}</Typography>
      <Paper elevation={0} sx={{ px: 2, py: 1.2, borderRadius: "10px", border: "1px solid #E2E8F0", bgcolor: "#F8FAFC" }}>
        <Typography fontSize="13px" fontWeight={800}>{value}</Typography>
      </Paper>
      {showRecommend && (
        <Button 
          variant="contained" 
          sx={{ 
            textTransform: "none", fontSize: "11px", fontWeight: 700, color: "primary.main", 
            bgcolor: "#F1F5F9", borderRadius: "8px", boxShadow: "none", px: 1.5, py: 0.5,
            "&:hover": { bgcolor: "#E2E8F0", boxShadow: "none" } 
          }}
        >
          Recommend
        </Button>
      )}
    </Box>
  );
}

function RunSection({ value }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "100px 1fr", alignItems: "center", gap: 1.5 }}>
      <Typography fontSize="13px" fontWeight={700} color="#475569">Run</Typography>
      <Paper elevation={0} sx={{ px: 2, py: 1.2, borderRadius: "10px", border: "1px solid #E2E8F0", bgcolor: "#F8FAFC" }}>
        <Typography fontSize="13px" fontWeight={700} color="text.primary">{value}</Typography>
      </Paper>
    </Box>
  );
}

const inputSx = {
  "& .MuiOutlinedInput-root": { 
    borderRadius: "12px", bgcolor: "#F8FAFC", 
    "& fieldset": { borderColor: "#E2E8F0" },
    "&.Mui-focused fieldset": { borderColor: "primary.main" }
  }
};
