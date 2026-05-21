import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Paper,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisitDetailModal from "../components/rostering/VisitDetailModal";

const STAFF = [
  { id: 1, name: "Sarah Thompson", role: "Senior Carer", color: "#EF4444" },
  { id: 2, name: "James Wilson", role: "Lead Nurse", color: "#06B6D4" },
  { id: 3, name: "Emily Barker", role: "Supervisor", color: "text.grey" },
  { id: 4, name: "Michael Chen", role: "Carer", color: "text.primary" },
  { id: 5, name: "Michael Chen", role: "Carer", color: "text.primary" },
  { id: 6, name: "Emily Barker", role: "Supervisor", color: "text.grey" },
  { id: 7, name: "Sarah Thompson", role: "Senior Carer", color: "#EF4444" },
];

const HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const SHIFTS = [
  {
    id: 1,
    staffId: 1,
    client: "Margaret Hall",
    start: "08:00",
    duration: "60m",
    type: "MORNING ROUTINE",
    status: "completed",
  },
  {
    id: 2,
    staffId: 1,
    client: "Arthur Reed",
    start: "11:00",
    duration: "90m",
    type: "MEDICATION",
    status: "live",
  },
  {
    id: 3,
    staffId: 2,
    client: "John Doe",
    start: "09:30",
    duration: "60m",
    type: "PERSONAL CARE",
    status: "planned",
  },
  {
    id: 4,
    staffId: 2,
    client: "Emma Davis",
    start: "14:00",
    duration: "120m",
    type: "DOMESTIC HELP",
    status: "planned",
  },
  {
    id: 5,
    staffId: 3,
    client: "Alice Smith",
    start: "08:30",
    duration: "60m",
    type: "PALLIATIVE",
    status: "conflict",
  },
  {
    id: 6,
    staffId: 5,
    client: "William Wilson",
    start: "11:30",
    duration: "60m",
    type: "EVENING ROUTINE",
    status: "planned",
  },
  {
    id: 7,
    staffId: 6,
    client: "Alice Smith",
    start: "08:00",
    duration: "60m",
    type: "PALLIATIVE",
    status: "conflict",
  },
  {
    id: 8,
    staffId: 7,
    client: "Margaret Hall",
    start: "10:00",
    duration: "60m",
    type: "MORNING ROUTINE",
    status: "completed",
  },
  {
    id: 9,
    staffId: 5,
    client: "William Wilson",
    start: "16:00",
    duration: "60m",
    type: "EVENING ROUTINE",
    status: "planned",
  },
  {
    id: 10,
    staffId: 7,
    client: "Emma Davis",
    start: "16:30",
    duration: "120m",
    type: "DOMESTIC HELP",
    status: "planned",
  },
];

const getStatusStyles = (status) => {
  switch (status) {
    case "live":
      return { bg: "#DBEAFE", border: "#3B82F6", color: "#1D4ED8" };
    case "completed":
      return { bg: "#DCFCE7", border: "#10B981", color: "#047857" };
    case "conflict":
      return { bg: "#FEE2E2", border: "#EF4444", color: "#B91C1C" };
    case "planned":
      return { bg: "#F1F5F9", border: "#94A3B8", color: "#334155" };
    default:
      return { bg: "#F1F5F9", border: "#94A3B8", color: "#334155" };
  }
};

