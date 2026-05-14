import React, { useState } from "react";
import { 
  Box, Typography, Button, Paper, Popover
} from "@mui/material";
import { 
  InsertChartOutlined as InsertChartOutlinedIcon 
} from "@mui/icons-material";

// --- Sub-components ---
import VisitDetailModal from "./VisitDetailModal";

const DAYS = ["Monday 16th", "Tuesday 17th", "Wednesday 18th", "Thursday 19th", "Friday 20th", "Saturday 21st", "Sunday 22nd"];
const TIMES = ["00:00 - 07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];

export default function ScheduleVisitsTab({ client }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);

  const handleVisitClick = (event, visit) => {
    setAnchorEl(event.currentTarget);
    setSelectedVisit(visit);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    handleClosePopover();
  };

  const isPopoverOpen = Boolean(anchorEl);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">Schedule & Visits</Typography>
          <Typography fontSize="13px" color="text.light" sx={{ mt: 0.3 }}>
            Manage information and care delivery for {client.name}.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: "#0EA5E9", borderRadius: "12px", textTransform: "none", 
            fontWeight: 700, px: 3, py: 1.2, boxShadow: "none", fontSize: "14px",
            "&:hover": { bgcolor: "#0A8DBC", boxShadow: "none" }
          }}
        >
          + New Shift
        </Button>
      </Box>

      <Typography fontWeight={800} fontSize="18px" sx={{ mb: 2 }}>Week A</Typography>

      <Paper elevation={0} sx={{ borderRadius: "16px", border: "1px solid #E2E8F0", overflow: "hidden", bgcolor: "#fff", mb: 4 }}>
        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ width: "100%" }}>
            {/* Header Times */}
            <Box sx={{ display: "grid", gridTemplateColumns: "160px repeat(7, 1fr)", borderBottom: "1px solid #E2E8F0" }}>
              <Box sx={{ p: 2.5, borderRight: "1px solid #E2E8F0", display: "flex", alignItems: "center" }}>
                <Typography fontSize="10px" fontWeight={800} color="text.secondary">WEEK VIEW</Typography>
              </Box>
              {TIMES.map(time => (
                <Typography key={time} fontSize="11px" fontWeight={700} color="text.secondary" sx={{ py: 2.5, textAlign: "center", borderRight: "1px solid #E2E8F0" }}>
                  {time}
                </Typography>
              ))}
            </Box>

            {/* Rows */}
            {DAYS.map((day, idx) => (
              <Box key={day} sx={{ display: "grid", gridTemplateColumns: "160px repeat(7, 1fr)", borderBottom: idx < DAYS.length - 1 ? "1px solid #E2E8F0" : "none" }}>
                <Box sx={{ p: 2.5, borderRight: "1px solid #E2E8F0" }}>
                  <Typography fontSize="14px" fontWeight={800} color="text.primary">{day}</Typography>
                  <Typography fontSize="11px" fontWeight={600} color="text.light">Mar 2026</Typography>
                </Box>
                {Array.from({ length: 7 }).map((_, timeIdx) => (
                  <Box key={timeIdx} sx={{ p: 1, borderRight: "1px solid #E2E8F0", minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {day === "Monday 16th" && timeIdx === 1 && (
                      <VisitCard 
                        name="Sarah Th..." 
                        time="08:00 - 60m" 
                        status="MORNING"
                        color="#F0FDF4" 
                        borderColor="#86EFAC" 
                        dotColor="#16A34A"
                        onClick={(e) => handleVisitClick(e, { name: "Sarah Th...", time: "08:00 - 60m" })}
                      />
                    )}
                    {day === "Wednesday 18th" && timeIdx === 3 && (
                      <VisitCard 
                        name="James Wilson" 
                        time="10:00 - 90m" 
                        status="MEDICATION"
                        color="#F1F5F9" 
                        borderColor="#CBD5E1" 
                        dotColor="#64748B"
                        onClick={(e) => handleVisitClick(e, { name: "James Wilson", time: "10:00 - 90m" })}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>

      {/* Footer Stats Banner */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <InsertChartOutlinedIcon sx={{ color: "text.primary", fontSize: 15 }} />
        <Typography fontWeight={800} fontSize="14px">Weekly Stats</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <StatChip label="Required hours: 4h, Om" />
        <StatChip label="Booked hours: 4h, Om" />
        <StatChip label="Appointments: 1" />
        <StatChip label="Carers working this week: 1" />
      </Box>

      {/* Popover */}
      <Popover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          sx: { p: 0, borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.12)", border: "1px solid #E2E8F0", mt: 1, overflow: "hidden" }
        }}
      >
        <Box sx={{ width: 280 }}>
          <Box sx={{ py: 2, textAlign: "center", borderBottom: "1px solid #F1F5F9" }}>
            <Typography fontSize="18px" fontWeight={800} color="primary.main">Appointment</Typography>
          </Box>
          <Box>
            <InfoRow label="Client" value={client.name} />
            <InfoRow label="Address" value="35 Nunhead Lane, London, SE15 3TR" />
            <InfoRow label="Phone" value="07465679465" />
            <InfoRow label="Time" value="09:00 - 10:00" />
            <InfoRow label="Duration" value="1 hour" />
            <InfoRow label="Carer 1" value="James Wilson" />
            <InfoRow label="Carer 2" value="Ruth Omoregie" isLast />
          </Box>
          <Box sx={{ p: 1.5 }}>
            <Button 
              fullWidth 
              onClick={handleOpenModal}
              sx={{ textTransform: "none", fontSize: "13px", fontWeight: 700, color: "primary.main" }}
            >
              View detail
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* Visit Detail Modal */}
      <VisitDetailModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        client={client}
      />
    </Box>
  );
}

function VisitCard({ name, time, status, color, borderColor, dotColor, onClick }) {
  return (
    <Box 
      onClick={onClick}
      sx={{ 
        p: 1.5, borderRadius: "12px", border: `1px solid ${borderColor}`, 
        borderLeft: `4px solid ${dotColor}`,
        bgcolor: color,
        width: "100%", cursor: "pointer", transition: "all 0.2s", "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }
      }}
    >
      <Typography fontSize="11px" fontWeight={800} color="text.primary">{name}</Typography>
      <Typography fontSize="10px" fontWeight={600} color="text.light" sx={{ mb: 1 }}>{time}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: dotColor }} />
        <Typography fontSize="9px" fontWeight={800} color="text.secondary">{status}</Typography>
      </Box>
    </Box>
  );
}

function StatChip({ label }) {
  const [text, value] = label.split(': ');
  return (
    <Paper elevation={0} sx={{ px: 2, py: 1, borderRadius: "10px", border: "1px solid #E2E8F0", bgcolor: "#fff", display: "flex", alignItems: "center" }}>
      <Typography fontSize="12px" fontWeight={600} color="text.light">
        {text}: <Box component="span" sx={{ color: "primary.main", fontWeight: 800 }}>{value}</Box>
      </Typography>
    </Paper>
  );
}

function InfoRow({ label, value, isLast }) {
  return (
    <Box sx={{ 
      display: "flex", px: 2.5, py: 1.8, 
      borderBottom: isLast ? "none" : "1px solid #F1F5F9",
      alignItems: "flex-start",
      gap: 2
    }}>
      <Typography fontSize="12px" fontWeight={600} color="#94A3B8" sx={{ minWidth: 70 }}>{label}:</Typography>
      <Typography fontSize="12px" fontWeight={800} color="text.primary" sx={{ flex: 1 }}>
        {value}
      </Typography>
    </Box>
  );
}
