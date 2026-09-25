import React, { useState } from "react";
import { Box, Typography, Button, Avatar, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import VisitDetailModal from "../components/rostering/VisitDetailModal";
import AppointmentTooltip from "../components/rostering/AppointmentTooltip";
import CreateShiftModal from "../components/rostering/CreateShiftModal";

// Staff offered by the "Create New Shift" matching step (skills/distance are mock)
const MATCH_CANDIDATES = [
  { id: 1, name: "Sarah Thompson", skill: "Dementia+", distance: "1.2m" },
  { id: 2, name: "James Wilson", skill: "Nursing", distance: "2.4m" },
  { id: 3, name: "Emily Barker", skill: "Supervisor", distance: "0.8m" },
  { id: 4, name: "Michael Chen", skill: "Entry", distance: "3.1m" },
];

// The board shows a single day; new shifts default to it
const BOARD_DATE = "2026-02-17";

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
      return { bg: "#FFFFFF", border: "#64748B", color: "#334155" };
    default:
      return { bg: "#F1F5F9", border: "#94A3B8", color: "#334155" };
  }
};

// Mock client contact details used in the appointment hover card
const CLIENT_DETAILS = {
  "Margaret Hall": {
    address: "35 Nunhead Lane, London, SE15 3TR",
    phone: "07465679465",
  },
  "Arthur Reed": {
    address: "12 Elm Grove, London, SE22 8PL",
    phone: "07700900412",
  },
  "John Doe": {
    address: "8 Albion Street, London, SE16 7JX",
    phone: "07700900518",
  },
  "Emma Davis": {
    address: "41 Rye Lane, London, SE15 4ST",
    phone: "07700900233",
  },
  "Alice Smith": {
    address: "19 Bellenden Road, London, SE15 5BB",
    phone: "07700900377",
  },
  "William Wilson": {
    address: "35 Nunhead Lane, London, SE15 3TR",
    phone: "07465679465",
  },
};

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (mins) =>
  `${String(Math.floor(mins / 60) % 24).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
const formatDuration = (mins) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const parts = [];
  if (h) parts.push(`${h} hour${h > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} mins`);
  return parts.join(" ");
};

const buildAppointment = (shift, staffName) => {
  const mins = parseInt(shift.duration, 10);
  const start = toMinutes(shift.start);
  const contact = CLIENT_DETAILS[shift.client] || { address: "-", phone: "-" };
  return {
    client: shift.client,
    address: contact.address,
    phone: contact.phone,
    time: `${shift.start} - ${toHHMM(start + mins)}`,
    duration: formatDuration(mins),
    carer1: staffName,
    carer2: "Ruth Omoregie",
  };
};

export default function RosteringPage() {
  const [shifts, setShifts] = useState(SHIFTS);
  const [createOpen, setCreateOpen] = useState(false);

  const handleCreateShift = (shift) => {
    setShifts((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((s) => s.id)) + 1,
        staffId: shift.staffId,
        client: shift.client,
        start: shift.start,
        duration: shift.duration,
        type: shift.type,
        status: "planned",
      },
    ]);
    setCreateOpen(false);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);

  const handleShiftClick = (shift) => {
    setSelectedShift(shift);
    setModalOpen(true);
  };

  // Confirming "Cancel Appointment" in the visit modal takes the shift off the board
  const handleCancelVisit = () => {
    if (!selectedShift) return;
    setShifts((prev) => prev.filter((s) => s.id !== selectedShift.id));
  };

  const selectedStaff = selectedShift
    ? STAFF.find((s) => s.id === selectedShift.staffId)
    : null;
  const selectedAppointment = selectedShift
    ? buildAppointment(selectedShift, selectedStaff?.name)
    : null;

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
          <Typography fontWeight={700} fontSize="14px" sx={{ px: 2 }}>
            17 February 2026
          </Typography>
          <IconButton size="small">
            <ChevronRightIcon />
          </IconButton>
          <Box sx={{ borderLeft: "1px solid #E2E8F0", height: 24, mx: 1 }} />
          <Button
            sx={{
              color: "#0EA5E9",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: 0.5,
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
                fontWeight: 700,
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
            onClick={() => setCreateOpen(true)}
            sx={{
              bgcolor: "#8AC642",
              color: "#fff",
              borderRadius: "16px",
              fontWeight: 700,
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
          <Box
            sx={{
              width: 200,
              flexShrink: 0,
              p: 2,
              borderRight: "1px solid #BAE6FD",
            }}
          >
            <Typography
              fontWeight={700}
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
                  fontWeight={700}
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
                  width: 200,
                  flexShrink: 0,
                  bgcolor: "transparent",
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
                    fontWeight: 700,
                  }}
                >
                  {staff.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    fontWeight={700}
                    fontSize="13px"
                    color="text.primary"
                    noWrap
                  >
                    {staff.name}
                  </Typography>
                  <Typography
                    fontSize="10px"
                    color="text.grey"
                    fontWeight={400}
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

                {shifts.filter((s) => s.staffId === staff.id).map((shift) => {
                  const h = parseInt(shift.start.split(":")[0]);
                  const m = parseInt(shift.start.split(":")[1]);
                  const start = (h - 8 + m / 60) * (100 / HOURS.length);
                  const width =
                    (parseInt(shift.duration) / 60) * (100 / HOURS.length);
                  const styles = getStatusStyles(shift.status);

                  return (
                    <AppointmentTooltip
                      key={shift.id}
                      appointment={buildAppointment(shift, staff.name)}
                    >
                      <Box
                        role="button"
                        tabIndex={0}
                        aria-label={`${shift.client}, ${shift.start}. Open visit details`}
                        onClick={() => handleShiftClick(shift)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleShiftClick(shift);
                          }
                        }}
                        sx={{
                          position: "absolute",
                          left: `${start}%`,
                          top: 10,
                          width: `${width}%`,
                          height: 62,
                          bgcolor: styles.bg,
                          borderLeft: `3px solid ${styles.border}`,
                          borderRadius: "6px",
                          boxShadow: "0 1px 3px rgba(15,23,42,0.08)",
                          p: 1,
                          zIndex: 10,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          "&:hover, &:focus-visible": {
                            transform: "translateY(-2px)",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                            outline: "none",
                          },
                        }}
                      >
                        <Typography
                          fontWeight={700}
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
                            fontWeight={700}
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
                            <ErrorRoundedIcon sx={{ fontSize: 14 }} />
                          </Box>
                        )}
                      </Box>
                    </AppointmentTooltip>
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
                <Typography fontSize="11px" color="text.grey" fontWeight={700}>
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Typography fontSize="11px" color="text.primary" fontWeight={700}>
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
            <Typography fontSize="11px" color="text.primary" fontWeight={700}>
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
            <Typography fontSize="11px" color="text.primary" fontWeight={700}>
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

      {/* Visit Detail Modal */}
      <VisitDetailModal
        // Remount per shift so times/tabs reset to the clicked visit
        key={selectedShift?.id ?? "none"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        client={
          selectedShift
            ? { name: selectedShift.client }
            : { name: "Margaret Hall" }
        }
        visit={
          selectedAppointment
            ? {
                start: selectedAppointment.time.split(" - ")[0],
                end: selectedAppointment.time.split(" - ")[1],
                carer1: selectedAppointment.carer1,
                carer2: selectedAppointment.carer2,
              }
            : undefined
        }
        onCancelVisit={handleCancelVisit}
      />

      <CreateShiftModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateShift}
        clients={Object.keys(CLIENT_DETAILS)}
        candidates={MATCH_CANDIDATES}
        shifts={shifts}
        defaultDate={BOARD_DATE}
      />
    </Box>
  );
}
