import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const APPOINTMENTS = [
  { name: "Mabel Jenkins", time: "14:30", location: "Central District" },
  { name: "Arthur Reed",   time: "15:00", location: "West District" },
];

const CONFLICTS = [
  { name: "Sarah Thompson", issue: "OVERLAP (15 MINS)" },
  { name: "James Wilson",   issue: "TRAVEL DEFICIT (18 MINS)" },
];

// ─── Unassigned Appointments ──────────────────────────────────────────────────
export function UnassignedAppointments() {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 5, border: "1px solid #B3E1FF", height: "100%",     background: "linear-gradient(to bottom, #FFFFFF, #BBE3FC)"
 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box sx={{ fontSize: 14, width:32, height:32, backgroundColor:"#FFEDD5", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"8px" }}><WarningAmberIcon color="warning" /></Box>
          <Typography variant="h6" fontWeight={600}>Unassigned Appointments</Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "warning.main", fontWeight: 600, cursor: "pointer", textDecoration:"underline" }}>
          Manage All
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {APPOINTMENTS.map(({ name, time, location }) => (
          <Box
            key={name}
            sx={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              p: 1.5, borderRadius: 2, border: "1px solid #A2E0FC", backgroundColor: "#FAFBFC",
            }}
          >
            <Box>
              <Typography variant="body1" fontWeight={600}>{name}</Typography>
              <Typography color="text.secondary" sx={{ fontSize: "10px", color:"text.light" }}>
                {time} · {location}
              </Typography>
            </Box>
            <Button
              size="small"
              disableElevation
              sx={{
                px: 1.5, py:0.3,  borderRadius: 6, fontWeight: 600,
                display:"flex", alignItems:"center", justifyContent:"center", 
                fontSize: "10px", textTransform: "none", color: "text.paper",
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "primary.main" },
              }}
            >
              ASSIGN
            </Button>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

// ─── Carer Conflicts ──────────────────────────────────────────────────────────
export function CarerConflicts() {
  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: "1px solid #FFD4D4", backgroundColor: "#FFEBEB", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box sx={{ fontSize: "14px", width:32, height:32, backgroundColor:"#FEE2E2", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"8px" }}><CalendarTodayIcon color="error" /></Box>
          <Typography variant="h6" fontWeight={600}>Carer Conflicts</Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 600, cursor: "pointer", textDecoration:"underline" }}>
          Resolve
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {CONFLICTS.map(({ name, issue }) => (
          <Box
            key={name}
            sx={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              p: 1.5, borderRadius: 2, border: "1px solid #FFD4D4", backgroundColor: "background.default",
            }}
          >
            <Box>
              <Typography variant="body1" fontWeight={600}>{name}</Typography>
              <Typography sx={{ fontSize: "10px", color: "#DC2626", fontWeight: 600 }}>
                {issue}
              </Typography>
            </Box>
            <Box sx={{ fontSize: 14, color:"#EF4444", cursor:"pointer" }}><EditOutlinedIcon /></Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