const AppointmentPopup = ({ shift, anchorRect }) => {
  if (!shift) return null;

  const popupWidth = 260;
  const popupHeight = 320;
  const padding = 20;

  // Base center position
  let top = anchorRect.top + anchorRect.height / 2 - popupHeight / 2;

  // Clamp to viewport
  if (top + popupHeight > window.innerHeight - padding) {
    top = window.innerHeight - popupHeight - padding;
  }
  if (top < padding) {
    top = padding;
  }

  const left = anchorRect.left - popupWidth - 40;
  const popupMidY = top + popupHeight / 2;
  const anchorY = anchorRect.top + anchorRect.height / 2;
  const midX = anchorRect.left - 40;

  return (
    <>
      <svg
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 999,
        }}
      >
        <path
          d={`M ${anchorRect.left} ${anchorY} L ${midX} ${anchorY} L ${midX} ${popupMidY} L ${left + popupWidth} ${popupMidY}`}
          fill="none"
          stroke="#F97316"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={anchorRect.left} cy={anchorY} r="5" fill="#F97316" />
      </svg>
      <Paper
        elevation={10}
        sx={{
          position: "fixed",
          top,
          left,
          width: popupWidth,
          borderRadius: "16px",
          p: 3,
          zIndex: 1000,
          boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Typography fontWeight={800} fontSize="20px" color="#0EA5E9" mb={3}>
          Appointment
        </Typography>

        {[
          { label: "Client:", value: shift.client },
          { label: "Address:", value: "35 Nunhead Lane, London, SE15 3TR" },
          { label: "Phone:", value: "07465679465" },
          { label: "Time:", value: `${shift.start} - 11:00` },
          { label: "Duration:", value: "1 hour" },
          { label: "Carer 1:", value: "Sarah Thompson" },
          { label: "Carer 2:", value: "Ruth Omoregie" },
        ].map((item, i) => (
          <Box key={i} sx={{ display: "flex", mb: 2 }}>
            <Typography
              fontSize="13px"
              color="#94A3B8"
              sx={{ width: 80, flexShrink: 0 }}
            >
              {item.label}
            </Typography>
            <Typography fontSize="13px" color="text.primary" fontWeight={800}>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Paper>
    </>
  );
};

export default function RosteringPage() {
  const [hoveredShift, setHoveredShift] = useState(null);
  const [anchorRect, setAnchorRect] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);

  const handleMouseEnter = (e, shift) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setAnchorRect(rect);
    setHoveredShift(shift);
  };

  const handleMouseLeave = () => {
    setHoveredShift(null);
    setAnchorRect(null);
  };

  const handleShiftClick = (shift) => {
    setSelectedShift(shift);
    setModalOpen(true);
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#fff",
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            px: 1,
            py: 0.5,
          }}
        >
          <IconButton size="small">
            <ChevronLeftIcon />
          </IconButton>
          <Typography fontWeight={800} fontSize="14px" sx={{ px: 2 }}>
            17 February 2026
          </Typography>
          <IconButton size="small">
            <ChevronRightIcon />
          </IconButton>
          <Box sx={{ borderLeft: "1px solid #E2E8F0", height: 24, mx: 1 }} />
          <Button
            sx={{
              color: "#0EA5E9",
              fontWeight: 800,
              fontSize: "12px",
              textTransform: "none",
            }}
          >
            Today
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              bgcolor: "#F1F5F9",
              p: 0.5,
              borderRadius: "16px",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "#0EA5E9",
                borderRadius: "16px",
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                boxShadow: "none",
                color: "#fff",
              }}
            >
              By Staff
            </Button>
            <Button
              sx={{
                color: "text.grey",
                textTransform: "none",
                fontWeight: 800,
                px: 3,
              }}
            >
              By Client
            </Button>
          </Box>

          <IconButton
            sx={{
              border: "1px solid #FFBE68",
              color: "#F97316",
              borderRadius: "16px",
              p: 1.2,
            }}
          >
            <WarningAmberIcon fontSize="small" />
          </IconButton>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "#8AC642",
              color: "#fff",
              borderRadius: "16px",
              fontWeight: 800,
              px: 3,
              py: 1.2,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { bgcolor: "#76A938", boxShadow: "none" },
            }}
          >
            New Shift
          </Button>
        </Box>
      </Box>

      {/* Grid Container */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#E0F2FE",
          borderRadius: "16px",
          border: "1px solid #BAE6FD",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Timeline Header */}
        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid #BAE6FD",
            bgcolor: "rgba(255,255,255,0.4)",
          }}
        >
          <Box sx={{ width: 180, p: 2, borderRight: "1px solid #BAE6FD" }}>
            <Typography
              fontWeight={800}
              fontSize="10px"
              color="text.grey"
              sx={{ textTransform: "uppercase" }}
            >
              STAFF MEMBERS
            </Typography>
          </Box>
          <Box sx={{ flex: 1, display: "flex" }}>
            {HOURS.map((hour) => (
              <Box
                key={hour}
                sx={{
                  flex: 1,
                  py: 2,
                  textAlign: "center",
                  borderRight: "1px solid #BAE6FD",
                  "&:last-child": { borderRight: "none" },
                }}
              >
                <Typography
                  fontWeight={800}
                  fontSize="12px"
                  color="text.primary"
                >
                  {hour}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, overflowY: "auto", position: "relative" }}>
          {STAFF.map((staff, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                height: 85,
                borderBottom: "1px solid #BAE6FD",
              }}
            >
              <Box
                sx={{
                  width: 180,
                  bgcolor: "#fff",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  borderRight: "1px solid #BAE6FD",
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: staff.color,
                    fontSize: "14px",
                    fontWeight: 800,
                  }}
                >
                  {staff.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
                <Box>
                  <Typography
                    fontWeight={800}
                    fontSize="13px"
                    color="text.primary"
                  >
                    {staff.name}
                  </Typography>
                  <Typography
                    fontSize="10px"
                    color="text.grey"
                    fontWeight={500}
                  >
                    {staff.role}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ flex: 1, display: "flex", position: "relative" }}>
                {HOURS.map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      flex: 1,
                      borderRight: "1px solid #BAE6FD",
                      "&:last-child": { borderRight: "none" },
                    }}
                  />
                ))}

                {SHIFTS.filter((s) => s.staffId === staff.id).map((shift) => {
                  const h = parseInt(shift.start.split(":")[0]);
                  const m = parseInt(shift.start.split(":")[1]);
                  const start = (h - 8 + m / 60) * (100 / HOURS.length);
                  const width =
                    (parseInt(shift.duration) / 60) * (100 / HOURS.length);
                  const styles = getStatusStyles(shift.status);

                  return (
                    <Box
                      key={shift.id}
                      onMouseEnter={(e) => handleMouseEnter(e, shift)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleShiftClick(shift)}
                      sx={{
                        position: "absolute",
                        left: `${start}%`,
                        top: 10,
                        width: `${width}%`,
                        height: 65,
                        bgcolor: styles.bg,
                        borderLeft: `4px solid ${styles.border}`,
                        borderRadius: "16px",
                        p: 1,
                        zIndex: 10,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                        },
                      }}
                    >
                      <Typography
                        fontWeight={800}
                        fontSize="11px"
                        color={styles.color}
                        noWrap
                      >
                        {shift.client}
                      </Typography>
                      <Typography
                        fontSize="9px"
                        color="text.grey"
                        sx={{ mt: 0.1 }}
                      >
                        {shift.start} ({shift.duration})
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          mt: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            bgcolor: "#94A3B8",
                          }}
                        />
                        <Typography
                          fontSize="9px"
                          color="text.grey"
                          fontWeight={800}
                        >
                          {shift.type}
                        </Typography>
                      </Box>
                      {shift.status === "conflict" && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            color: "#EF4444",
                          }}
                        >
                          <WarningAmberIcon sx={{ fontSize: 14 }} />
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            bgcolor: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #BAE6FD",
          }}
        >
          <Box sx={{ display: "flex", gap: 2.5 }}>
            {[
              { label: "In Progress (Live)", color: "#0EA5E9" },
              { label: "Completed", color: "#8AC642" },
              { label: "Planned", color: "text.grey" },
              { label: "Conflict / Issue", color: "#EF4444" },
            ].map((s) => (
              <Box
                key={s.label}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "2px",
                    bgcolor: s.color,
                  }}
                />
                <Typography fontSize="11px" color="text.grey" fontWeight={800}>
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Typography fontSize="11px" color="text.primary" fontWeight={800}>
              42{" "}
              <Typography
                component="span"
                fontSize="11px"
                color="text.grey"
                fontWeight={400}
              >
                Total Shifts Today
              </Typography>
            </Typography>
            <Typography fontSize="11px" color="text.primary" fontWeight={800}>
              • 12{" "}
              <Typography
                component="span"
                fontSize="11px"
                color="text.grey"
                fontWeight={400}
              >
                Completed
              </Typography>
            </Typography>
            <Typography fontSize="11px" color="text.primary" fontWeight={800}>
              • 2{" "}
              <Typography
                component="span"
                fontSize="11px"
                color="text.grey"
                fontWeight={400}
              >
                Alerts
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Hover Popup */}
      {hoveredShift && anchorRect && (
        <AppointmentPopup shift={hoveredShift} anchorRect={anchorRect} />
      )}

      {/* Visit Detail Modal */}
      <VisitDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        client={
          selectedShift
            ? { name: selectedShift.client }
            : { name: "Margaret Hall" }
        }
      />
    </Box>
  );
}
