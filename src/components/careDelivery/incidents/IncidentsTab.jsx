import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IncidentDetailDrawer from "./IncidentDetailDrawer";
import ReportIncidentModal from "./ReportIncidentModal";

const INCIDENT_DATA = [
  {
    id: 1,
    title: "Fall: Arthur Morgan",
    reportedBy: "Sarah Thompson",
    time: "Today, 10:30 AM",
    status: "OPEN",
    type: "fall",
    ref: "INC-001",
    severity: "HIGH",
    followUp: "REQUIRED",
    description:
      '"Arthur was found on the floor in the living room. He states he slipped while trying to reach for his glasses."',
    location: "Living Room",
    witnesses: ["James Wilson"],
    immediateActions: "First aid administered. GP notified. Family informed.",
    logs: [
      {
        time: "Today, 11:45 AM",
        text: "Investigation opened by Admin",
        subtext: "Reviewing description and witness statements.",
      },
      { time: "Today, 10:30 AM", text: "Incident reported by Sarah Thompson" },
    ],
  },
  {
    id: 2,
    title: "Injury: John Marston",
    reportedBy: "James Wilson",
    time: "Yesterday, 04:15 PM",
    status: "INVESTIGATING",
    type: "injury",
    ref: "INC-002",
    severity: "MEDIUM",
    followUp: "PENDING",
    description: "John sustained a minor injury while in the garden.",
    location: "Garden",
    witnesses: [],
    immediateActions: "Wound cleaned and bandaged.",
    logs: [
      { time: "Yesterday, 05:00 PM", text: "Investigation started by Admin" },
    ],
  },
  {
    id: 3,
    title: "Safeguarding: Sadie Adler",
    reportedBy: "Emily Davis",
    time: "26 Feb 2026",
    status: "OPEN",
    type: "safeguarding",
    ref: "INC-003",
    severity: "HIGH",
    followUp: "REQUIRED",
    description: "Safeguarding concern raised regarding Sadie.",
    location: "Bedroom",
    witnesses: [],
    immediateActions: "Social services contacted.",
    logs: [
      {
        time: "26 Feb 2026, 02:00 PM",
        text: "Incident reported by Emily Davis",
      },
    ],
  },
  {
    id: 4,
    title: "Health Deterioration: Charles Smith",
    reportedBy: "Michael Brown",
    time: "24 Feb 2026",
    status: "CLOSED",
    type: "health",
    ref: "INC-004",
    severity: "LOW",
    followUp: "NONE",
    description: "Charles showed signs of health deterioration.",
    location: "Living Room",
    witnesses: ["Dr. Adams"],
    immediateActions: "GP contacted. Vitals monitored.",
    logs: [{ time: "24 Feb 2026, 03:00 PM", text: "Case closed by Admin" }],
  },
];

const TYPE_CONFIG = {
  fall: { color: "#D97706", bgcolor: "#FEF3C7", Icon: GppMaybeOutlinedIcon },
  injury: { color: "#2563EB", bgcolor: "#DBEAFE", Icon: GppMaybeOutlinedIcon },
  safeguarding: {
    color: "#EF4444",
    bgcolor: "#FEE2E2",
    Icon: GppMaybeOutlinedIcon,
  },
  health: { color: "#4F46E5", bgcolor: "#E0E7FF", Icon: GppMaybeOutlinedIcon },
};

const STATUS_STYLES = {
  OPEN: { color: "#EF4444", bgcolor: "#FFF1F2" },
  INVESTIGATING: { color: "#D97706", bgcolor: "#FFFBEB" },
  CLOSED: { color: "#10B981", bgcolor: "#D1FAE5" },
  RESOLVED: { color: "#3B82F6", bgcolor: "#DBEAFE" },
};

const FILTERS = ["Open", "Investigating", "Closed", "Resolved"];

export default function IncidentsTab() {
  const [activeFilter, setActiveFilter] = useState("Open");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const handleOpenDrawer = (incident) => {
    setSelectedIncident(incident);
    setDrawerOpen(true);
  };

  return (
    <Box>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              bgcolor: "#FFFBEB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GppMaybeOutlinedIcon sx={{ color: "#D97706", fontSize: 20 }} />
          </Box>
          <Typography fontSize="20px" fontWeight={700} color="text.primary">
            Incidents &amp; Safeguarding
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon />}
            sx={{
              borderRadius: "12px",
              borderColor: "#E2E8F0",
              color: "#64748B",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              px: 2.5,
              "&:hover": { bgcolor: "#F8FAFC", borderColor: "#CBD5E1" },
            }}
          >
            Report
          </Button>

          <Button
            variant="contained"
            onClick={() => setModalOpen(true)}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
              px: 2.5,
              background: "linear-gradient(135deg, #0EA5E9, #8AC642)",
              boxShadow: "0 4px 14px rgba(14,165,233,0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #0284c7, #76ad34)",
                boxShadow: "0 6px 18px rgba(14,165,233,0.4)",
              },
              color: "text.paper",
            }}
          >
            + Report Incident
          </Button>
        </Box>
      </Box>

      {/* Incident Logs Table */}
      <Box
        sx={{
          borderRadius: "20px",
          border: "1px solid",
          borderColor: "#BAE6FD",
          bgcolor: "#E0F5FF",
          overflow: "hidden",
        }}
      >
        {/* Table Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 2,
          }}
        >
          <Typography fontSize="16px" fontWeight={700} color="text.primary">
            Incident Logs
          </Typography>

          <Box sx={{ display: "flex", gap: 0.5 }}>
            {FILTERS.map((f) => (
              <Box
                key={f}
                onClick={() => setActiveFilter(f)}
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  bgcolor: activeFilter === f ? "#fff" : "transparent",
                  color: "#475569",
                  transition: "all 0.15s",
                }}
              >
                {f}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Rows */}
        <Box>
          {INCIDENT_DATA.map((item, index) => {
            const tc = TYPE_CONFIG[item.type] || TYPE_CONFIG.fall;
            const ss = STATUS_STYLES[item.status] || STATUS_STYLES.OPEN;
            const { Icon } = tc;

            return (
              <Box
                key={item.id}
                onClick={() => handleOpenDrawer(item)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 3,
                  py: 1.75,
                  bgcolor: "rgba(255,255,255,0.55)",
                  borderTop:
                    index === 0 ? "none" : "1px solid rgba(255, 255, 255, 1)",
                  cursor: "pointer",
                }}
              >
                {/* Left: icon + text */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "12px",
                      bgcolor: tc.bgcolor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ color: tc.color, fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography
                      fontSize="14px"
                      fontWeight={700}
                      color="text.primary"
                      mb={0.25}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      fontSize="12px"
                      color="text.light"
                      fontWeight={400}
                    >
                      Reported by {item.reportedBy} &bull; {item.time}
                    </Typography>
                  </Box>
                </Box>

                {/* Right: badge + actions */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.4,
                      borderRadius: "24px",
                      bgcolor: ss.bgcolor,
                      color: ss.color,
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.status}
                  </Box>

                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    sx={{ color: "#94A3B8", p: 0.5 }}
                  >
                    <EditOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>

                  <KeyboardArrowRightIcon
                    sx={{ color: "#CBD5E1", fontSize: 22 }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <IncidentDetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        incident={selectedIncident}
      />

      <ReportIncidentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
}
